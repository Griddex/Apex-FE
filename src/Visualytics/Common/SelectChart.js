import React from "react";
import { useSelector } from "react-redux";
import DoughnutChart from "./../Components/DoughnutChart";
import LineChart from "./../Components/LineChart";
import StackedAreaChart from "./../Components/StackedAreaChart";
import BarChart from "./../Components/BarChart";

// const charts = ["StackedAreaChart", "LineChart", "DoughnutChart"];
const tempData = [
  { name: "Oil", value: 450 },
  { name: "Gas", value: 250 },
  { name: "Condensate", value: 90 },
];
const charts = {
  0: () => <StackedAreaChart />,
  1: () => <LineChart />,
  2: () => <DoughnutChart data={tempData} />,
  3: () => <BarChart />,
};

const SelectChart = () => {
  const currentChartIndex = useSelector(
    (state) => state.chartReducer.currentChartIndex
  );

  const chart = charts[currentChartIndex || 0];

  return <>{chart()}</>;
};

export default SelectChart;
