import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import BarChart from "../../../../Visualytics/Components/Charts/BarChart";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import LineChart from "../../../../Visualytics/Components/Charts/LineChart";
import StackedAreaChart from "../../../../Visualytics/Components/Charts/StackedAreaChart";
import { ICharts } from "../../../../Visualytics/Redux/ChartState/ChartStateTypes";

const tempData = [
  { name: "Oil", value: 450 },
  { name: "Gas", value: 250 },
  { name: "Condensate", value: 90 },
];

const charts: ICharts = {
  0: () => <StackedAreaChart />,
  1: () => <LineChart />,
  2: () => <DoughnutChart data={tempData} />,
  3: () => <BarChart />,
};

const EconomicsPlotChartsSelectCharts = () => {
  const { selectedChartIndex } = useSelector(
    (state: RootState) => state.chartReducer
  );

  const chart = charts[selectedChartIndex || 0];

  return <div style={{ height: "100%", width: "100%" }}>{chart()}</div>;
};

export default EconomicsPlotChartsSelectCharts;
