import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React from "react";
import { useSelector } from "react-redux";
import {
  TAllWorkflowCategories,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";

const ScatterChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const { commonChartProps, scatterChart } = useSelector(
    (state: RootState) => state[reducerDefined][wc]
  );
  const { chartData } = scatterChart;

  const commonChartPropsDefined = commonChartProps as IChart;

  return (
    <ResponsiveScatterPlot data={chartData} {...commonChartPropsDefined} />
  );
};

export default ScatterChart;
