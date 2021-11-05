import { BarLegendProps, ComputedBarDatum, ResponsiveBar } from "@nivo/bar";
import { InheritedColorConfig } from "@nivo/colors";
import { DatumValue } from "@nivo/core";
import { format } from "d3-format";
import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { GridValues, IChartProps } from "../ChartTypes";
import omit from "lodash.omit";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const SimpleBarChart = ({
  workflowCategory,
  reducer,
  indexBy,
}: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const commonChartPropsSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc]["commonChartProps"],
    (data) => data
  );
  const barChartDataSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc]["barChart"]["chartData"],
    (data) => data
  );

  const commonChartProps = useSelector(commonChartPropsSelector);

  const chartData = useSelector(barChartDataSelector);

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
  commonChartPropsDefined["indexBy"] = indexBy as string;
  console.log("🚀 ~ file: BarChart.tsx ~ line 81 ~ indexBy", indexBy);

  let keys = [] as any[];
  if (chartData.length > 0) {
    const firstSeriesObj = chartData[0];
    console.log(
      "🚀 ~ file: BarChart.tsx ~ line 85 ~ firstSeriesObj",
      firstSeriesObj
    );
    const allKeysWithColor = Object.keys(firstSeriesObj).filter((k) =>
      k.toLowerCase().endsWith("color")
    );
    console.log(
      "🚀 ~ file: BarChart.tsx ~ line 89 ~ allKeysWithColor",
      allKeysWithColor
    );

    const keysObj = omit(firstSeriesObj, [
      indexBy as string,
      ...allKeysWithColor,
    ]);
    console.log("🚀 ~ file: BarChart.tsx ~ line 95 ~ keysObj", keysObj);

    keys = Object.keys(keysObj);
    console.log("🚀 ~ file: BarChart.tsx ~ line 105 ~ keys", keys);
  }
  commonChartPropsDefined["keys"] = keys;

  const valueFormatBar = (v: DatumValue) =>
    format(valueFormatString)(v as number);
  commonChartPropsDefined["valueFormat"] = valueFormatBar;
  console.log(
    "🚀 ~ file: BarChart.tsx ~ line 90 ~ commonChartPropsDefined",
    commonChartPropsDefined
  );

  return <ResponsiveBar data={chartData} {...commonChartPropsDefined} />;
};

export default SimpleBarChart;
