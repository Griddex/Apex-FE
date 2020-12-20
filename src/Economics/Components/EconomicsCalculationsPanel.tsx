import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../../Economics/Utils/DragAndDropItemTypes";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";
import Flowstation from "../Images/Flowstation.svg";
import GasFacility from "../Images/GasFacility.svg";
import Manifold from "../Images/Manifold.svg";

const useStyles = makeStyles(() => ({
  economicsCalculationPanel: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
    // overflow: "auto",
  },
}));

interface IEconomicsProps {
  name: string;
}
interface IEconomicsCalculation {
  name: string;
  label: string;
  icon: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

const EconomicsCalculationsType: React.FC<IEconomicsProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.ECONOMICS_CALCULATION_TYPE,
      calculationName: name,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const calculations = [
    {
      name: "ncf",
      label: "Net Cashflow",
      icon: (
        <img src={Manifold} alt="Net Cashflow" height={"100%"} width={"100%"} />
      ),
    },
    {
      name: "npv",
      label: "Net Present Value",
      icon: (
        <img
          src={Flowstation}
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
          src={GasFacility}
          alt="Internal Rate of Return"
          height={"100%"}
          width={"100%"}
        />
      ),
    },
  ];

  const opacity = isDragging ? 0.4 : 1;
  const currentCalculation: IEconomicsCalculation = calculations.find(
    (calculation) => calculation.name === name
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
      <AnalyticsTitle title="Economics Calculation Panel" />
      <div className={classes.economicsCalculationPanel}>
        {economicsCalculationsNames.map((name, i) => (
          <EconomicsCalculationsType key={i} name={name} />
        ))}
      </div>
    </>
  );
};

export default EconomicsCalculationsPanel;
