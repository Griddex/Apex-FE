import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import { DragObjectWithType, DropTargetMonitor, useDrop } from "react-dnd";
import EconomicsAnalysesPanel from "../../Components/Panels/EconomicsAnalysesPanel";
import InternalRateOfReturn from "../../Images/InternalRateOfReturn.svg";
import NetCashflow from "../../Images/NetCashflow.svg";
import NetPresentValue from "../../Images/NetPresentValue.svg";
import ItemTypes from "../../Utils/DragAndDropItemTypes";
import { IEconomicsAnalysis } from "./EconomicsAnalysesTypes";
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
  dndArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #707070",
    backgroundColor: "#F7F7F7",
    borderRadius: 2,
    height: "100%",
    width: "100%",
  },
  imageDnD: {
    width: 95,
    height: 80,
    color: theme.palette.primary.main,
  },
}));

export const economicsAnalyses: IEconomicsAnalysis[] = [
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
    name: "payout",
    title: "Payout",
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
    name: "minimumCapitalRatio",
    title: "Minimum Capital Ratio",
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
    name: "presentValueRatio",
    title: "Present Value Ratio",
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
    name: "unitTechnicalCost",
    title: "Unit Technical Cost",
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
  const [selectedAnalysis, setSelectedAnalysis] = React.useState(
    {} as IEconomicsAnalysis
  );
  const handleWidgetDrop = (
    item: DragObjectWithType,
    monitor: DropTargetMonitor
  ) => {
    const { analysis } = monitor.getItem();
    setSelectedAnalysis(analysis.name);
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

  return (
    <div className={classes.root}>
      <div className={classes.workflowPanel}>
        <EconomicsAnalysesPanel
          economicsAnalyses={economicsAnalyses}
          selectedAnalysis={selectedAnalysis}
          setSelectedAnalysis={setSelectedAnalysis}
        />
      </div>
      <div className={classes.workflowBody} ref={drop} style={dndCanvasStyle}>
        {Object.entries(selectedAnalysis).length === 0 ? (
          <div className={classes.dndArea}>
            <CloudUploadIcon className={classes.imageDnD} />
            <p>Drag and Drop analysis here</p>
          </div>
        ) : (
          <EconomicsAnalysis
            economicsAnalyses={economicsAnalyses}
            selectedAnalysis={selectedAnalysis}
          />
        )}
      </div>
    </div>
  );
}
