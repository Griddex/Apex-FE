import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { IChartProps } from "../ChartTypes";

const SimpleLineChart = ({
  data,
  specificProperties,
  commonProperties,
}: IChartProps) => {
  return (
    <ResponsiveLine data={data} {...specificProperties} {...commonProperties} />
  );
};

export default SimpleLineChart;
