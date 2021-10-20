import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React from "react";
import { useSelector } from "react-redux";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const ScatterChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const commonChartPropsSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc]["commonChartProps"],
    (data) => data
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc]["scatterChart"]["chartData"],
    (data) => data
  );

  const commonChartProps = useSelector(commonChartPropsSelector);
  const chartData = useSelector(chartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;

  return (
    <ResponsiveScatterPlot data={chartData} {...commonChartPropsDefined} />
  );
};

export default ScatterChart;
