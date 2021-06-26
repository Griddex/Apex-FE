import { makeStyles } from "@material-ui/core";
import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { useTheme } from "@material-ui/core/styles";
import { IChartProps } from "../ChartTypes";

const useStyles = makeStyles(() => ({
  rootRadarChartChart: {
    marginTop: 10,
  },
}));

const data = [
  {
    taste: "fruity",
    chardonay: 111,
    carmenere: 95,
    syrah: 82,
  },
  {
    taste: "bitter",
    chardonay: 55,
    carmenere: 84,
    syrah: 66,
  },
  {
    taste: "heavy",
    chardonay: 77,
    carmenere: 52,
    syrah: 21,
  },
  {
    taste: "strong",
    chardonay: 47,
    carmenere: 60,
    syrah: 117,
  },
  {
    taste: "sunny",
    chardonay: 112,
    carmenere: 52,
    syrah: 84,
  },
];

const RadarChartChart = ({ willUseThemeColor }: IChartProps) => {
  const theme = useTheme();

  return (
    <ResponsiveRadar
      data={data}
      keys={["chardonay", "carmenere", "syrah"]}
      indexBy="taste"
      maxValue="auto"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      curve="linearClosed"
      borderWidth={2}
      borderColor={{ from: "color" }}
      gridLevels={5}
      gridShape="circular"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={{ scheme: "nivo" }}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      isInteractive={true}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RadarChartChart;
