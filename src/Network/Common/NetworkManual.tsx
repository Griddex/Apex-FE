import makeStyles from "@mui/styles/makeStyles";
import capitalize from "lodash.capitalize";
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
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import NetworkDiagramButtons from "../Components/Icons/NetworkDiagramButtons";
import NetworkTitlePlaque from "../Components/TitlePlaques/NetworkTitlePlaque";
import { IExtraNodeProps } from "../Components/Widgets/WidgetTypes";
import { nodeTypes } from "../Data/NetworkData";
import {
  setCurrentElementAction,
  updateNetworkParameterAction,
} from "../Redux/Actions/NetworkActions";
import GenerateNodeService from "../Services/GenerateNodeService";
import "../Styles/NetworkValidation.css";
import { itemTypes } from "../Utils/DragAndDropItemTypes";
import { INetworkProps } from "./NetworkLandingTypes";
import DrainagePointContextDrawer from "../Components/ContextDrawer/DrainagePointContextDrawer";

const ContextDrawer = React.lazy(
  () => import("../../Application/Components/Drawers/ContextDrawer")
);
const FlowstationContextDrawer = React.lazy(
  () => import("../Components/ContextDrawer/FlowstationContextDrawer")
);
const GasfacilityContextDrawer = React.lazy(
  () => import("../Components/ContextDrawer/GasfacilityContextDrawer")
);
const ManifoldContextDrawer = React.lazy(
  () => import("../Components/ContextDrawer/ManifoldContextDrawer")
);
const TerminalContextDrawer = React.lazy(
  () => import("../Components/ContextDrawer/TerminalContextDrawer")
);
const NetworkPanel = React.lazy(() => import("./NetworkPanel"));

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (reducer) => reducer
);

const nodeElementsManualSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.nodeElementsManual,
  (data) => data
);
const edgeElementsManualSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.edgeElementsManual,
  (data) => data
);
const currentPopoverDataSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.currentPopoverData,
  (data) => data
);
const showNetworkElementDetailsSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.showNetworkElementDetails,
  (data) => data
);

const NetworkManual = ({ isNetworkAuto }: INetworkProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const showContextDrawer = useSelector(showContextDrawerSelector);

  const networkRef = React.useRef<HTMLElement>(null);
  const reactFlowInstanceRef = React.useRef<OnLoadParams | null>(null);

  const [nodeElements, setNodeElements] = React.useState([] as Elements);
  const [edgeElements, setEdgeElements] = React.useState([] as Elements);
  const [showMiniMap, setShowMiniMap] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [currentElement, setCurrentElement] = React.useState<FlowElement>(
    {} as FlowElement
  );

  const nodeElementsManual = useSelector(nodeElementsManualSelector);
  const edgeElementsManual = useSelector(edgeElementsManualSelector);
  const currentPopoverData = useSelector(currentPopoverDataSelector);
  const showNetworkElementDetails = useSelector(
    showNetworkElementDetailsSelector
  );

  const NetworkDiagramIconsProps = {
    showMiniMap,
    setShowMiniMap,
    showControls,
    setShowControls,
  };

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: itemTypes.NETWORK_ELEMENT,
      drop: (_, monitor) => handleWidgetDrop(monitor, nodeElementsManual),
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        };
      },
    }),
    [nodeElementsManual]
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

  const handleWidgetDrop = (
    monitor: DropTargetMonitor,
    nodesManual: Node[] & IExtraNodeProps[]
  ) => {
    const networkBounds = (
      networkRef.current as HTMLElement
    ).getBoundingClientRect();

    const { nodeType } = monitor.getItem() as any;
    const mouseCoord = monitor.getClientOffset() as XYPosition;

    const mouseCoordUpdated = {
      x: mouseCoord.x - networkBounds.left,
      y: mouseCoord.y - networkBounds.top + 31,
    } as XYPosition;

    const mouseCoordProjected = (
      reactFlowInstanceRef.current as OnLoadParams
    ).project(mouseCoordUpdated);

    const noOfNodes =
      nodesManual.filter((node) => node.type === `${nodeType}Node`).length + 1;

    const nodeTitle = `${capitalize(nodeType)}_${noOfNodes}`;

    const newNodeElement = GenerateNodeService(nodeType, isNetworkAuto) as Node;
    const updatedNewNodeElement = {
      ...newNodeElement,
      data: { ...newNodeElement.data, title: nodeTitle },
      position: mouseCoordProjected as XYPosition,
    };

    setNodeElements((es) => es.concat(updatedNewNodeElement));
  };

  const onLoad = (reactFlowInstance: OnLoadParams) =>
    (reactFlowInstanceRef.current = reactFlowInstance);

  const onConnect = (params: Edge | Connection) =>
    setEdgeElements((els) => addEdge(params, els));

  const onElementsRemove = (elementsToRemove: Elements) => {
    setNodeElements((els) => removeElements(elementsToRemove, els));
    setEdgeElements((els) => removeElements(elementsToRemove, els));
  };

  const onElementClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    element: FlowElement
  ) => {
    dispatch(setCurrentElementAction(element));
    setCurrentElement(element);
  };

  React.useEffect(() => {
    setNodeElements(nodeElementsManual);
    setEdgeElements(edgeElementsManual);
  }, []);

  React.useEffect(() => {
    dispatch(updateNetworkParameterAction("nodeElementsManual", nodeElements));
  }, [nodeElements]);

  React.useEffect(() => {
    dispatch(updateNetworkParameterAction("edgeElementsManual", edgeElements));
  }, [edgeElements]);

  return (
    <div className={classes.root}>
      <ReactFlowProvider>
        <div className={classes.networkBody}>
          <div className={classes.networkPanel}>
            <NetworkPanel />
          </div>
          <div
            ref={mergeRefs([drop, networkRef])}
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
              className="validationflow"
              style={{ height: `calc(100% - 30px)` }}
              elements={[...nodeElements, ...edgeElements]}
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

export default NetworkManual;
