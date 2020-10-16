import { makeStyles } from "@material-ui/core/styles";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contextDrawerShowAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  chartBody: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  chartPanel: {
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
  chartContent: {
    marginLeft: 5,
    height: "100%",
    width: "85%",
    backgroundColor: "#FFF",
  },
  CanvasWidget: { height: "100%", backgroundColor: "#FFF" },
}));

const Visualytics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const { showContextDrawer } = useSelector<IRootState>((state) => state.layoutReducer);
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const engine = createEngine();

  // node 1
  const node1 = new DefaultNodeModel({
    name: "Well 1",
    color: "rgb(0,192,255)",
  });
  node1.setPosition(100, 100);
  let port1 = node1.addOutPort("Out");

  // node 2
  const node2 = new DefaultNodeModel({
    name: "FlowStation 1",
    color: "rgb(200,255,100)",
  });
  node2.setPosition(100, 200);
  let port2 = node2.addOutPort("Out");

  // link them and add a label to the link
  const link = port1.link<DefaultLinkModel>(port2);
  link.addLabel("Hello World!");

  const model = new DiagramModel();
  model.addAll(node1, node2, link);
  engine.setModel(model);

  useEffect(() => {
    dispatch(contextDrawerShowAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          {/* <SelectChartDataPanel /> */}
          <div>Panel</div>
        </div>
        <div className={classes.chartContent}>
          <CanvasWidget engine={engine} className={classes.CanvasWidget} />
        </div>
      </div>
      {showContextDrawer && (
        <div>Network</div>
        // <ContextDrawer data={data}>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default Visualytics;
