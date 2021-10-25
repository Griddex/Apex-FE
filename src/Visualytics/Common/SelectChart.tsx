import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import NoSelectionPlaceholder from "../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../Components/Charts/ChartTypes";
import { IChartProps } from "../Components/ChartTypes";

const BarChart = React.lazy(() => import("../Components/Charts/BarChart"));
const DoughnutChart = React.lazy(
  () => import("../Components/Charts/DoughnutChart")
);
const LineChart = React.lazy(() => import("../Components/Charts/LineChart"));
const RadarChart = React.lazy(() => import("../Components/Charts/RadarChart"));
const ScatterChart = React.lazy(
  () => import("../Components/Charts/ScatterChart")
);
const StackedAreaChart = React.lazy(
  () => import("../Components/Charts/StackedAreaChart")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const ChartSelector = ({
  chartType,
  workflowCategory,
  reducer,
  indexBy,
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
      return (
        <BarChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          indexBy={indexBy}
        />
      );
    case "scatterChart":
      return (
        <ScatterChart workflowCategory={workflowCategory} reducer={reducer} />
      );
    case "radarChart":
      return (
        <RadarChart workflowCategory={workflowCategory} reducer={reducer} />
      );
    default:
      return (
        <NoSelectionPlaceholder
          icon={<ArrowUpwardOutlinedIcon color="primary" />}
          text="Select chart.."
        />
      );
  }
};

const SelectChart = ({
  workflowCategory,
  reducer,
  selectedChartOptionTitle,
  indexBy,
}: IChartProps) => {
  const reducerDefined = reducer as ReducersType;

  const selectedChartOptionTitleSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][selectedChartOptionTitle as string],
    (title) => title
  );

  const selectedChartOption = useSelector(selectedChartOptionTitleSelector);

  const chartType = selectedChartOption.value as TChartTypes;

  return (
    <ChartSelector
      chartType={chartType}
      workflowCategory={workflowCategory}
      reducer={reducer}
      indexBy={indexBy}
    />
  );
};

export default SelectChart;
