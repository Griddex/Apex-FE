import { makeStyles } from "@material-ui/core/styles";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import * as _ from "lodash";
import React from "react";
import {
  DragObjectWithType,
  DropTargetMonitor,
  useDrop,
  XYCoord,
} from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import useForceUpdate from "use-force-update";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import ItemTypes from "../../Visualytics/Utils/DragAndDropItemTypes";
import nodeFactory from "../Components/Nodes/NodeFactory";
import { CanvasApi } from "./CanvasApi";
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

const NetworkEngine = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  // const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const { showContextDrawer } = useSelector<IRootState>((state) => state.layoutReducer);
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const [{ isOver, canDrop, currentPoint }, drop] = useDrop({
    accept: ItemTypes.NETWORK_ELEMENT,
    drop: (item, monitor) => handleWidgetDrop(item, monitor),
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        currentPoint: monitor.getClientOffset(),
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
  const canvasApi = new CanvasApi();
  const engine = canvasApi.getDiagramEngine();
  const model = canvasApi.getActiveDiagram();

  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const data = monitor.getItem();
    const nodesCount = _.keys(engine.getModel().getNodes()).length;
    console.log("Logged output -->: nodesCount", nodesCount);

    const coord: XYCoord | null = currentPoint;
    console.log("Logged output -->: coord", coord);
    if (coord) {
      const nodeName = `Node ${nodesCount + 1}`;
      const node = nodeFactory(nodeName, data.nodeType);
      console.log("Logged output -->: nodeName", nodeName);

      node.addInPort("In");
      node.addInPort("Out");

      const point = engine.getRelativeMousePoint({
        clientX: coord.x,
        clientY: coord.y,
      });
      node.setPosition(point);
      console.log("Logged output -->: point", point);
      console.log("Logged output -->: node", node);
      engine.getModel().addNode(node);
      // model.addNode(node);
      console.log("Logged output -->: engine", engine);

      // engine.repaintCanvas();
      forceUpdate();
    }
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
          <NetworkPanel model={model} />
        </div>
        <div
          ref={drop}
          style={dndCanvasStyle}
          className={classes.networkContent}
        >
          <CanvasWidget
            engine={canvasApi.getDiagramEngine()}
            className={classes.CanvasWidget}
          />
        </div>
      </div>
      {showContextDrawer && (
        <div>Network</div>
        // <ContextDrawer data={data}>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default NetworkEngine;
