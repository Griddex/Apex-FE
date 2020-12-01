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
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import FlowstationNode from "../Components/Widgets/FlowstationWidget";
import GasFacilityNode from "../Components/Widgets/GasFacilityWidget";
import GatheringCenterNode from "../Components/Widgets/GatheringCenterWidget";
import ManifoldNode from "../Components/Widgets/ManifoldWidget";
import TerminalNode from "../Components/Widgets/TerminalWidget";
import WellheadNode from "../Components/Widgets/WellheadWidget";
import WellheadSummaryNode from "./../Components/Widgets/WellheadSummaryWidget";
import AddWidgetsToNodes from "../Utils/AddWidgetsToNodes";
import ItemTypes from "./../../Visualytics/Utils/DragAndDropItemTypes";
import WellheadContextDrawer from "../Components/ContextDrawer/ManifoldContextDrawer";
import ManifoldContextDrawer from "../Components/ContextDrawer/ManifoldContextDrawer";
import {
  setCurrentElementAction,
  setCurrentPopoverDataAction,
  setCurrentPopoverIdAction,
  showPopoverAction,
} from "./../Redux/Actions/NetworkActions";
import GenerateNodeService from "./../Services/GenerateNodeService";
import NetworkPanel from "./NetworkPanel";
import FlowstationContextDrawer from "../Components/ContextDrawer/FlowstationContextDrawer";
import GasfacilityContextDrawer from "../Components/ContextDrawer/GasfacilityContextDrawer";
import TerminalContextDrawer from "../Components/ContextDrawer/TerminalContextDrawer";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import Button from "@material-ui/core/Button";
import { runForecastRequestAction } from "../Redux/Actions/NetworkActions";

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
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  networkPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 200,
    minWidth: 200,
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
    padding: 5,
  },
  networkContent: {
    marginLeft: 5,
    height: "100%",
    width: "85%",
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
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

const Network = () => {
  const [rfi, setRfi] = React.useState<OnLoadParams>({} as OnLoadParams);
  const onLoad = (reactFlowInstance: OnLoadParams) => {
    reactFlowInstance.fitView();
    setRfi(reactFlowInstance);
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentElement, setCurrentElement] = React.useState<FlowElement>(
    {} as FlowElement
  );
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const onElementClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    element: FlowElement
  ) => {
    dispatch(setCurrentElementAction(element));
    setCurrentElement(element);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.NETWORK_ELEMENT,
    drop: (item, monitor) => handleWidgetDrop(item, monitor),
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  const isActive = canDrop && isOver;
  let dndCanvasStyle = {};
  if (isActive) {
    dndCanvasStyle = {
      border: "1px solid green",
    };
  } else if (canDrop) {
    dndCanvasStyle = {
      border: "1px solid grey",
    };
  }

  const { nodeElements, edgeElements } = useSelector(
    (state: RootState) => state.networkReducer
  );
  const nodeElementsWithWidgets = AddWidgetsToNodes(nodeElements);
  const allNetworkElements = [...nodeElementsWithWidgets, ...edgeElements];

  const [elements, setElements] = React.useState(
    allNetworkElements as Elements
  );
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params: Edge | Connection) =>
    setElements((els) => addEdge(params, els));

  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const { nodeType } = monitor.getItem();
    const mouseCoord = monitor.getClientOffset() as XYPosition;

    const mouseCoordUpdated = {
      x: mouseCoord.x - 250,
      y: mouseCoord.y - 80,
    } as XYPosition;
    const mouseCoordProjected = rfi.project(mouseCoordUpdated);

    const newElement: FlowElement = GenerateNodeService(nodeType);
    const updatedNewElement = {
      ...newElement,
      position: { ...mouseCoordProjected } as XYPosition,
    };

    setElements((els) => [...els, updatedNewElement]);
  };

  const { currentPopoverData, showNetworkElementContextMenu } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const [showMiniMap, setShowMiniMap] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);

  return (
    <div className={classes.root}>
      <ReactFlowProvider>
        <div className={classes.networkBody}>
          <div className={classes.networkPanel}>
            <NetworkPanel />
          </div>
          <div
            ref={drop}
            style={dndCanvasStyle}
            className={classes.networkContent}
          >
            <div className={classes.networkContentIcons}>
              <Button
                startIcon={<SubscriptionsOutlinedIcon />}
                variant="outlined"
                color="secondary"
                style={{ height: "28px" }}
                onClick={() => dispatch(runForecastRequestAction())}
              >
                Run Forecast
              </Button>
              <Button
                startIcon={<MapOutlinedIcon />}
                variant="outlined"
                color="primary"
                style={{ height: "28px" }}
                onClick={() => setShowMiniMap(!showMiniMap)}
              >
                Toggle Minimap
              </Button>
              <Button
                startIcon={<ViewAgendaOutlinedIcon />}
                variant="outlined"
                color="default"
                style={{ height: "28px" }}
                onClick={() => setShowControls(!showControls)}
              >
                Toggle Controls
              </Button>
            </div>
            <ReactFlow
              elements={elements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onLoad={onLoad}
              snapToGrid={false}
              snapGrid={[15, 15]}
              nodeTypes={nodeTypes}
              connectionLineType={ConnectionLineType.Bezier}
              // connectionLineStyle={{ strokeWidth: "2px" }}
              onElementClick={onElementClick}
              deleteKeyCode={46}
              defaultZoom={1.5}
              minZoom={0.2}
              maxZoom={4}
              // onNodeContextMenu={(_, node) => console.log("Right click", node)}
              onNodeMouseEnter={(_, node) => {
                dispatch(showPopoverAction(true));
                dispatch(setCurrentPopoverIdAction(node.id));
                dispatch(setCurrentPopoverDataAction(node.data.forecastData));
              }}
              // onNodeMouseLeave={(_, node) => dispatch(showPopoverAction(false))}
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
        <ContextDrawer data={currentPopoverData}>
          {(data: Record<string, unknown>) => {
            if (showNetworkElementContextMenu === "showWellheadContextMenu")
              return <WellheadContextDrawer data={data} />;
            else if (
              showNetworkElementContextMenu === "showManifoldContextMenu"
            )
              return <ManifoldContextDrawer data={data} />;
            else if (
              showNetworkElementContextMenu === "showFlowstationContextMenu"
            )
              return <FlowstationContextDrawer data={data} />;
            else if (
              showNetworkElementContextMenu === "showGasfacilityContextMenu"
            )
              return <GasfacilityContextDrawer data={data} />;
            else if (
              showNetworkElementContextMenu === "showTerminalContextMenu"
            )
              return <TerminalContextDrawer data={data} />;
          }}
        </ContextDrawer>
      )}
    </div>
  );
};

export default Network;
