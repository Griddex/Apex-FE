import { useTheme } from "@material-ui/core/styles";
import { ComputedDatum, ResponsivePie } from "@nivo/pie";
import React from "react";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChartProps } from "../ChartTypes";
import { useSelector } from "react-redux";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { InheritedColorConfig } from "@nivo/colors";

export const DoughnutChartAnalytics = ({ data }: IChartProps) => {
  const wc = "visualyticsChartsWorkflows";
  const { commonChartProps } = useSelector(
    (state: RootState) => state.visualyticsReducer[wc]
  );

  return <ResponsivePie data={data as any[]} {...commonChartProps} />;
};

const DoughnutChart = ({ workflowCategory, reducer }: IChartProps) => {
  const ch = "doughnutChart";

  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const { commonChartProps, doughnutChart } = useSelector(
    (state: RootState) => state[reducerDefined][wc]
  );
  const { data } = doughnutChart;

  const commonChartPropsDefined = commonChartProps as IChart;
  const { borderColor } = commonChartPropsDefined;

  const borderColorDoughnut = borderColor as InheritedColorConfig<
    ComputedDatum<any>
  >;
  commonChartPropsDefined["borderColor"] = borderColorDoughnut;

  return <ResponsivePie data={data} {...commonChartPropsDefined} />;
};

export default DoughnutChart;
