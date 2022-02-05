import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React from "react";
import { useSelector } from "react-redux";
import {
  TReducer,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { AxisProps, IChartProps } from "../ChartTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { TChartStory } from "./ChartTypes";
import { format } from "d3-format";
import renderTick from "../../Utils/RenderTicks";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const ScatterChart = ({
  workflowCategory,
  reducer,
  chartStory,
}: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as TReducer;

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
      state[reducerDefined][wc][chartStory as TChartStory]["scatterChart"][
        "chartData"
      ],
    (data) => data
  );

  const chartData = useSelector(chartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;

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

  return (
    <ResponsiveScatterPlot data={chartData} {...commonChartPropsDefined} />
  );
};

export default ScatterChart;
