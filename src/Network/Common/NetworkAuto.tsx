import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  Elements,
  FlowElement,
  MiniMap,
  Node,
  OnLoadParams,
  ReactFlowProvider,
  removeElements,
  XYPosition,
} from "react-flow-renderer";
import mergeRefs from "react-merge-refs";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import FlowstationContextDrawer from "../Components/ContextDrawer/FlowstationContextDrawer";
import GasfacilityContextDrawer from "../Components/ContextDrawer/GasfacilityContextDrawer";
import {
  default as DrainagePointContextDrawer,
  default as ManifoldContextDrawer,
} from "../Components/ContextDrawer/ManifoldContextDrawer";
import TerminalContextDrawer from "../Components/ContextDrawer/TerminalContextDrawer";
import NetworkDiagramButtons from "../Components/Icons/NetworkDiagramButtons";
import NetworkTitlePlaque from "../Components/TitlePlaques/NetworkTitlePlaque";
import { nodeTypes } from "../Data/NetworkData";
import { setCurrentElementAction } from "../Redux/Actions/NetworkActions";
import GenerateNodeService from "../Services/GenerateNodeService";
import AddWidgetsToNodes from "../Utils/AddWidgetsToNodes";
import { itemTypes } from "../Utils/DragAndDropItemTypes";
import { INetworkProps } from "./NetworkLandingTypes";
import NetworkPanel from "./NetworkPanel";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  networkBody: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 300,
    minWidth: 300,
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
    padding: 5,
  },
  networkContent: {
    marginLeft: 5,
    marginRight: 40,
    height: "100%",
    width: "85%",
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
  },
  networkCanvas: {
    height: `calc(100% - 30px)`,
  },
  networkContentIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #E7E7E7",
    height: 28,
  },
  CanvasWidget: { height: "100%", backgroundColor: "#FFF" },
}));

