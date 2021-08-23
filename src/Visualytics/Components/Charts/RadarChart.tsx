import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
import { useSelector } from "react-redux";
import {
  TAllWorkflowCategories,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";

const RadarChartChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const { commonChartProps, lineChart } = useSelector(
    (state: RootState) => state[reducerDefined][wc]
  );
  const { data } = lineChart;

  const commonChartPropsDefined = commonChartProps as IChart;

  return <ResponsiveRadar data={data} {...commonChartPropsDefined} />;
};

export default RadarChartChart;
