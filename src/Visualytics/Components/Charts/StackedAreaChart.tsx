import { ResponsiveStream } from "@nivo/stream";
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
import renderTick from "../../Utils/RenderTicks";
import { AxisProps, IChartProps } from "../ChartTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const xValueCategoriesSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.xValueCategories,
  (categories) => categories
);

const StackedAreaChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const xValueCategories = useSelector(xValueCategoriesSelector);

  const commonChartProps = useSelector(
    (state: RootState) => state[reducerDefined][wc]["commonChartProps"],
    () => false
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc]["stackedAreaChart"]["chartData"],
    (data) => data
  );
  const chartData = useSelector(chartDataSelector);

  let keys: string[] = [];
  if (Array.isArray(chartData) && chartData.length > 0)
    keys = Object.keys(chartData[0]);
  else keys = [];

  const bottomAxisValues = xValueCategories.map((row) => Number(row));

  const commonChartPropsDefined = commonChartProps as IChart;
  (commonChartPropsDefined["axisBottom"] as AxisProps)["renderTick"] =
    renderTick(bottomAxisValues);
  commonChartPropsDefined["keys"] = keys;
  commonChartPropsDefined["valueFormat"] = (v) => Number(v).toFixed(2);

  //string  | ((datum: Omit<StreamLayerData, "color" | "data" | "label">) => string | number)
  commonChartPropsDefined["label"] = (d: any) => d.id as string;

  return <ResponsiveStream data={chartData} {...commonChartPropsDefined} />;
};

export default StackedAreaChart;
