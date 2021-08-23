import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React from "react";
import { useSelector } from "react-redux";
import {
  TAllWorkflowCategories,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";

const ScatterChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const { commonChartProps, scatterChart } = useSelector(
    (state: RootState) => state[reducerDefined][wc]
  );
  const { data } = scatterChart;

  const commonChartPropsDefined = commonChartProps as IChart;

  return <ResponsiveScatterPlot data={data} {...commonChartPropsDefined} />;
};

export default ScatterChart;
