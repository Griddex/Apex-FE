import { makeStyles } from "@material-ui/core";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@material-ui/core/styles";
import { IChartProps } from "../ChartTypes";
import { defaultDoughnutOtherProperties } from "../../Data/VisualyticsData";

const useStyles = makeStyles(() => ({
  rootDoughnutChart: {
    marginTop: 10,
  },
}));

const DoughnutChart = ({
  data,
  otherProperties,
  willUseThemeColor,
}: IChartProps) => {
  const theme = useTheme();

  const chartOtherProperties = !otherProperties
    ? defaultDoughnutOtherProperties(willUseThemeColor as boolean, theme)
    : otherProperties;

  return <ResponsivePie data={data} {...chartOtherProperties} />;
};

export default DoughnutChart;
