import { InheritedColorConfig } from "@nivo/colors";
import { ComputedDatum, Pie, ResponsivePie } from "@nivo/pie";
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

const wc = "visualyticsChartsWorkflows";

const commonChartPropsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer[wc],
  (props) => props
);

export const DoughnutChartAnalytics = ({ data, defs, fill }: IChartProps) => {
  const adjustedProps = {
    legends: undefined,
    innerRadius: 0.65,
    arcLinkLabelsDiagonalLength: 5,
    arcLinkLabelsStraightLength: 5,
    cornerRadius: 1,
  } as Partial<IChart>;

  const commonChartProps = useSelector(commonChartPropsSelector);

  return (
    <Pie
      data={data as any[]}
      {...commonChartProps}
      {...adjustedProps}
      height={120}
      width={500}
      fit={true}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      colors={undefined}
      defs={defs}
      fill={fill}
    />
  );
};

const DoughnutChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const reducerWCSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc],
    (wc) => wc
  );

  const { commonChartProps, doughnutChart } = useSelector(reducerWCSelector);
  const { chartData } = doughnutChart;

  const commonChartPropsDefined = commonChartProps as IChart;
  const { borderColor } = commonChartPropsDefined;

  const borderColorDoughnut = borderColor as InheritedColorConfig<
    ComputedDatum<any>
  >;
  commonChartPropsDefined["borderColor"] = borderColorDoughnut;

  return <ResponsivePie data={chartData} {...commonChartPropsDefined} />;
};

export default DoughnutChart;
