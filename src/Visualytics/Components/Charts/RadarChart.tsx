import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";

const RadarChartChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const commonChartProps = useSelector(
    (state: RootState) => state[reducerDefined][wc]["commonChartProps"],
    () => false
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc]["radarChart"]["chartData"],
    (data) => data
  );

  const chartData = useSelector(chartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;

  return <ResponsiveRadar data={chartData} {...commonChartPropsDefined} />;
};

export default RadarChartChart;
