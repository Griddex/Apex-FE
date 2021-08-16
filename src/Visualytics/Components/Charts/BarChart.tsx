import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import { IChartProps } from "../ChartTypes";

const SimpleBarChart = ({
  data,
  specificProperties,
  commonProperties,
}: IChartProps) => {
  return (
    <ResponsiveBar data={data} {...specificProperties} {...commonProperties} />
  );
};

export default SimpleBarChart;
