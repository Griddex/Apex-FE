import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IChartProps } from "../Components/ChartTypes";
import { TChartTypes } from "../Components/Charts/ChartTypes";

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
const NoSelectionPlaceholder = React.lazy(
  () =>
    import("../../Application/Components/PlaceHolders/NoSelectionPlaceholder")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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
