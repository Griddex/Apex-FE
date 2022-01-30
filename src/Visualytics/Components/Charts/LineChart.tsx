import { OrdinalColorScaleConfigScheme } from "@nivo/colors";
import { DatumValue } from "@nivo/core";
import { PointMouseHandler, PointTooltip, ResponsiveLine } from "@nivo/line";
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
import { AxisProps, IChartProps } from "../ChartTypes";
import { TChartStory } from "./ChartTypes";
import renderTick from "../../Utils/RenderTicks";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const SimpleLineChart = ({
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
      state[reducerDefined][wc][chartStory as TChartStory]["lineChart"][
        "chartData"
      ],
    (data) => data
  );

  const chartData = useSelector(chartDataSelector);

  const commonChartPropsDefined = commonChartProps as IChart;
  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    tooltip,
    colors,
    yFormatString,
  } = commonChartPropsDefined;

  const onMouseEnterLine = onMouseEnter as PointMouseHandler;
  commonChartPropsDefined["onMouseEnter"] = onMouseEnterLine;

  const onMouseMoveLine = onMouseMove as PointMouseHandler;
  commonChartPropsDefined["onMouseMove"] = onMouseMoveLine;

  const onMouseLeaveLine = onMouseLeave as PointMouseHandler;
  commonChartPropsDefined["onMouseLeave"] = onMouseLeaveLine;

  const onClickLine = onClick as PointMouseHandler;
  commonChartPropsDefined["onClick"] = onClickLine;

  const tooltipLine = tooltip as PointTooltip;
  commonChartPropsDefined["tooltip"] = tooltipLine;

  const colorsLine = colors as OrdinalColorScaleConfigScheme;
  commonChartPropsDefined["colors"] = colorsLine;

  const yFormatLine = (v: DatumValue) => format(yFormatString)(v as number);
  commonChartPropsDefined["yFormat"] = yFormatLine;

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

  return <ResponsiveLine data={chartData} {...commonChartPropsDefined} />;
};

export default SimpleLineChart;
