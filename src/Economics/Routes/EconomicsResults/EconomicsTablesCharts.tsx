import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import CenteredStyle from "./../../../Application/Components/Styles/CenteredStyle";
import EconomicsResultTables from "./EconomicsResultTables";
import EconomicsResultCharts from "./EconomicsResultCharts";
import ItemTypes from "../../Utils/DragAndDropItemTypes";
import EconomicsResultsPanel from "../../Components/Panels/EconomicsResultsPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  workflowBody: {
    marginLeft: 5,
    height: "100%",
    width: "97%",
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
  },
  workflowPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 250,
    minWidth: 250,
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
    padding: 5,
  },
  workflowContent: {
    marginLeft: 5,
    height: "100%",
    width: "100%",
    border: "1px solid #E7E7E7",
    backgroundColor: "#FFF",
  },
}));

export default function EconomicsTablesCharts() {
  const classes = useStyles();
  const [resultName, setResultName] = React.useState("");
  console.log(
    "Logged output --> ~ file: EconomicsTablesCharts.tsx ~ line 48 ~ EconomicsTablesCharts ~ resultName",
    resultName
  );

  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const { resultName } = monitor.getItem();
    setResultName(resultName);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ECONOMICS_RESULTS_TYPE,
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

  function renderEconomicsCalculation() {
    switch (resultName) {
      case "tables":
        return <EconomicsResultTables />;
      case "charts":
        return <EconomicsResultCharts />;
      default:
        return <CenteredStyle>Click or Drag and Drop to View</CenteredStyle>;
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.workflowPanel}>
        <EconomicsResultsPanel />
      </div>
      <div className={classes.workflowBody} ref={drop} style={dndCanvasStyle}>
        {renderEconomicsCalculation()}
      </div>
    </div>
  );
}
