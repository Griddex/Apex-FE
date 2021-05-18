import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import ResultCharts from "../../Images/ResultCharts.svg";
import ResultTables from "../../Images/ResultTables.svg";
import { itemTypes } from "../../Utils/DragAndDropItemTypes";

const useStyles = makeStyles(() => ({
  economicsResultPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

interface IEconomicsProps {
  title: string;
}
interface IEconomicsResult {
  name: string;
  label: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const EconomicsResultsType: React.FC<IEconomicsProps> = ({ title }) => {
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.ECONOMICS_RESULTS_TYPE,
    item: {
      calculationName: title,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const calculations = [
    {
      name: "tables",
      label: "View Tables",
      icon: (
        <img
          src={ResultTables}
          alt="economics result tables"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
    {
      name: "charts",
      label: "View Charts",
      icon: (
        <img
          src={ResultCharts}
          alt="economics result charts"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
  ];

  const opacity = isDragging ? 0.4 : 1;
  const currentResult: IEconomicsResult = calculations.find(
    (calculation) => calculation.name === title
  ) as IEconomicsResult;

  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        ref={drag}
        style={{
          opacity,
          height: "60px",
          width: "60px",
          cursor: "pointer",
          border: "1px solid grey",
          padding: "5px",
        }}
      >
        {currentResult.icon}
      </div>
      <div
        style={{
          height: "60px",
          width: "auto",
          padding: "5px",
          verticalAlign: "middle",
        }}
      >
        {currentResult.label}
      </div>
    </div>
  );
};

const EconomicsResultsPanel = () => {
  const classes = useStyles();
  const economicsResultsNames = ["tables", "charts"];

  return (
    <>
      <AnalyticsTitle title="Analyses Panel" />
      <div className={classes.economicsResultPanel}>
        {economicsResultsNames.map((name, i) => (
          <EconomicsResultsType key={i} title={name} />
        ))}
      </div>
    </>
  );
};

export default EconomicsResultsPanel;
