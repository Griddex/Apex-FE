import { InheritedColorConfig } from "@nivo/colors";
import { ComputedDatum, ResponsivePie } from "@nivo/pie";
import React from "react";
import { useSelector } from "react-redux";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";

export const DoughnutChartAnalytics = ({ data }: IChartProps) => {
  const wc = "visualyticsChartsWorkflows";

  const adjustedProps = {
    legends: undefined,
    innerRadius: 0.65,
    // height: 150,
  } as Partial<IChart>;

  const { commonChartProps } = useSelector(
    (state: RootState) => state.visualyticsReducer[wc]
  );

  return (
    <ResponsivePie
      data={data as any[]}
      {...commonChartProps}
      {...adjustedProps}
    />
  );
};

const DoughnutChart = ({ workflowCategory, reducer }: IChartProps) => {
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
