import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DoughnutChart from "../Components/DoughnutChart";
import LineChart from "../Components/LineChart";
import StackedAreaChart from "../Components/StackedAreaChart";
import BarChart from "../Components/BarChart";
import Button from "@material-ui/core/Button";
import { updateChartElementObjectAction } from "../Redux/ChartActions/ChartActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ICharts } from "../Redux/ChartState/ChartStateTypes";
import { IChartObject } from "./../Redux/ChartState/ChartStateTypes";
// const charts = ["StackedAreaChart", "LineChart", "DoughnutChart"];
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

const SelectChart = () => {
  const dispatch = useDispatch();

  const {
    currentChartIndex,
    selectedChartElementId,
    chartObjects,
  } = useSelector((state: RootState) => state.chartReducer);

  const i = currentChartIndex;
  const chart = charts[i || 0];

  return (
    <>
      <Button
        onClick={() => {
          const chartObject = chartObjects.find(
            (obj) => obj.chartId === selectedChartElementId.id
          );
          const { yAxes } = chartObject as IChartObject;
          const lastYaxisId = yAxes ? yAxes.length : 0;

          dispatch(
            updateChartElementObjectAction({
              id: selectedChartElementId,
              yAxes: { id: lastYaxisId + 1 },
            })
          );
        }}
        variant="outlined"
        color="secondary"
      >
        Add Yaxis
      </Button>
      {chart()}
    </>
  );
};

export default SelectChart;
