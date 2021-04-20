import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../../Economics/Utils/DragAndDropItemTypes";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import NetPresentValue from "../Images/NetPresentValue.svg";
import InternalRateOfReturn from "../Images/InternalRateOfReturn.svg";
import NetCashflow from "../Images/NetCashflow.svg";

const useStyles = makeStyles(() => ({
  economicsCalculationPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
}));

interface IEconomicsProps {
  title: string;
}
interface IEconomicsCalculation {
  name: string;
  label: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const EconomicsCalculationsType: React.FC<IEconomicsProps> = ({ title }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.ECONOMICS_CALCULATION_TYPE,
      calculationName: title,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const calculations = [
    {
      name: "ncf",
      label: "Net Cashflow",
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
      name: "npv",
      label: "Net Present Value",
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
      name: "irr",
      label: "Internal Rate of Return",
      icon: (
        <img
          src={InternalRateOfReturn}
          alt="Internal Rate of Return"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
  ];

  const opacity = isDragging ? 0.4 : 1;
  const currentCalculation: IEconomicsCalculation = calculations.find(
    (calculation) => calculation.name === title
  ) as IEconomicsCalculation;

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
        {currentCalculation.icon}
      </div>
      <div
        style={{
          height: "60px",
          width: "auto",
          padding: "5px",
          verticalAlign: "middle",
        }}
      >
        {currentCalculation.label}
      </div>
    </div>
  );
};

const EconomicsCalculationsPanel = () => {
  const classes = useStyles();
  const economicsCalculationsNames = ["ncf", "npv", "irr"];

  return (
    <>
      <AnalyticsTitle title="Analyses Panel" />
      <div className={classes.economicsCalculationPanel}>
        {economicsCalculationsNames.map((name, i) => (
          <EconomicsCalculationsType key={i} title={name} />
        ))}
      </div>
    </>
  );
};

export default EconomicsCalculationsPanel;
