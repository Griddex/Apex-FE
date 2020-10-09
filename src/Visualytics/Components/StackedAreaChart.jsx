import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { persistChartItemAction } from "./../Redux/ChartActions/ChartActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  rootStackedAreaChart: {
    marginTop: 10,
  },
  area: {
    "&:hover": { backgroundColor: "green" },
  },
}));

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const StackedAreaChart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const tertiaryColor = theme.palette.tertiary.main;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        className={classes.rootStackedAreaChart}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        onClick={() => dispatch(persistChartItemAction("chartArea"))}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={secondaryColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={tertiaryColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={tertiaryColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="middle" align="right" height={36} />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke={primaryColor}
          fillOpacity={1}
          fill="url(#colorUv)"
          legendType="wye"
          // dot={{ stroke: "red", strokeWidth: 4 }}
          // activeDot={{ stroke: "red", strokeWidth: 4 }}
          // label={{ fill: "red", fontSize: 20 }}
          // layout="vertical"
          // baseLine={[{ x: 12, y: 15 }]}
          // points={[{ x: 12, y: 12, value: 240 }]}
          onClick={(e) => console.log(e)}
          className={classes.area}
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke={secondaryColor}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke={tertiaryColor}
          fillOpacity={1}
          fill="url(#colorAmt)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
