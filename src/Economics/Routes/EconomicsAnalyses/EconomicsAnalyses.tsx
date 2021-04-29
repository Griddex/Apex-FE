import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import ItemTypes from "../../Utils/DragAndDropItemTypes";
import EconomicsAnalysesPanel from "../../Components/Panels/EconomicsAnalysesPanel";
import IRR from "./EconomicsIRR/IRR";
import NCF from "./EconomicsNCF/NCF";
import NPV from "./EconomicsNPV/NPV";
import NetPresentValue from "../../Images/NetPresentValue.svg";
import InternalRateOfReturn from "../../Images/InternalRateOfReturn.svg";
import NetCashflow from "../../Images/NetCashflow.svg";
import { TEconomicsAnalyses } from "./EconomicsAnalysesTypes";
import EconomicsAnalysis from "./EconomicsAnalysis";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "97%",
    border: "1px solid #E7E7E7",
    backgroundColor: theme.palette.common.white,
  },
  workflowPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 250,
    minWidth: 250,
    border: "1px solid #E7E7E7",
    backgroundColor: theme.palette.common.white,
    padding: 5,
  },
  workflowContent: {
    marginLeft: 5,
    height: "100%",
    width: "100%",
    border: "1px solid #E7E7E7",
    backgroundColor: theme.palette.common.white,
  },
}));

export const economicsAnalyses: TEconomicsAnalyses = [
  {
    name: "netcashFlow",
    title: "Net Cashflow",
    icon: (
      <img
        src={NetCashflow}
        alt="Net Cashflow"
        height={"100%"}
        width={"100%"}
      />
    ),
  },
  {
    name: "netpresentvalue",
    title: "Net Present Value",
    icon: (
      <img
        src={NetPresentValue}
        alt="Net Present Value"
        height={"100%"}
        width={"100%"}
      />
    ),
  },
  {
    name: "internalRateOfReturn",
    title: "Internal Rate of Return",
    icon: (
      <img
        src={InternalRateOfReturn}
        alt="Internal Rate of Return"
        height={"100%"}
        width={"100%"}
      />
    ),
  },
  {
    name: "mulitpleAnalyses",
    title: "Multiple Analyses",
    icon: (
      <img
        src={InternalRateOfReturn}
        alt="All Economics Analyses"
        height={"100%"}
        width={"100%"}
      />
    ),
  },
];

export default function EconomicsAnalyses() {
  const classes = useStyles();
  const [calculationName, setAnalysisName] = React.useState("");

  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const { calculation } = monitor.getItem();
    setAnalysisName(calculation.name);
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

  function renderEconomicsAnalysis() {
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
        <EconomicsAnalysesPanel economicsAnalyses={economicsAnalyses} />
      </div>
      <div className={classes.workflowBody} ref={drop} style={dndCanvasStyle}>
        <EconomicsAnalysis economicsAnalyses={economicsAnalyses} />
      </div>
    </div>
  );
}
