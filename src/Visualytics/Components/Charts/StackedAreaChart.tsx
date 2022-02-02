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
import { TChartStory } from "./ChartTypes";
import { format } from "d3-format";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const StackedAreaChart = ({
  workflowCategory,
  reducer,
  chartStory,
}: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const xValueCategoriesSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined]["xValueCategories"],
    (categories) => categories
  );
  const xValueCategories = useSelector(xValueCategoriesSelector);
  const bottomAxisValues = xValueCategories.map((v: any) => v);

  const commonChartProps = useSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["commonChartProps"],
    () => false
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc][chartStory as TChartStory]["stackedAreaChart"][
        "chartData"
      ],
    (data) => data
  );
  const chartData = useSelector(chartDataSelector);

  let keys: string[] = [];
  if (Array.isArray(chartData) && chartData.length > 0)
    keys = Object.keys(chartData[0]);
  else keys = [];

  const commonChartPropsDefined = commonChartProps as IChart;

  commonChartPropsDefined["keys"] = keys;
  commonChartPropsDefined["valueFormat"] = (v) => Number(v).toFixed(2);

  commonChartPropsDefined["label"] = (d: any) => d.id as string;

  if (chartStory === "secondary") {
    commonChartPropsDefined["axisBottom"] = undefined;
  } else {
    commonChartPropsDefined["axisBottom"] = {
      axisEnabled: true,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: (v) => format(" >-.0f")(v),
      legend: "",
      legendOffset: 36,
      legendPosition: "middle",
    } as AxisProps;

    (commonChartPropsDefined["axisBottom"] as AxisProps)["renderTick"] =
      renderTick(bottomAxisValues);
  }

  return <ResponsiveStream data={chartData} {...commonChartPropsDefined} />;
};

export default StackedAreaChart;
