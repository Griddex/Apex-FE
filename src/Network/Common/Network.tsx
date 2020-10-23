import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
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

const nodeTypes: NodeTypesType = {
  // wellheadNode: () => <Widgets nodeType="Wellhead" />,
  wellheadNode: () => <Widgets nodeType="Wellhead" />,
  // wellheadNode: () => (
  //   <div style={{ width: "40px", height: "40px", backgroundColor: "blue" }} />
  // ),
};

const initialElements = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: {
      label: "Another default node",
    },
  },
  {
    id: "5",
    data: {
      label: "Node id: 5",
    },
    position: { x: 250, y: 325 },
  },
  {
    id: "6",
    type: "output",
    data: {
      label: (
        <>
          An <strong>output node</strong>
        </>
      ),
    },
    position: { x: 100, y: 480 },
  },
  {
    id: "7",
    type: "output",
    data: { label: "Another output node" },
    position: { x: 400, y: 450 },
  },
  {
    id: "8",
    type: "output",
    style: { width: "auto", padding: "0px" },
    data: { label: <Widgets nodeType="wellhead" /> },
    position: { x: 200, y: 200 },
  },
  { id: "e1-2", source: "1", target: "2", label: "this is an edge label" },
  { id: "e1-3", source: "1", target: "3" },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "animated edge",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    arrowHeadType: "arrowclosed",
    label: "edge with arrow head",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    label: "smooth step edge",
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "step",
    style: { stroke: "#f6ab6c" },
    label: "a step edge",
    animated: true,
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
] as Elements;

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
      backgroundColor: "green",
    };
  } else if (canDrop) {
    dndCanvasStyle = {
      border: "1px solid red",
      backgroundColor: "red",
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

  // const [mousePoint, setMousePoint] = React.useState({ x: 100, y: 100 });
  // const [nodeType, setNodeType] = React.useState("default");

  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const { nodeType } = monitor.getItem();
    const mouseCoord = monitor.getClientOffset() as XYPosition;
    // setMousePoint(mouseCoord);
    // setNodeType(nodeType);
    // const flowPoint = project({ x: mousePoint?.x, y: mousePoint?.y });
    const flowPosition = project(mouseCoord as XYPosition);

    const newElement: FlowElement = {
      id: elements.length.toString(),
      type: "output",
      style: { width: "auto", padding: "0px" },
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
            snapToGrid={true}
            snapGrid={[15, 15]}
            nodeTypes={nodeTypes}
          >
            <MiniMap
              nodeStrokeColor={(n: Node) => {
                if (n.style?.background) return n.style.background.toString();
                if (n.type === "input") return "#0041d0";
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
            <Controls />{" "}
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
