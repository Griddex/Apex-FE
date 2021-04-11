import { makeStyles } from "@material-ui/core";
import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from "recharts";
import { ChartType } from "./ChartTypes";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  rootDoughnutChart: {
    marginTop: 10,
  },
}));

const DoughnutChart = ({ data }: { data: ChartType }) => {
  const classes = useStyles();

  const theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.secondary.main,
  ];
  // const onPieEnter = (data: ChartType, index: number) => {
  //   console.log(data, index);
  // };

  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    name,
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    fill,
  }: PieLabelRenderProps) => {
    const midAngleDef = midAngle as number;
    const outerRadiusDef = outerRadius as number;
    const cxDef = cx as number;
    const cyDef = cy as number;
    const percentDef = percent as number;

    const sin = Math.sin(-RADIAN * midAngleDef);
    const cos = Math.cos(-RADIAN * midAngleDef);
    const mx = cxDef + (outerRadiusDef + 30) * cos;
    const my = cyDef + (outerRadiusDef + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 4;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 6}
          y={ey}
          textAnchor={textAnchor}
          // fill="#333"
          fill={fill}
        >
          {name}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 6}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#333"
        >
          {`[${(percentDef * 100).toFixed(0)}%]`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart className={classes.rootDoughnutChart}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={"60%"}
          outerRadius={"80%"}
          paddingAngle={3}
          // onMouseEnter={onPieEnter}
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;
