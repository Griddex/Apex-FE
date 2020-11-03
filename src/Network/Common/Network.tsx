import { makeStyles } from "@material-ui/core/styles";
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
  project,
  removeElements,
  useStoreActions,
  XYPosition,
} from "@griddex/react-flow-updated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import {
  FlowstationNode,
  GasFacilityNode,
  GatheringCenterNode,
  ManifoldNode,
  TerminalNode,
  WellheadNode,
} from "../Components/Widgets/Widgets";
import ItemTypes from "./../../Visualytics/Utils/DragAndDropItemTypes";
import { setCurrentElementAction } from "./../Redux/Actions/NetworkActions";
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
    width: "15%",
    minWidth: 200,
    // border: "1px solid #A8A8A8",
    backgroundColor: "#FFF",
    padding: 5,
  },
  networkContent: {
    marginLeft: 5,
    height: "100%",
    width: "85%",
    backgroundColor: "#FFF",
  },
  CanvasWidget: { height: "100%", backgroundColor: "#FFF" },
}));

const onLoad = (reactFlowInstance: OnLoadParams) => {
  reactFlowInstance.fitView();
};

const nodeTypes: NodeTypesType = {
  wellheadNode: WellheadNode,
  manifoldNode: ManifoldNode,
  flowstationNode: FlowstationNode,
  gasFacilityNode: GasFacilityNode,
  gatheringCenterNode: GatheringCenterNode,
  terminalNode: TerminalNode,
};

interface NodeComponentsType {
  [key: string]: React.MemoExoticComponent<() => JSX.Element>;
}

const nodeComponents: NodeComponentsType = {
  wellhead: WellheadNode,
  manifold: ManifoldNode,
  flowstation: FlowstationNode,
  gasFacility: GasFacilityNode,
  gatheringCenter: GatheringCenterNode,
  terminal: TerminalNode,
};

const Network = () => {
  const dispatch = useDispatch();

  const { updateNodePosDiff } = useStoreActions((actions) => actions);
  const [currentElement, setCurrentElement] = React.useState<FlowElement>(
    {} as FlowElement
  );
  const onNodeDragStop = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    console.log("Drag stop", event, node);
    updateNodePosDiff({ id: currentElement.id, isDragging: false });
  };

  const onElementClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    element: FlowElement
  ) => {
    dispatch(setCurrentElementAction(element));
    setCurrentElement(element);
  };

  const classes = useStyles();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

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

  const elem = [
    {
      id: "0",
      type: "output",
      style: { width: "auto", padding: "0px" },
      data: { label: "Hello" },
      position: { x: 200, y: 200 },
    },
  ] as Elements;

  const [elements, setElements] = React.useState(elem);
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
    console.log("Logged output -->: mouseCoord", mouseCoord);
    const mouseCoord1 = monitor.getInitialClientOffset() as XYPosition;
    console.log("Logged output -->: mouseCoord1", mouseCoord1);
    const mouseCoord2 = monitor.getInitialSourceClientOffset() as XYPosition;
    console.log("Logged output -->: mouseCoord2", mouseCoord2);
    const mouseCoord3 = monitor.getDifferenceFromInitialOffset() as XYPosition;
    console.log("Logged output -->: mouseCoord3", mouseCoord3);
    const mouseCoord4 = monitor.getSourceClientOffset() as XYPosition;
    console.log("Logged output -->: mouseCoord4", mouseCoord4);
    const mouseCoordProjected = project(mouseCoord4);
    console.log("Logged output -->: mouseCoordProjected", mouseCoordProjected);
    const mouseCoordUpdated = {
      x: mouseCoordProjected.x - 246,
      y: mouseCoordProjected.y - 70,
    } as XYPosition;
    console.log("Logged output -->: mouseCoordUpdated", mouseCoordUpdated);
    // const flowPosition = project(mouseCoord as XYPosition);
    // console.log("Logged output -->: flowPosition", flowPosition);
    interface NodeDimensionsType {
      [key: string]: [string, string];
    }

    const nodeDimensions: NodeDimensionsType = {
      wellhead: ["20px", "20px"],
      manifold: ["60px", "40px"],
      flowstation: ["60px", "40px"],
      gasFacility: ["60px", "40px"],
      gatheringCenter: ["80px", "40px"],
      terminal: ["80px", "40px"],
    };
    const CurrentNode = nodeComponents[nodeType];
    const CurrentDimensions = nodeDimensions[nodeType];
    const newElement: FlowElement = {
      id: elements.length.toString(),
      type: `${nodeType}Node`,
      style: {
        width: CurrentDimensions[0],
        height: CurrentDimensions[1],
        padding: "0px",
        borderColor: "#2BB4C1",
      },
      data: {
        label: <CurrentNode />,
        // onMouseOver: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        //   console.log("Mouse over"),
      },
      position: { ...mouseCoordUpdated } as XYPosition,
    };
    setElements((els) => [...els, newElement]);
  };
  //TODO: show context drawer from first render or contextually
  //from right clicking on an object on the canvas
  // useEffect(() => {
  //   dispatch(contextDrawerShowAction());
  // }, [dispatch]);

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
            <ReactFlow
              elements={elements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onLoad={onLoad}
              // snapToGrid={true}
              // snapGrid={[15, 15]}
              nodeTypes={nodeTypes}
              connectionLineType={ConnectionLineType.Step}
              // connectionLineStyle={{ strokeWidth: "2px" }}
              onElementClick={onElementClick}
              onNodeDragStop={onNodeDragStop}
              deleteKeyCode={46}
              defaultZoom={1.5}
              minZoom={0.2}
              maxZoom={4}
            >
              <MiniMap
                nodeStrokeColor={(n: Node) => {
                  if (n.style?.background) return n.style.background.toString();
                  if (n.type === "manifoldNode") return "#0041d0";
                  if (n.type === "flowstationNode") return "#2BB4C1";
                  if (n.type === "gasFacilityNode") return "#ff0072";
                  if (n.type === "wellheadNode") return "#ff3400";
                  if (n.type === "terminal") return "#1a192b";
                  return "#eee";
                }}
                nodeColor={(n) => {
                  if (n.style?.background) return n.style.background.toString();
                  return "#fff";
                }}
                nodeBorderRadius={2}
              />
              <Controls />
              {/* Write individual controls to grow with container size */}
              <Background variant={BackgroundVariant.Lines} gap={16} />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
      {showContextDrawer && (
        <div>Network</div>
        // <ContextDrawer data={data}>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default Network;
