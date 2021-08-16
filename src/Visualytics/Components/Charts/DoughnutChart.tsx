import { useTheme } from "@material-ui/core/styles";
import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { defaultDoughnutSpecificProperties } from "../../Data/VisualyticsData";
import { IChartProps } from "../ChartTypes";

const DoughnutChart = ({
  data,
  specificProperties,
  commonProperties,
  willUseThemeColor,
}: IChartProps) => {
  const theme = useTheme();

  const chartSpecificProperties = !specificProperties
    ? defaultDoughnutSpecificProperties(willUseThemeColor as boolean, theme)
    : specificProperties;

  return (
    <ResponsivePie
      data={data}
      {...chartSpecificProperties}
      {...commonProperties}
    />
  );
};

export default DoughnutChart;
