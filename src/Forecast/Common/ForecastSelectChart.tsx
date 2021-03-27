import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ICharts } from "../../Visualytics/Redux/ChartState/ChartStateTypes";
import ForecastStackedAreaChart from "../Components/ForecastStackedAreaChart";

const charts: ICharts = {
  0: () => <ForecastStackedAreaChart />,
  // 1: () => <LineChart />,
  // 2: () => <DoughnutChart data={tempData} />,
  // 3: () => <BarChart />,
};

const ForecastSelectChart = () => {
  const dispatch = useDispatch();

  const { selectedChartIndex, selectedChartObjId, chartObjects } = useSelector(
    (state: RootState) => state.chartReducer
  );

  const chart = charts[selectedChartIndex || 0];

  return <div style={{ height: "100%", width: "100%" }}>{chart()}</div>;
};

export default ForecastSelectChart;
