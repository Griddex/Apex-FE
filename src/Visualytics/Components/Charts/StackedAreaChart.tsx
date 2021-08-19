import { ResponsiveStream } from "@nivo/stream";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { setChartObjectAction } from "../../Redux/VisualyticsActions/VisualyticsActions";
import { IChartMetaData } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { itemTypesVisualytics } from "../../Utils/DragAndDropItemTypes";
import renderTick from "../../Utils/RenderTicks";
import { IChartProps } from "../ChartTypes";

const StackedAreaChart = ({
  data,
  specificProperties,
  commonProperties,
}: IChartProps) => {
  const dispatch = useDispatch();
  const chartRef = React.useRef<any>("");

  const [again, setAgain] = React.useState(0);

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

  const dataKeys = data.length > 0 ? Object.keys(data[0]).reverse() : [];

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

  React.useEffect(() => {
    const chartObjId = chartRef.current && chartRef.current.uniqueChartId;

    if (chartObjId === null) setAgain(1);
    else
      dispatch(
        setChartObjectAction({
          chartObjId: chartObjId,
          chartObjName: "chartLayout",
        })
      );
  }, [again]);

  let keys: string[] = [];
  if (Array.isArray(data) && data.length > 0) keys = Object.keys(data[0]);
  else keys = [];

  const bottomAxisValues = data.map((_, i) => 2020 + i);

  specificProperties["axisBottom"]["renderTick"] = renderTick(bottomAxisValues);
  specificProperties["keys"] = keys;

  return (
    <ResponsiveStream
      data={data}
      {...specificProperties}
      {...commonProperties}
    />
  );
};

export default StackedAreaChart;
