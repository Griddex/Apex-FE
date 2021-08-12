import React from "react";
import BarChart from "../Components/Charts/BarChart";
import NoData from "../../Application/Components/Visuals/NoData";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
import StackedAreaChart from "../Components/Charts/StackedAreaChart";
import { IChartProps } from "../Components/ChartTypes";

const ChartSelector = ({ chartType, data, otherProperties }: IChartProps) => {
  switch (chartType) {
    case "stackedAreaChart":
      return <StackedAreaChart data={data} otherProperties={otherProperties} />;
    case "lineChart":
      return <LineChart data={data} otherProperties={otherProperties} />;
    case "doughnutChart":
      return <DoughnutChart data={data} otherProperties={otherProperties} />;
    case "barChart":
      return <BarChart data={data} otherProperties={otherProperties} />;
    default:
      return <NoData />;
  }
};

export default ChartSelector;
