import { ClosedCurveFactoryId } from "@nivo/core";
import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import {
  TReducer,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";
import { TChartStory } from "./ChartTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const RadarChartChart = ({
  workflowCategory,
  reducer,
  chartStory,
}: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as TReducer;

  const commonChartProps = useSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["commonChartProps"],
    () => false
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["radarChart"][
        "chartData"
      ],
    (data) => data
  );

  const chartData = useSelector(chartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;

  const curveRad = commonChartPropsDefined["curve"];
  commonChartPropsDefined["curve"] = curveRad as ClosedCurveFactoryId;

  if (chartStory === "secondary") {
    commonChartPropsDefined["axisBottom"] = undefined;
  }

  return <ResponsiveRadar data={chartData} {...commonChartPropsDefined} />;
};

export default RadarChartChart;
