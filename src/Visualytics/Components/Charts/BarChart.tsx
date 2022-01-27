import { BarLegendProps, ComputedBarDatum, ResponsiveBar } from "@nivo/bar";
import { InheritedColorConfig } from "@nivo/colors";
import { DatumValue } from "@nivo/core";
import { format } from "d3-format";
import omit from "lodash.omit";
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
import { GridValues, IChartProps } from "../ChartTypes";
import { TChartStory } from "./ChartTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const SimpleBarChart = ({
  workflowCategory,
  reducer,
  indexBy,
  chartStory,
}: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const commonChartProps = useSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["commonChartProps"],
    () => false
  );

  const barChartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["barChart"][
        "chartData"
      ],
    (data) => data
  );

  const chartData = useSelector(barChartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;

  const {
    gridXValues,
    gridYValues,
    labelTextColor,
    legends,
    valueFormatString,
    axisTop,
  } = commonChartPropsDefined;

  const gridXValuesBar = gridXValues as GridValues<string | number> | undefined;
  commonChartPropsDefined["gridXValues"] = gridXValuesBar;

  const gridYValuesBar = gridYValues as GridValues<string | number> | undefined;
  commonChartPropsDefined["gridYValues"] = gridYValuesBar;

  // const axisTopBar = axisTop as AxisProps<any> | undefined;
  // commonChartPropsDefined["axisTop"] = axisTopBar;

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

  let keys = [] as any[];
  if (chartData.length > 0) {
    const firstSeriesObj = chartData[0];
    const allKeysWithColor = Object.keys(firstSeriesObj).filter((k) =>
      k.toLowerCase().endsWith("color")
    );

    const keysObj = omit(firstSeriesObj, [
      indexBy as string,
      ...allKeysWithColor,
    ]);

    keys = Object.keys(keysObj);
  }
  commonChartPropsDefined["keys"] = keys;

  const valueFormatBar = (v: DatumValue) =>
    format(valueFormatString)(v as number);
  commonChartPropsDefined["valueFormat"] = valueFormatBar;

  return <ResponsiveBar data={chartData} {...commonChartPropsDefined} />;
};

export default SimpleBarChart;
