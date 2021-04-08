import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import ItemTypes from "../Utils/DragAndDropItemTypes";
import EconomicsCalculationsPanel from "./../Components/EconomicsCalculationsPanel";
import IRR from "./EconomicsIRR/IRR";
import NCF from "./EconomicsNCF/NCF";
import NPV from "./EconomicsNPV/NPV";

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

export default function EconomicsCalculations() {
  const classes = useStyles();
  const [calculationName, setCalculationName] = React.useState("");

  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const { calculationName } = monitor.getItem();
    setCalculationName(calculationName);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ECONOMICS_CALCULATION_TYPE,
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
    switch (calculationName) {
      case "ncf":
        return <NCF />;
      case "npv":
        return <NPV />;
      case "irr":
        return <IRR />;
      default:
        return <h1>Click or Drag and Drop to View</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.workflowPanel}>
        <EconomicsCalculationsPanel />
      </div>
      <div className={classes.workflowBody} ref={drop} style={dndCanvasStyle}>
        {renderEconomicsCalculation()}
      </div>
    </div>
  );
}
