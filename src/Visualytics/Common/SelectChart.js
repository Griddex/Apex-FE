import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DoughnutChart from "./../Components/DoughnutChart";
import LineChart from "./../Components/LineChart";
import StackedAreaChart from "./../Components/StackedAreaChart";
import BarChart from "./../Components/BarChart";
import Button from "@material-ui/core/Button";
import { updateChartElementObjectAction } from "./../Redux/ChartActions/ChartActions";
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
  const dispatch = useDispatch();
  const {
    currentChartIndex,
    selectedChartElementId,
    chartObjects,
  } = useSelector((state) => state.chartReducer);

  const chart = charts[currentChartIndex || 0];

  return (
    <>
      <Button
        onClick={() => {
          const chartObject = chartObjects.find(
            (obj) => obj.id === selectedChartElementId.id
          );
          const { yAxes } = chartObject;
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
