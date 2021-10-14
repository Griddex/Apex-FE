import { ResponsiveStream } from "@nivo/stream";
import React from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IChart,
  IChartMetaData,
  ITooltipLabel,
} from "../../Redux/State/VisualyticsStateTypes";
import { itemTypesVisualytics } from "../../Utils/DragAndDropItemTypes";
import renderTick from "../../Utils/RenderTicks";
import { AxisProps, IChartProps } from "../ChartTypes";

const xValueCategoriesSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.xValueCategories,
  (categories) => categories
);

const StackedAreaChart = ({ workflowCategory, reducer }: IChartProps) => {
  const wc = workflowCategory as TAllWorkflowCategories;
  const reducerDefined = reducer as ReducersType;

  //TODO xValueCategories to be put in the proper store reducer
  const xValueCategories = useSelector(xValueCategoriesSelector);

  const reducerWCSelector = createDeepEqualSelector(
    (state: RootState) => state[reducerDefined][wc],
    (wc) => wc
  );

  const { commonChartProps, stackedAreaChart } = useSelector(reducerWCSelector);
  const { chartData } = stackedAreaChart;

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

  const initializeChartMetaData = () => {
    const activeIndex = 0;
    const chartAreaBorder = 0;
    const activeDataKey = "";

    return {
      activeIndex,
      chartAreaBorder,
      activeDataKey,
    };
  };

  const chartMetaDataReducer = (state: IChartMetaData, action: IAction) => {
    switch (action.type) {
      case "SET_ACTIVEINDEX":
        return { ...state, activeIndex: action.payload.activeIndex };

      case "SET_CHARTAREABORDER":
        return {
          ...state,
          chartAreaBorder: action.payload.chartAreaBorder,
        };

      case "SET_ACTIVEDATAKEY":
        return {
          ...state,
          activeDataKey: action.payload.activeDataKey,
        };

      case "RESET":
        return {
          ...state,
          activeIndex: null,
          chartAreaBorder: 0,
        };

      default:
        return state;
    }
  };

  const [chartMetaData, localDispatch] = React.useReducer(
    chartMetaDataReducer,
    initializeChartMetaData()
  );

  const dataKeys =
    chartData.length > 0 ? Object.keys(chartData[0]).reverse() : [];

  // const yAxisStyle = () =>
  //   yAxisStyleOnHover
  //     ? {
  //         // fill: "#FCD123",
  //         // stroke: "#FCA345",
  //         strokeWidth: 2,
  //         opacity: 0.5,
  //         fontSize: 16,
  //         outline: "1px solid black",
  //         outlineStyle: "dashed",
  //       }
  //     : {};

  // React.useEffect(() => {
  //   const chartObjId = chartRef.current && chartRef.current.uniqueChartId;

  //   if (chartObjId === null) setAgain(1);
  //   else
  //     dispatch(
  //       setChartObjectAction({
  //         chartObjId: chartObjId,
  //         chartObjName: "chartLayout",
  //       })
  //     );
  // }, [again]);

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

  const toolTip = commonChartPropsDefined[
    "tooltipLabel"
  ] as ITooltipLabel["stackedArea"];

  // commonChartPropsDefined["tooltipLabel"] = (d: any) => d.id;
  // commonChartPropsDefined["tooltip"] = undefined;

  return (
    <ResponsiveStream
      data={chartData}
      {...commonChartPropsDefined}
      tooltipFormat={undefined}
    />
  );
};

export default StackedAreaChart;
