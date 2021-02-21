import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
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
import ItemTypes from "./../../Visualytics/Utils/DragAndDropItemTypes";
import WellheadSummaryNode from "./../Components/Widgets/WellheadSummaryWidget";
import {
  setCurrentElementAction,
  setCurrentPopoverDataAction,
  setCurrentPopoverIdAction,
} from "./../Redux/Actions/NetworkActions";
import GenerateNodeService from "./../Services/GenerateNodeService";
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { success, nodeElements, edgeElements } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const renderCount = React.useRef<number>(1);
  const [showMiniMap, setShowMiniMap] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [rfi, setRfi] = React.useState<OnLoadParams>({} as OnLoadParams);
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

    localDispatch({
      type: "UPDATE_ELEMENTS",
      payload: [...networkElements, updatedNewElement],
    });
  };

  //Flow Elements
  const nodeElementsWithWidgets = AddWidgetsToNodes(nodeElements as Node[]);
  const allNetworkElements = [
    ...nodeElementsWithWidgets,
    ...(edgeElements as Edge[]),
  ];

  const init = (allNetworkElements: FlowElement[]) => {
    return allNetworkElements;
  };

  const reducer = (state: FlowElement[], action: any) => {
    switch (action.type) {
      case "INITIALIZE_ELEMENTS":
        return state;
      case "UPDATE_ELEMENTS":
      case "REMOVE_ELEMENTS":
      case "CONNECT_ELEMENTS": {
        const updatedElements = action.payload;
        return updatedElements;
      }
      default:
        break;
    }
  };

  const [networkElements, localDispatch] = React.useReducer(
    reducer,
    allNetworkElements,
    init
  );
  console.log(
    "Logged output --> ~ file: Network.tsx ~ line 190 ~ Network ~ networkElements",
    networkElements
  );

  const onElementsRemove = (elementsToRemove: Elements) => {
    renderCount.current = renderCount.current + 1;

    const updatedElements = removeElements(elementsToRemove, networkElements);
    localDispatch({ type: "REMOVE_ELEMENTS", payload: updatedElements });
  };

  const onConnect = (params: Edge | Connection) => {
    renderCount.current = renderCount.current + 1;

    const updatedElements = addEdge(params, networkElements);
    localDispatch({ type: "CONNECT_ELEMENTS", payload: updatedElements });
  };

  const onElementClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    element: FlowElement
  ) => {
    dispatch(setCurrentElementAction(element));
    setCurrentElement(element);
  };

  const onLoad = (reactFlowInstance: OnLoadParams) => {
    reactFlowInstance.fitView();
    setRfi(reactFlowInstance);
    console.log("Inside Onload");
  };

  React.useEffect(() => {
    if (success) {
      enqueueSnackbar("Network Generated", {
        persist: false,
        variant: "success",
      });
    }

    // localDispatch({type: "CONNECT_ELEMENTS", payload: updatedElements})
  }, []);

  return (
    <div className={classes.root}>
      <ReactFlowProvider>
        <div className={classes.networkBody}>
          <div className={classes.networkPanel}>
            <NetworkPanel />
          </div>
          <div
            ref={composeRefs(drop)}
            style={dndCanvasStyle}
            className={classes.networkContent}
          >
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <NetworkTitlePlaque />
              <NetworkDiagramButtons {...NetworkDiagramIconsProps} />
            </div>
            <ReactFlow
              elements={
                renderCount.current === 1 ? allNetworkElements : networkElements
              }
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
