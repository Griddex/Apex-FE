import { BarLegendProps, ComputedBarDatum, ResponsiveBar } from "@nivo/bar";
import { InheritedColorConfig } from "@nivo/colors";
import React from "react";
import { useSelector } from "react-redux";
import {
  TAllWorkflowCategories,
  ReducersType,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { GridValues, IChartProps } from "../ChartTypes";

const SimpleBarChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const { commonChartProps, barChart, stackedAreaChart, isYear } = useSelector(
    (state: RootState) => state[reducerDefined][wc]
  );
  const { data } = barChart;

  const commonChartPropsDefined = commonChartProps as IChart;

  const { gridXValues, gridYValues, labelTextColor, legends } =
    commonChartPropsDefined;

  const gridXValuesBar = gridXValues as GridValues<string | number> | undefined;
  commonChartPropsDefined["gridXValues"] = gridXValuesBar;

  const gridYValuesBar = gridYValues as GridValues<string | number> | undefined;
  commonChartPropsDefined["gridYValues"] = gridYValuesBar;

  const labelTextColorBar = labelTextColor as InheritedColorConfig<
    ComputedBarDatum<any>
  >;
  commonChartPropsDefined["labelTextColor"] = labelTextColorBar;

  const legendsBar = legends as BarLegendProps[] | undefined;
  commonChartPropsDefined["legends"] = legendsBar;

  //TODO fix isYear, keeps returning month
  //Barchart renders before payload hits store
  // commonChartPropsDefined["indexBy"] = isYear ? "Year" : "Month";
  commonChartPropsDefined["indexBy"] = "Year";

  const keys = Object.keys(stackedAreaChart.data[0]);
  commonChartPropsDefined["keys"] = keys;
  console.log(
    "Logged output --> ~ file: BarChart.tsx ~ line 45 ~ SimpleBarChart ~ commonChartPropsDefined",
    commonChartPropsDefined
  );

  return <ResponsiveBar data={data} {...commonChartPropsDefined} />;
};

export default SimpleBarChart;