const NetworkAuto = ({ isNetworkAuto }: INetworkProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { success, nodeElements, edgeElements } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const networkRef = React.useRef<HTMLDivElement>(null);
  const reactFlowInstanceRef = React.useRef<OnLoadParams | null>(null);

  const [networkElements, setNetworkElements] = React.useState(
    [] as FlowElement[]
  );
  const [showMiniMap, setShowMiniMap] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [currentElement, setCurrentElement] = React.useState<FlowElement>(
    {} as FlowElement
  );
  const { currentPopoverData, showNetworkElementDetails } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const NetworkDiagramIconsProps = {
    showMiniMap,
    setShowMiniMap,
    showControls,
    setShowControls,
    componentRef: networkRef,
  };

  //Drag and Drop
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: itemTypes.NETWORK_ELEMENT,
      drop: (_, monitor) => handleWidgetDrop(monitor),
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        };
      },
    }),
    []
  );

  const isActive = canDrop && isOver;
  let dropTargetStyle = {};
  if (isActive) {
    dropTargetStyle = {
      border: "1px solid green",
    };
  } else if (canDrop) {
    dropTargetStyle = {
      border: "1px solid grey",
    };
  }

  const handleWidgetDrop = (monitor: DropTargetMonitor) => {
    const networkBounds = (
      networkRef.current as HTMLDivElement
    ).getBoundingClientRect();

    const { nodeType } = monitor.getItem() as any;
    const mouseCoord = monitor.getClientOffset() as XYPosition;

    const mouseCoordUpdated = {
      x: mouseCoord.x - networkBounds.left,
      y: mouseCoord.y - networkBounds.top,
    } as XYPosition;

    const mouseCoordProjected = (
      reactFlowInstanceRef.current as OnLoadParams
    ).project(mouseCoordUpdated);

    const newElement: FlowElement = GenerateNodeService(
      nodeType,
      isNetworkAuto
    );
    const updatedNewElement = {
      ...newElement,
      position: { ...mouseCoordProjected } as XYPosition,
    };

    setNetworkElements((es) => es.concat(updatedNewElement));
  };

  //Flow Elements
  const nodeElementsWithWidgets = AddWidgetsToNodes(nodeElements as Node[]);
  const allNetworkElements = [
    ...nodeElementsWithWidgets,
    ...(edgeElements as Edge[]),
  ];

  const onLoad = (reactFlowInstance: OnLoadParams) =>
    (reactFlowInstanceRef.current = reactFlowInstance);

  const onConnect = (params: Edge | Connection) =>
    setNetworkElements((els) => addEdge(params, els));

  const onElementsRemove = (elementsToRemove: Elements) =>
    setNetworkElements((els) => removeElements(elementsToRemove, els));

  const onElementClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    element: FlowElement
  ) => {
    dispatch(setCurrentElementAction(element));
    setCurrentElement(element);
  };

  React.useEffect(() => {
    if (success) {
      enqueueSnackbar("Network Generated", {
        persist: false,
        variant: "success",
      });
    }
  }, []);

  React.useEffect(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.fitView();
    }

    dispatch(hideSpinnerAction());

    if (success) {
      enqueueSnackbar("Network Generated", {
        persist: false,
        variant: "success",
      });
    }
  }, [reactFlowInstanceRef, networkElements]);

  return (
    <div className={classes.root}>
      <ReactFlowProvider>
        <div className={classes.networkBody}>
          <div className={classes.networkPanel}>
            <NetworkPanel />
          </div>
          <div
            ref={mergeRefs([drop])}
            style={dropTargetStyle}
            className={classes.networkContent}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: 2,
              }}
            >
              <NetworkTitlePlaque />
              <NetworkDiagramButtons {...NetworkDiagramIconsProps} />
            </div>
            <ReactFlow
              ref={networkRef}
              style={{ height: `calc(100% - 30px)` }}
              elements={allNetworkElements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onLoad={onLoad}
              snapToGrid={false}
              snapGrid={[15, 15]}
              nodeTypes={nodeTypes}
              connectionLineType={ConnectionLineType.Bezier}
              onElementClick={onElementClick}
              deleteKeyCode={46}
              defaultZoom={1.5}
              minZoom={0.2}
              maxZoom={4}
              onPaneContextMenu={(event) => console.log(event)}
            >
              {showMiniMap && (
                <MiniMap
                  nodeStrokeColor={(n: Node) => {
                    if (n.style?.background)
                      return n.style.background.toString();
                    if (n.type === "manifoldNode") return "#0041d0";
                    if (n.type === "flowstationNode") return "#31BFCC";
                    if (n.type === "gasFacilityNode") return "#ff0072";
                    if (n.type === "drainagePointNode") return "#ff3400";
                    if (n.type === "terminal") return "#1a192b";
                    return "#eee";
                  }}
                  nodeColor={(n) => {
                    if (n.style?.background)
                      return n.style.background.toString();
                    return "#fff";
                  }}
                  nodeBorderRadius={2}
                />
              )}
              {showControls && <Controls />}
              <Background variant={BackgroundVariant.Lines} gap={16} />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
      {showContextDrawer && (
        <ContextDrawer>
          {() => {
            if (showNetworkElementDetails === "showDrainagePointDetails")
              return <DrainagePointContextDrawer data={currentPopoverData} />;
            else if (showNetworkElementDetails === "showManifoldDetails")
              return <ManifoldContextDrawer data={currentPopoverData} />;
            else if (showNetworkElementDetails === "showFlowstationDetails")
              return <FlowstationContextDrawer data={currentPopoverData} />;
            else if (showNetworkElementDetails === "showGasfacilityDetails")
              return <GasfacilityContextDrawer data={currentPopoverData} />;
            else if (showNetworkElementDetails === "showTerminalDetails")
              return <TerminalContextDrawer data={currentPopoverData} />;
            else return <div></div>;
          }}
        </ContextDrawer>
      )}
    </div>
  );
};

export default NetworkAuto;
