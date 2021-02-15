import { makeStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
// ];

const StackedAreaChart = (props: any) => {
  const dispatch = useDispatch();
  const chartRef = React.useRef<any>("");

  const [again, setAgain] = React.useState(0);
  // const [yAxisStyleOnHover, setyAxisStyleOnHover] = React.useState(false);
  const { transForecastResult: data } = useSelector(
    (state: RootState) => state.forecastReducer
  );
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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          ref={chartRef}
          syncId="chartId1"
          className={classes.rootStackedAreaChart}
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
          // strokeWidth={chartAreaBorder}
          onClick={(chartEventObj, event) => {
            dispatch(
              setSelectedChartObjIdAction(
                chartRef.current.uniqueChartId,
                "chartLayout"
              )
            );
            localDispatch({
              type: "SET_CHARTAREABORDER",
              payload: { chartAreaBorder: 1 },
            });
            event.stopPropagation();
          }}
        >
          <defs>
            {data.map((dataPoint, i) => {
              const name = removeAllSpaces(dataPoint.name);

              return (
                <linearGradient key={i} id={name} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          <foreignObject height={400}>
            <div>Hello</div>
          </foreignObject>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* {yAxes &&
            yAxes.map((axis, i) => <YAxis yAxisId={i} orientation="left" />)} */}
          <div ref={drop}>
            <YAxis
              // id="yAxes1"
              // className={classes.yAxis}
              yAxisId="left1"
              orientation="left"
              scale="auto"
              dataKey="amt"
              type="number"
              // domain={["dataMin", "dataMax"]}
              // onMouseOver={(obj, index, event) => {
              //   console.log(obj, index, event);
              //   event.nativeEvent.stopPropagation();
              // }}
              onClick={(obj, index, event) => console.log(obj, index, event)}
              // onMouseEnter={(o, e, a) => setyAxisStyleOnHover(true)}
              // onMouseLeave={(o, e, a) => setyAxisStyleOnHover(false)}
              // style={yAxisStyle()}
              // style={dndYAxisStyle}
              name="1"
            />
          </div>
          <YAxis
            yAxisId="left2"
            orientation="left"
            scale="auto"
            dataKey="amt"
            type="number"
            // domain={["dataMin", "dataMax"]}
            // onMouseOver={(o, e, a) => console.log(o, e, a)}
          />
          <YAxis
            // yAxisId="right"
            orientation="right"
            scale="auto"
            dataKey="pv"
            type="number"
            // domain={["dataMin", "dataMax"]}
            // onMouseOver={(o, e) => console.log(o, e)}
          />
          <Tooltip />
          <Legend verticalAlign="middle" align="right" height={36} />
          {data.map((dataPoint, i) => {
            const name = removeAllSpaces(dataPoint.name);

            return (
              <Area
                key={i}
                type="monotone"
                dataKey={dataKeys && dataKeys[i + 1]}
                stackId="1" //Create a unique id and store one time - useRef
                stroke={activeIndex === i ? "black" : colors[i]}
                fillOpacity={1}
                strokeWidth={activeIndex === i ? 3 : 1}
                fill={`url(#${name})`}
                // fill={colors[i]}
                legendType="wye"
                isAnimationActive={false}
                // dot={{ stroke: "red", strokeWidth: 4 }}
                // activeDot={{ stroke: "red", strokeWidth: 4 }}
                // label={{ fill: "red", fontSize: 20 }}
                // layout="vertical"
                // baseLine={[{ x: 12, y: 15 }]}
                // points={[{ x: 12, y: 12, value: 240 }]}
                onClick={(event) => {
                  localDispatch({
                    type: "SET_ACTIVEINDEX",
                    payload: { activeIndex: i },
                  });
                  localDispatch({
                    type: "SET_ACTIVEDATAKEY",
                    payload: { activeDataKey: event.dataKey },
                  });
                }}
                className={classes.area}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </ClickAwayListener>
  );
};

export default StackedAreaChart;
