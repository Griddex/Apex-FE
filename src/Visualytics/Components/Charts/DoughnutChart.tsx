import { InheritedColorConfig } from "@nivo/colors";
import { ComputedDatum, Pie, ResponsivePie } from "@nivo/pie";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";
import { TChartStory } from "./ChartTypes";

const wc = "visualyticsChartsWorkflows";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const commonChartPropsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer[wc],
  (props) => props
);

export const DoughnutChartAnalytics = ({
  data,
  defs,
  fill,
  colors,
}: IChartProps) => {
  const adjustedProps = {
    legends: undefined,
    innerRadius: 0.65,
    arcLinkLabelsDiagonalLength: 5,
    arcLinkLabelsStraightLength: 5,
    cornerRadius: 1,
    padAngle: 2,
    fit: true,
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    colors: colors,
    defs: defs,
    fill: fill,
    isInteractive: true,
    animate: true,
  } as Partial<IChart>;

  const commonChartProps = useSelector(commonChartPropsSelector);

  return (
    <Pie
      data={data as any[]}
      {...commonChartProps}
      {...adjustedProps}
      height={120}
      width={500}
    />
  );
};

const DoughnutChart = ({
  workflowCategory,
  reducer,
  chartStory,
}: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const commonChartProps = useSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["commonChartProps"],
    () => false
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["doughnutChart"][
        "chartData"
      ],
    (data) => data
  );

  const chartData = useSelector(chartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;
  const { borderColor } = commonChartPropsDefined;

  const borderColorDoughnut = borderColor as InheritedColorConfig<
    ComputedDatum<any>
  >;
  commonChartPropsDefined["borderColor"] = borderColorDoughnut;

  if (chartStory === "secondary") {
    commonChartPropsDefined["axisBottom"] = undefined;
  }

  return <ResponsivePie data={chartData} {...commonChartPropsDefined} />;
};

export default DoughnutChart;
