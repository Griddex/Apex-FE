import { makeStyles } from "@material-ui/core/styles";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import createEngine, {
  DiagramModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { contextDrawerShowAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import ItemTypes from "./../../Visualytics/Utils/DragAndDropItemTypes";
import { ApexPortFactory } from "./../Components/Nodes/Wellhead/Ports/ApexPortFactory";
import { WellheadNodeFactory } from "./../Components/Nodes/Wellhead/WellheadNodeFactory";
import { WellheadNodeModel } from "./../Components/Nodes/Wellhead/WellheadNodeModel";
import { WellheadPortModel } from "./../Components/Nodes/Wellhead/WellheadPortModel";
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

  // const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const { showContextDrawer } = useSelector<IRootState>((state) => state.layoutReducer);
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.NETWORK_ELEMENT,
    drop: () => ({ name: "Network" }),
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  const isActive = canDrop && isOver;
  let dndYAxisStyle = {};
  if (isActive) {
    dndYAxisStyle = {
      strokeWidth: 2,
      // opacity: 0.5,
      fontSize: 16,
      outline: "1px solid green",
      outlineStyle: "dashed",
      fill: "green",
      stroke: "green",
    };
  } else if (canDrop) {
    dndYAxisStyle = {
      fill: "red",
      stroke: "red",
      outline: "1px solid red",
      outlineStyle: "dashed",
    };
  }

  const engine = createEngine();
  // register some other factories as well
  engine
    .getPortFactories()
    .registerFactory(
      new ApexPortFactory(
        "wellhead",
        (config) => new WellheadPortModel(PortModelAlignment.LEFT)
      )
    );
  engine.getNodeFactories().registerFactory(new WellheadNodeFactory());

  // const WellheadNode : WellheadNodeModel = ( options: DefaultNodeModelOptions) => {
  // options.
  // }

  // node 1
  // const node1 = new WellheadNodeModel({
  //   name: "Well 1",
  //   color: "rgb(0,192,255)",
  // });
  const node1 = new WellheadNodeModel();
  node1.setPosition(100, 100);
  // let port1 = node1.addOutPort("Out");

  // node 2
  // const node2 = new WellheadNodeModel({
  //   name: "FlowStation 1",
  //   color: "rgb(200,255,100)",
  // });
  const node2 = new WellheadNodeModel();
  node2.setPosition(100, 200);
  // let port2 = node2.addOutPort("Out");

  // link them and add a label to the link
  // const link = port1.link<DefaultLinkModel>(port2);
  // link.addLabel("Hello World!");

  //Node 3
  const factory = engine.getFactoryForNode(new WellheadNodeModel());
  const wellnodemodel = factory.generateModel({});
  wellnodemodel.setPosition(100, 300);
  wellnodemodel.setPosition(100, 300);
  // const node3 = new WellheadNodeModel({
  //   name: "Node 3",
  //   color: "rgb(0,150,250)",
  // });
  // node3.setPosition(100, 300);

  const model = new DiagramModel();
  // model.addAll(node1, node2, wellnodemodel, link);
  model.addAll(node1, node2, wellnodemodel);
  engine.setModel(model);

  useEffect(() => {
    dispatch(contextDrawerShowAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.networkBody}>
        <div className={classes.networkPanel}>
          <NetworkPanel />
          {/* <div>Panel</div> */}
        </div>
        <div
          ref={drop}
          style={dndYAxisStyle}
          className={classes.networkContent}
        >
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

export default NetworkEngine;
