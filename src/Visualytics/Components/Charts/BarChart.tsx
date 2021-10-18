import { BarLegendProps, ComputedBarDatum, ResponsiveBar } from "@nivo/bar";
import { InheritedColorConfig } from "@nivo/colors";
import { DatumValue } from "@nivo/core";
import { format } from "d3-format";
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
import { GridValues, IChartProps } from "../ChartTypes";

const SimpleBarChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const reducerWCSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc],
    (wc) => wc
  );

  const { commonChartProps, barChart, stackedAreaChart, isYear } =
    useSelector(reducerWCSelector);
  const { chartData } = barChart;

  const commonChartPropsDefined = commonChartProps as IChart;

  const {
    gridXValues,
    gridYValues,
    labelTextColor,
    legends,
    valueFormatString,
  } = commonChartPropsDefined;

  const gridXValuesBar = gridXValues as GridValues<string | number> | undefined;
  commonChartPropsDefined["gridXValues"] = gridXValuesBar;

  const gridYValuesBar = gridYValues as GridValues<string | number> | undefined;
  commonChartPropsDefined["gridYValues"] = gridYValuesBar;

  const labelTextColorBar = labelTextColor as InheritedColorConfig<
    ComputedBarDatum<any>
  >;
  commonChartPropsDefined["labelTextColor"] = labelTextColorBar;

  const legendsBar = legends as BarLegendProps[];
  commonChartPropsDefined["legends"] = legendsBar;

  //TODO fix isYear, keeps returning month
  //Barchart renders before payload hits store
  // commonChartPropsDefined["indexBy"] = isYear ? "Year" : "Month";
  commonChartPropsDefined["indexBy"] = "Year";

  //TODO Gift to give me this
  let keys = [] as any[];
  if (Object.keys(stackedAreaChart.chartData).length > 0)
    keys = Object.keys(stackedAreaChart.chartData[0]);
  commonChartPropsDefined["keys"] = keys;

  const valueFormatBar = (v: DatumValue) =>
    format(valueFormatString)(v as number);
  commonChartPropsDefined["valueFormat"] = valueFormatBar;

  return <ResponsiveBar data={chartData} {...commonChartPropsDefined} />;
};

export default SimpleBarChart;
