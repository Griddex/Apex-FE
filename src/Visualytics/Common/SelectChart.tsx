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
import BarChart from "../Components/Charts/BarChart";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
import RadarChart from "../Components/Charts/RadarChart";
import ScatterChart from "../Components/Charts/ScatterChart";
import StackedAreaChart from "../Components/Charts/StackedAreaChart";
import makeStyles from "@mui/styles/makeStyles";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  primaryChart: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
  },
  secondaryChart: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 4,
  },
}));

const ChartSelector = ({
  chartType,
  workflowCategory,
  reducer,
  indexBy,
  chartStory,
}: IChartProps) => {
  switch (chartType) {
    case "stackedAreaChart":
      return (
        <StackedAreaChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          chartStory={chartStory}
        />
      );
    case "lineChart":
      return (
        <LineChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          chartStory={chartStory}
        />
      );
    case "doughnutChart":
      return (
        <DoughnutChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          chartStory={chartStory}
        />
      );
    case "barChart":
      return (
        <BarChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          chartStory={chartStory}
          indexBy={indexBy}
        />
      );
    case "scatterChart":
      return (
        <ScatterChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          chartStory={chartStory}
        />
      );
    case "radarChart":
      return (
        <RadarChart
          workflowCategory={workflowCategory}
          reducer={reducer}
          chartStory={chartStory}
        />
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
  selectedSecondaryChartOptionTitle,
  indexBy,
  chartStory,
}: IChartProps) => {
  const classes = useStyles();
  const reducerDefined = reducer as ReducersType;

  const selectedChartOptionTitleSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][selectedChartOptionTitle as string],
    (title) => title
  );
  const selectedChartOption = useSelector(selectedChartOptionTitleSelector);
  const chartType = selectedChartOption?.value as TChartTypes;

  const selectedSecondaryChartOptionTitleSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][selectedSecondaryChartOptionTitle as string],
    (title) => title
  );
  const selectedSecondaryChartOption = useSelector(
    selectedSecondaryChartOptionTitleSelector
  );
  const secondaryChartType = selectedSecondaryChartOption?.value as TChartTypes;

  return (
    <ApexFlexContainer>
      <div className={classes.primaryChart}>
        <ChartSelector
          chartType={chartType}
          workflowCategory={workflowCategory}
          reducer={reducer}
          indexBy={indexBy}
          chartStory="primary"
        />
      </div>
      {reducerDefined !== "forecastReducer" && (
        <div className={classes.secondaryChart}>
          <ChartSelector
            chartType={secondaryChartType}
            workflowCategory={workflowCategory}
            reducer={reducer}
            indexBy={indexBy}
            chartStory="secondary"
          />
        </div>
      )}
    </ApexFlexContainer>
  );
};

export default SelectChart;
