import { makeStyles } from "@material-ui/core";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const useStyles = makeStyles(() => ({
  rootDoughnutChart: {
    marginTop: 10,
  },
}));

const COLORS = ["#31BFCC", "#00C49F", "#DA1B57"]; //"#22BE34"

//May implement scale on hover
const DoughnutChart = ({ data }) => {
  const classes = useStyles();

  const onPieEnter = (data, index) => {
    console.log(data, index);
  };

  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    name,
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    fill,
  }) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
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
          {`[${(percent * 100).toFixed(0)}%]`}
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
          onMouseEnter={onPieEnter}
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
