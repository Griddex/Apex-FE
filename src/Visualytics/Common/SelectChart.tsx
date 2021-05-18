import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ForecastStackedAreaChart from "../../Forecast/Components/ForecastStackedAreaChart";
import BarChart from "../Components/Charts/BarChart";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
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
  2: () => <DoughnutChart data={tempData} />,
  3: () => <BarChart />,
};

const SelectChart = () => {
  const dispatch = useDispatch();

  const { selectedChartIndex, selectedChartObjId, chartObjects } = useSelector(
    (state: RootState) => state.chartReducer
  );

  const i = selectedChartIndex;
  const chart = charts[i || 0];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <Button
        onClick={() => {
          const chartObject = chartObjects.find(
            (obj) => obj.chartObjId === selectedChartObjId
          );
          const lastYaxisId = uuidv4();

          dispatch(
            setChartObjectAction({
              chartObjId: selectedChartObjId,
              chartObjName: "yAxis",
            })
          );
        }}
        variant="outlined"
        color="secondary"
      >
        Add Yaxis
      </Button> */}
      {chart()}
    </div>
  );
};

export default SelectChart;
