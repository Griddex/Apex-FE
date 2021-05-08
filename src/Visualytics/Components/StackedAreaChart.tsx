import { makeStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ResponsiveStream } from "@nivo/stream";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  setChartObjectAction,
  setSelectedChartObjIdAction,
} from "../Redux/ChartActions/ChartActions";
import ItemTypes from "../Utils/DragAndDropItemTypes";
import removeAllSpaces from "../Utils/RemoveAllSpaces";
import {
  IChartLayoutProps,
  IChartMetaData,
} from "./../Redux/ChartState/ChartStateTypes";

const useStyles = makeStyles(() => ({
  rootStackedAreaChart: {
    backgroundColor: (props: IChartLayoutProps) =>
      props.chartLayoutColor ? props.chartLayoutColor : "white",
    backgroundImage: (props: IChartLayoutProps) =>
      props.chartLayoutGradient
        ? props.chartLayoutGradient
        : "linear-gradient(white, white)",
    border: (props: IChartLayoutProps) =>
      `${props?.chartMetaData?.chartAreaBorder}px solid`,
  },
  area: {
    "&:hover": { backgroundColor: "green" },
  },
  yAxis: { fill: "#FCD123", stroke: "#FCA345", fontSize: 16 },
}));

const data = [
  {
    Raoul: 200,
    Josiane: 96,
    Marcel: 25,
    René: 89,
    Paul: 123,
    Jacques: 103,
  },
  {
    Raoul: 196,
    Josiane: 14,
    Marcel: 39,
    René: 53,
    Paul: 53,
    Jacques: 124,
  },
  {
    Raoul: 152,
    Josiane: 136,
    Marcel: 10,
    René: 74,
    Paul: 101,
    Jacques: 39,
  },
  {
    Raoul: 36,
    Josiane: 138,
    Marcel: 79,
    René: 134,
    Paul: 81,
    Jacques: 199,
  },
  {
    Raoul: 14,
    Josiane: 156,
    Marcel: 108,
    René: 62,
    Paul: 178,
    Jacques: 59,
  },
  {
    Raoul: 92,
    Josiane: 198,
    Marcel: 83,
    René: 179,
    Paul: 71,
    Jacques: 19,
  },
  {
    Raoul: 196,
    Josiane: 157,
    Marcel: 155,
    René: 51,
    Paul: 93,
    Jacques: 15,
  },
  {
    Raoul: 168,
    Josiane: 128,
    Marcel: 59,
    René: 156,
    Paul: 114,
    Jacques: 58,
  },
  {
    Raoul: 200,
    Josiane: 187,
    Marcel: 59,
    René: 139,
    Paul: 199,
    Jacques: 85,
  },
];

const StackedAreaChart = (props: any) => {
  const dispatch = useDispatch();
  const chartRef = React.useRef<any>("");

  const [again, setAgain] = React.useState(0);
  // const [yAxisStyleOnHover, setyAxisStyleOnHover] = React.useState(false);
  // const { transForecastResult: data } = useSelector(
  //   (state: RootState) => state.forecastReducer
  // );
  console.log(
    "Logged output --> ~ file: StackedAreaChart.tsx ~ line 63 ~ StackedAreaChart ~ data",
    data
  );

  const { chartObjects } = useSelector(
    (state: RootState) => state.chartReducer
  );
  const chartObject = chartObjects.find(
    (obj) => obj.chartObjId === chartRef.current.uniqueChartId
  );

  const chartLayoutColor = chartObject?.formatObj?.color;
  const chartLayoutGradient = chartObject?.formatObj?.gradient;
  const {
    formatObj: { chartSeriesSolidColors },
  } = useSelector((state: RootState) => state.chartReducer);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.TABLE_COLUMNDATA,
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

  const handleClickAway = () => {
    localDispatch({
      type: "RESET",
    });
    // dispatch(
    //   setSelectedChartObjIdAction({
    //     id: chartRef.current.uniqueChartId,
    //     chartObjName: "none",
    //   })
    // );
    // dispatch(contextDrawerCollapseAction());
  };

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

  const dataKeys = data.length > 0 ? Object.keys(data[0]) : [];
  const colors = chartSeriesSolidColors.slice(0, dataKeys.length);

  const { activeIndex } = chartMetaData;

  const allProps = {
    ...props,
    chartLayoutColor,
    chartLayoutGradient,
    ...chartMetaData,
  };
  const classes = useStyles(allProps);

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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <ResponsiveStream
        data={data}
        keys={keys}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          // orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 36,
        }}
        axisLeft={{
          // orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -40,
        }}
        curve="linear"
        offsetType="diverging"
        colors={{ scheme: "paired" }}
        fillOpacity={0.85}
        borderColor={{ theme: "background" }}
        // defs={[
        //   {
        //     id: "dots",
        //     type: "patternDots",
        //     background: "inherit",
        //     color: "#2c998f",
        //     size: 4,
        //     padding: 2,
        //     stagger: true,
        //   },
        //   {
        //     id: "squares",
        //     type: "patternSquares",
        //     background: "inherit",
        //     color: "#e4c912",
        //     size: 6,
        //     padding: 2,
        //     stagger: true,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: "G01_E8500X_ABASE80E85W05",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "G01_E8000X_ABASE80E85W02",
        //     },
        //     id: "squares",
        //   },
        // ]}
        dotSize={8}
        dotColor={{ from: "color" }}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                },
              },
            ],
          },
        ]}
      />
    </ClickAwayListener>
  );
};

export default StackedAreaChart;
