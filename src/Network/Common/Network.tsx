import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import ReactFlow, {
  addEdge,
  Background,
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
  project,
  removeElements,
  XYPosition,
} from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import Widgets from "../Components/Widgets/Widgets";
import ItemTypes from "./../../Visualytics/Utils/DragAndDropItemTypes";
import NetworkPanel from "./NetworkPanel";

const useStyles = makeStyles((theme) => ({
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
const onNodeDragStop = (
  event: React.MouseEvent<Element, MouseEvent>,
  node: Node
) => console.log("drag stop", node);
const onElementClick = (
  event: React.MouseEvent<Element, MouseEvent>,
  element: FlowElement
) => console.log("click", element);

const nodeTypes: NodeTypesType = {
  wellheadNode: () => <Widgets nodeType="Wellhead" />,
};

const Network = () => {
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
      data: { label: <Widgets nodeType="wellhead" /> },
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
    const flowPosition = project(mouseCoord as XYPosition);
    console.log("Logged output -->: flowPosition", flowPosition);

    const newElement: FlowElement = {
      id: elements.length.toString(),
      type: "input",
      style: { width: "100px", padding: "5px", borderColor: "#2BB4C1" },
      data: { label: <Widgets nodeType={nodeType} /> },
      position: { ...flowPosition } as XYPosition,
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
            // defaultZoom={0.2}
            // minZoom={0.2}
            // maxZoom={4}
            // ref={drop}
          >
            <MiniMap
              nodeStrokeColor={(n: Node) => {
                if (n.style?.background) return n.style.background.toString();
                // if (n.type === "input") return "#0041d0";
                if (n.type === "input") return "#2BB4C1";
                if (n.type === "output") return "#ff0072";
                if (n.type === "wellheadNode") return "#ff3400";
                if (n.type === "default") return "#1a192b";
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
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </div>
      {showContextDrawer && (
        <div>Network</div>
        // <ContextDrawer data={data}>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default Network;
