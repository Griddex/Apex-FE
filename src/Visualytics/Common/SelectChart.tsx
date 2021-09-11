import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import NoData from "../../Application/Components/Visuals/NoData";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import BarChart from "../Components/Charts/BarChart";
import { TChartTypes } from "../Components/Charts/ChartTypes";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
import RadarChart from "../Components/Charts/RadarChart";
import ScatterChart from "../Components/Charts/ScatterChart";
import StackedAreaChart from "../Components/Charts/StackedAreaChart";
import { IChartProps } from "../Components/ChartTypes";

const ChartSelector = ({
  chartType,
  workflowCategory,
  reducer,
}: IChartProps) => {
  switch (chartType) {
    case "stackedAreaChart":
      return (
        <StackedAreaChart
          workflowCategory={workflowCategory}
          reducer={reducer}
        />
      );
    case "lineChart":
      return (
        <LineChart workflowCategory={workflowCategory} reducer={reducer} />
      );
    case "doughnutChart":
      return (
        <DoughnutChart workflowCategory={workflowCategory} reducer={reducer} />
      );
    case "barChart":
      return <BarChart workflowCategory={workflowCategory} reducer={reducer} />;
    case "scatterChart":
      return (
        <ScatterChart workflowCategory={workflowCategory} reducer={reducer} />
      );
    case "radarChart":
      return (
        <RadarChart workflowCategory={workflowCategory} reducer={reducer} />
      );
    default:
      return <NoData />;
  }
};

const SelectChart = ({
  workflowCategory,
  reducer,
  selectedChartOptionTitle,
}: IChartProps) => {
  console.log(
    "Logged output --> ~ file: SelectChart.tsx ~ line 57 ~ reducer",
    reducer
  );
  console.log(
    "Logged output --> ~ file: SelectChart.tsx ~ line 57 ~ selectedChartOptionTitle",
    selectedChartOptionTitle
  );
  const reducerDefined = reducer as ReducersType;

  const apexState = useSelector((state: RootState) => state[reducerDefined]);
  console.log(
    "Logged output --> ~ file: SelectChart.tsx ~ line 68 ~ apexState",
    apexState
  );

  const selectedChartOption = apexState[selectedChartOptionTitle as string];
  console.log(
    "Logged output --> ~ file: SelectChart.tsx ~ line 74 ~ selectedChartOption",
    selectedChartOption
  );

  const chartType = selectedChartOption.value as TChartTypes;

  return (
    <ApexFlexContainer>
      <ChartSelector
        chartType={chartType}
        workflowCategory={workflowCategory}
        reducer={reducer}
      />
    </ApexFlexContainer>
  );
};

export default SelectChart;
