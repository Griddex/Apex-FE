import { PointMouseHandler, PointTooltip, ResponsiveLine } from "@nivo/line";
import React from "react";
import { useSelector } from "react-redux";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IChartProps } from "../ChartTypes";
import isEqual from "react-fast-compare";
import { OrdinalColorScaleConfigScheme } from "@nivo/colors";
import { format } from "d3-format";
import { Value } from "@nivo/scatterplot";
import { DatumValue, ValueFormat } from "@nivo/core";

const SimpleLineChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  const { commonChartProps, lineChart } = useSelector(
    (state: RootState) => state[reducerDefined][wc],
    // (prev, next) => isEqual(prev, next)
    (prev, next) => false
  );
  const { data } = lineChart;

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
  console.log(
    "Logged output --> ~ file: LineChart.tsx ~ line 59 ~ SimpleLineChart ~ commonChartPropsDefined",
    commonChartPropsDefined
  );

  return <ResponsiveLine data={data} {...commonChartPropsDefined} />;
};

export default SimpleLineChart;
