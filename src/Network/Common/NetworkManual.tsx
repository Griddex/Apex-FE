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
  NodeTypesType,
  OnLoadParams,
  ReactFlowProvider,
  removeElements,
  XYPosition,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import { IAllWorkflows } from "../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import composeRefs from "../../Application/Utils/ComposeRefs";
import FlowstationContextDrawer from "../Components/ContextDrawer/FlowstationContextDrawer";
import GasfacilityContextDrawer from "../Components/ContextDrawer/GasfacilityContextDrawer";
import {
  default as ManifoldContextDrawer,
  default as WellheadContextDrawer,
} from "../Components/ContextDrawer/ManifoldContextDrawer";
import TerminalContextDrawer from "../Components/ContextDrawer/TerminalContextDrawer";
import NetworkDiagramButtons from "../Components/Icons/NetworkDiagramButtons";
import NetworkTitlePlaque from "../Components/TitlePlaques/NetworkTitlePlaque";
import FlowstationNode from "../Components/Widgets/FlowstationWidget";
import GasFacilityNode from "../Components/Widgets/GasFacilityWidget";
import GatheringCenterNode from "../Components/Widgets/GatheringCenterWidget";
import ManifoldNode from "../Components/Widgets/ManifoldWidget";
import TerminalNode from "../Components/Widgets/TerminalWidget";
import WellheadNode from "../Components/Widgets/WellheadWidget";
import AddWidgetsToNodes from "../Utils/AddWidgetsToNodes";
import { itemTypes } from "../Utils/DragAndDropItemTypes";
import WellheadSummaryNode from "../Components/Widgets/WellheadSummaryWidget";
import { setCurrentElementAction } from "../Redux/Actions/NetworkActions";
import GenerateNodeService from "../Services/GenerateNodeService";
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

const nodeTypes: NodeTypesType = {
  wellheadSummaryNode: WellheadSummaryNode,
  wellheadNode: WellheadNode,
  manifoldNode: ManifoldNode,
  flowstationNode: FlowstationNode,
  gasFacilityNode: GasFacilityNode,
  gatheringCenterNode: GatheringCenterNode,
  terminalNode: TerminalNode,
};

const Network = ({ isNetworkAuto }: INetworkProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const networkRef = React.useRef<HTMLElement>(null);
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
      networkRef.current as HTMLElement
    ).getBoundingClientRect();
    console.log(
      "Logged output --> ~ file: NetworkManual.tsx ~ line 170 ~ handleWidgetDrop ~ networkBounds",
      networkBounds
    );

    const { nodeType } = monitor.getItem() as any;
    const mouseCoord = monitor.getClientOffset() as XYPosition;
    const mouseCoord1 = monitor.getInitialClientOffset() as XYPosition;
    console.log(
      "Logged output --> ~ file: NetworkManual.tsx ~ line 178 ~ handleWidgetDrop ~ mouseCoord1",
      mouseCoord1
    );
    console.log(
      "Logged output --> ~ file: NetworkManual.tsx ~ line 177 ~ handleWidgetDrop ~ mouseCoord",
      mouseCoord
    );

    const mouseCoordUpdated = {
      x: mouseCoord.x - networkBounds.left,
      y: mouseCoord.y - networkBounds.top + 31,
    } as XYPosition;

    const mouseCoordProjected = (
      reactFlowInstanceRef.current as OnLoadParams
    ).project(mouseCoordUpdated);
    console.log(
      "Logged output --> ~ file: NetworkManual.tsx ~ line 182 ~ handleWidgetDrop ~ mouseCoordProjected",
      mouseCoordProjected
    );

    const newElement: FlowElement = GenerateNodeService(nodeType);
    const updatedNewElement = {
      ...newElement,
      position: { ...mouseCoordProjected } as XYPosition,
    };

    setNetworkElements((es) => es.concat(updatedNewElement));
  };

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

  return (
    <div className={classes.root}>
      <ReactFlowProvider>
        <div className={classes.networkBody}>
          <div className={classes.networkPanel}>
            <NetworkPanel />
          </div>
          <div
            ref={composeRefs(drop, networkRef)}
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
              style={{ height: `calc(100% - 30px)` }}
              elements={networkElements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onLoad={onLoad}
              snapToGrid={false}
              snapGrid={[15, 15]}
              nodeTypes={nodeTypes}
              connectionLineType={ConnectionLineType.Bezier}
              onElementClick={onElementClick}
              deleteKeyCode={46}
              // defaultZoom={1.5}
              minZoom={0.2}
              maxZoom={4}
              // onNodeMouseEnter={(event, node) => {
              //   // dispatch(showPopoverAction(true));
              //   dispatch(setCurrentPopoverIdAction(node.id));
              //   dispatch(setCurrentPopoverDataAction(node.data.forecastData));

              //   event.nativeEvent.stopImmediatePropagation();
              // }}
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
                    if (n.type === "wellheadNode") return "#ff3400";
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
            if (showNetworkElementDetails === "showWellheadDetails")
              return <WellheadContextDrawer data={currentPopoverData} />;
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

export default Network;