import { ResponsiveStream } from "@nivo/stream";
import React from "react";
import { useDrop } from "react-dnd";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IChart, ITooltipLabel } from "../../Redux/State/VisualyticsStateTypes";
import { itemTypesVisualytics } from "../../Utils/DragAndDropItemTypes";
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

  const commonChartPropsSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc]["commonChartProps"],
    (data) => data
  );

  const chartDataSelector = createDeepEqualSelector(
    (state: RootState) =>
      state[reducerDefined][wc]["stackedAreaChart"]["chartData"],
    (data) => data
  );

  const commonChartProps = useSelector(commonChartPropsSelector);
  const chartData = useSelector(chartDataSelector);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemTypesVisualytics.VISUALYTICS_PLOTCHARTS,
    drop: () => ({ name: "StackedAreaChart" }),
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  const isActive = canDrop && isOver;
  let dndYAxisStyle = {};
  if (isActive) {
    dndYAxisStyle = {
      strokeWidth: 2,
      opacity: 0.5,
      fontSize: 16,
      outline: "1px solid black",
      outlineStyle: "dashed",
      fill: "green",
      stroke: "green",
    };
  } else if (canDrop) {
    dndYAxisStyle = {
      fill: "red",
      stroke: "red",
      outline: "1px solid red",
      outlineStyle: "dashed",
    };
  }

  let keys: string[] = [];
  if (Array.isArray(chartData) && chartData.length > 0)
    keys = Object.keys(chartData[0]);
  else keys = [];

  const bottomAxisValues = xValueCategories.map((row) => {
    return Number(row);
  });

  const commonChartPropsDefined = commonChartProps as IChart;
  (commonChartPropsDefined["axisBottom"] as AxisProps)["renderTick"] =
    renderTick(bottomAxisValues);

  commonChartPropsDefined["keys"] = keys;

  commonChartPropsDefined["valueFormat"] = (v) =>
    `${Number(v).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽`;

  return <ResponsiveStream data={chartData} {...commonChartPropsDefined} />;
};

export default StackedAreaChart;
