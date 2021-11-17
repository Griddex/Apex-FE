import { OrdinalColorScaleConfigScheme } from "@nivo/colors";
import { DatumValue } from "@nivo/core";
import { PointMouseHandler, PointTooltip, ResponsiveLine } from "@nivo/line";
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
import { IChartProps } from "../ChartTypes";

const SimpleLineChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const commonChartProps = useSelector(
    (state: RootState) => state[reducerDefined][wc]["commonChartProps"],
    () => false
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc]["lineChart"]["chartData"],
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

  return <ResponsiveLine data={chartData} {...commonChartPropsDefined} />;
};

export default SimpleLineChart;
