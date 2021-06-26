import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import BarChart from "../Components/Charts/BarChart";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
import RadarChart from "../Components/Charts/RadarChart";
import ScatterPlotChart from "../Components/Charts/ScatterPlotChart";
import StackedAreaChart from "../Components/Charts/StackedAreaChart";
import { ICharts } from "../Redux/ChartState/ChartStateTypes";

const tempData = [
  { name: "Oil", value: 450 },
  { name: "Gas", value: 250 },
  { name: "Condensate", value: 90 },
];

const charts: ICharts = {
  0: () => <StackedAreaChart />,
  1: () => <LineChart />,
  2: () => <DoughnutChart data={tempData} willUseThemeColor={false} />,
  3: () => <BarChart />,
  4: () => <ScatterPlotChart data={[]} willUseThemeColor={false} />,
  5: () => <RadarChart data={[]} willUseThemeColor={false} />,
};

const SelectChart = () => {
  const dispatch = useDispatch();

  const { selectedChartIndex } = useSelector(
    (state: RootState) => state.chartReducer
  );

  const i = selectedChartIndex;
  const chart = charts[i || 0];

  return <div style={{ height: "100%", width: "100%" }}>{chart()}</div>;
};

export default SelectChart;
