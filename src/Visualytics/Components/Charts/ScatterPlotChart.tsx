import { makeStyles } from "@material-ui/core";
import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useTheme } from "@material-ui/core/styles";
import { IChartProps } from "../ChartTypes";

const useStyles = makeStyles(() => ({
  rootScatterPlotChart: {
    marginTop: 10,
  },
}));

const data = [
  {
    id: "group A",
    data: [
      {
        x: 64,
        y: 63,
      },
      {
        x: 15,
        y: 88,
      },
      {
        x: 6,
        y: 16,
      },
      {
        x: 12,
        y: 99,
      },
      {
        x: 26,
        y: 61,
      },
      {
        x: 73,
        y: 106,
      },
      {
        x: 58,
        y: 51,
      },
      {
        x: 0,
        y: 13,
      },
      {
        x: 0,
        y: 12,
      },
      {
        x: 83,
        y: 2,
      },
      {
        x: 70,
        y: 2,
      },
      {
        x: 24,
        y: 38,
      },
      {
        x: 45,
        y: 15,
      },
      {
        x: 28,
        y: 20,
      },
      {
        x: 21,
        y: 74,
      },
      {
        x: 87,
        y: 60,
      },
      {
        x: 23,
        y: 13,
      },
      {
        x: 13,
        y: 2,
      },
      {
        x: 58,
        y: 93,
      },
      {
        x: 75,
        y: 65,
      },
      {
        x: 65,
        y: 91,
      },
      {
        x: 25,
        y: 44,
      },
      {
        x: 100,
        y: 115,
      },
      {
        x: 12,
        y: 94,
      },
      {
        x: 8,
        y: 16,
      },
      {
        x: 45,
        y: 24,
      },
      {
        x: 27,
        y: 61,
      },
      {
        x: 90,
        y: 120,
      },
      {
        x: 47,
        y: 13,
      },
      {
        x: 77,
        y: 30,
      },
      {
        x: 7,
        y: 113,
      },
      {
        x: 91,
        y: 21,
      },
      {
        x: 36,
        y: 60,
      },
      {
        x: 56,
        y: 41,
      },
      {
        x: 19,
        y: 18,
      },
      {
        x: 100,
        y: 49,
      },
      {
        x: 71,
        y: 75,
      },
      {
        x: 23,
        y: 79,
      },
      {
        x: 39,
        y: 13,
      },
      {
        x: 23,
        y: 60,
      },
      {
        x: 58,
        y: 34,
      },
      {
        x: 24,
        y: 82,
      },
      {
        x: 45,
        y: 20,
      },
      {
        x: 89,
        y: 70,
      },
      {
        x: 97,
        y: 85,
      },
      {
        x: 43,
        y: 85,
      },
      {
        x: 11,
        y: 80,
      },
      {
        x: 90,
        y: 83,
      },
      {
        x: 84,
        y: 76,
      },
      {
        x: 45,
        y: 35,
      },
    ],
  },
  {
    id: "group B",
    data: [
      {
        x: 27,
        y: 46,
      },
      {
        x: 25,
        y: 18,
      },
      {
        x: 0,
        y: 45,
      },
      {
        x: 51,
        y: 117,
      },
      {
        x: 55,
        y: 9,
      },
      {
        x: 44,
        y: 120,
      },
      {
        x: 40,
        y: 100,
      },
      {
        x: 63,
        y: 114,
      },
      {
        x: 27,
        y: 30,
      },
      {
        x: 70,
        y: 66,
      },
      {
        x: 18,
        y: 45,
      },
      {
        x: 97,
        y: 103,
      },
      {
        x: 96,
        y: 102,
      },
      {
        x: 100,
        y: 47,
      },
      {
        x: 72,
        y: 71,
      },
      {
        x: 60,
        y: 60,
      },
      {
        x: 67,
        y: 95,
      },
      {
        x: 66,
        y: 64,
      },
      {
        x: 39,
        y: 49,
      },
      {
        x: 76,
        y: 57,
      },
      {
        x: 82,
        y: 53,
      },
      {
        x: 47,
        y: 4,
      },
      {
        x: 92,
        y: 74,
      },
      {
        x: 81,
        y: 74,
      },
      {
        x: 21,
        y: 14,
      },
      {
        x: 43,
        y: 53,
      },
      {
        x: 97,
        y: 109,
      },
      {
        x: 26,
        y: 110,
      },
      {
        x: 49,
        y: 0,
      },
      {
        x: 58,
        y: 112,
      },
      {
        x: 74,
        y: 80,
      },
      {
        x: 93,
        y: 87,
      },
      {
        x: 68,
        y: 86,
      },
      {
        x: 42,
        y: 71,
      },
      {
        x: 36,
        y: 42,
      },
      {
        x: 12,
        y: 84,
      },
      {
        x: 93,
        y: 56,
      },
      {
        x: 71,
        y: 85,
      },
      {
        x: 22,
        y: 94,
      },
      {
        x: 57,
        y: 83,
      },
      {
        x: 72,
        y: 84,
      },
      {
        x: 41,
        y: 99,
      },
      {
        x: 61,
        y: 10,
      },
      {
        x: 98,
        y: 33,
      },
      {
        x: 68,
        y: 51,
      },
      {
        x: 100,
        y: 20,
      },
      {
        x: 77,
        y: 71,
      },
      {
        x: 48,
        y: 89,
      },
      {
        x: 31,
        y: 15,
      },
      {
        x: 74,
        y: 6,
      },
    ],
  },
  {
    id: "group C",
    data: [
      {
        x: 38,
        y: 59,
      },
      {
        x: 68,
        y: 110,
      },
      {
        x: 7,
        y: 104,
      },
      {
        x: 68,
        y: 39,
      },
      {
        x: 31,
        y: 42,
      },
      {
        x: 82,
        y: 29,
      },
      {
        x: 86,
        y: 95,
      },
      {
        x: 42,
        y: 83,
      },
      {
        x: 9,
        y: 24,
      },
      {
        x: 39,
        y: 19,
      },
      {
        x: 71,
        y: 92,
      },
      {
        x: 26,
        y: 4,
      },
      {
        x: 19,
        y: 11,
      },
      {
        x: 75,
        y: 63,
      },
      {
        x: 21,
        y: 105,
      },
      {
        x: 70,
        y: 105,
      },
      {
        x: 17,
        y: 93,
      },
      {
        x: 41,
        y: 21,
      },
      {
        x: 99,
        y: 44,
      },
      {
        x: 80,
        y: 3,
      },
      {
        x: 96,
        y: 75,
      },
      {
        x: 29,
        y: 12,
      },
      {
        x: 32,
        y: 24,
      },
      {
        x: 70,
        y: 45,
      },
      {
        x: 79,
        y: 40,
      },
      {
        x: 65,
        y: 67,
      },
      {
        x: 1,
        y: 91,
      },
      {
        x: 15,
        y: 74,
      },
      {
        x: 17,
        y: 81,
      },
      {
        x: 35,
        y: 59,
      },
      {
        x: 30,
        y: 57,
      },
      {
        x: 0,
        y: 57,
      },
      {
        x: 16,
        y: 115,
      },
      {
        x: 22,
        y: 6,
      },
      {
        x: 45,
        y: 28,
      },
      {
        x: 88,
        y: 98,
      },
      {
        x: 53,
        y: 94,
      },
      {
        x: 0,
        y: 106,
      },
      {
        x: 74,
        y: 18,
      },
      {
        x: 72,
        y: 87,
      },
      {
        x: 90,
        y: 42,
      },
      {
        x: 55,
        y: 71,
      },
      {
        x: 50,
        y: 118,
      },
      {
        x: 60,
        y: 6,
      },
      {
        x: 37,
        y: 18,
      },
      {
        x: 43,
        y: 115,
      },
      {
        x: 38,
        y: 117,
      },
      {
        x: 89,
        y: 27,
      },
      {
        x: 93,
        y: 40,
      },
      {
        x: 72,
        y: 38,
      },
    ],
  },
  {
    id: "group D",
    data: [
      {
        x: 89,
        y: 22,
      },
      {
        x: 82,
        y: 63,
      },
      {
        x: 88,
        y: 84,
      },
      {
        x: 81,
        y: 76,
      },
      {
        x: 71,
        y: 42,
      },
      {
        x: 79,
        y: 61,
      },
      {
        x: 77,
        y: 50,
      },
      {
        x: 23,
        y: 23,
      },
      {
        x: 29,
        y: 28,
      },
      {
        x: 15,
        y: 90,
      },
      {
        x: 27,
        y: 108,
      },
      {
        x: 5,
        y: 18,
      },
      {
        x: 46,
        y: 33,
      },
      {
        x: 46,
        y: 8,
      },
      {
        x: 15,
        y: 23,
      },
      {
        x: 79,
        y: 13,
      },
      {
        x: 40,
        y: 18,
      },
      {
        x: 53,
        y: 114,
      },
      {
        x: 26,
        y: 84,
      },
      {
        x: 83,
        y: 80,
      },
      {
        x: 99,
        y: 5,
      },
      {
        x: 48,
        y: 40,
      },
      {
        x: 8,
        y: 66,
      },
      {
        x: 64,
        y: 69,
      },
      {
        x: 56,
        y: 100,
      },
      {
        x: 25,
        y: 105,
      },
      {
        x: 50,
        y: 26,
      },
      {
        x: 8,
        y: 98,
      },
      {
        x: 89,
        y: 61,
      },
      {
        x: 71,
        y: 120,
      },
      {
        x: 71,
        y: 27,
      },
      {
        x: 91,
        y: 63,
      },
      {
        x: 12,
        y: 47,
      },
      {
        x: 74,
        y: 9,
      },
      {
        x: 72,
        y: 9,
      },
      {
        x: 67,
        y: 42,
      },
      {
        x: 43,
        y: 37,
      },
      {
        x: 30,
        y: 69,
      },
      {
        x: 62,
        y: 83,
      },
      {
        x: 100,
        y: 80,
      },
      {
        x: 89,
        y: 29,
      },
      {
        x: 50,
        y: 101,
      },
      {
        x: 49,
        y: 69,
      },
      {
        x: 74,
        y: 86,
      },
      {
        x: 76,
        y: 98,
      },
      {
        x: 77,
        y: 57,
      },
      {
        x: 78,
        y: 107,
      },
      {
        x: 70,
        y: 19,
      },
      {
        x: 52,
        y: 1,
      },
      {
        x: 37,
        y: 10,
      },
    ],
  },
  {
    id: "group E",
    data: [
      {
        x: 21,
        y: 44,
      },
      {
        x: 85,
        y: 61,
      },
      {
        x: 54,
        y: 18,
      },
      {
        x: 67,
        y: 4,
      },
      {
        x: 59,
        y: 72,
      },
      {
        x: 87,
        y: 2,
      },
      {
        x: 73,
        y: 94,
      },
      {
        x: 2,
        y: 111,
      },
      {
        x: 2,
        y: 66,
      },
      {
        x: 67,
        y: 45,
      },
      {
        x: 89,
        y: 105,
      },
      {
        x: 26,
        y: 32,
      },
      {
        x: 1,
        y: 53,
      },
      {
        x: 66,
        y: 86,
      },
      {
        x: 23,
        y: 29,
      },
      {
        x: 40,
        y: 61,
      },
      {
        x: 60,
        y: 56,
      },
      {
        x: 63,
        y: 43,
      },
      {
        x: 35,
        y: 21,
      },
      {
        x: 79,
        y: 88,
      },
      {
        x: 35,
        y: 37,
      },
      {
        x: 5,
        y: 70,
      },
      {
        x: 87,
        y: 43,
      },
      {
        x: 1,
        y: 117,
      },
      {
        x: 23,
        y: 13,
      },
      {
        x: 39,
        y: 83,
      },
      {
        x: 42,
        y: 44,
      },
      {
        x: 39,
        y: 26,
      },
      {
        x: 2,
        y: 58,
      },
      {
        x: 94,
        y: 90,
      },
      {
        x: 87,
        y: 90,
      },
      {
        x: 11,
        y: 101,
      },
      {
        x: 74,
        y: 9,
      },
      {
        x: 18,
        y: 26,
      },
      {
        x: 8,
        y: 53,
      },
      {
        x: 100,
        y: 116,
      },
      {
        x: 5,
        y: 54,
      },
      {
        x: 39,
        y: 33,
      },
      {
        x: 28,
        y: 39,
      },
      {
        x: 42,
        y: 2,
      },
      {
        x: 52,
        y: 84,
      },
      {
        x: 88,
        y: 120,
      },
      {
        x: 65,
        y: 31,
      },
      {
        x: 93,
        y: 72,
      },
      {
        x: 58,
        y: 114,
      },
      {
        x: 54,
        y: 21,
      },
      {
        x: 67,
        y: 59,
      },
      {
        x: 84,
        y: 42,
      },
      {
        x: 2,
        y: 73,
      },
      {
        x: 21,
        y: 44,
      },
    ],
  },
];

const ScatterPlotChart = ({ willUseThemeColor }: IChartProps) => {
  const theme = useTheme();

  return (
    <ResponsiveScatterPlot
      data={data}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: "auto" }}
      xFormat={function (e) {
        return e + " kg";
      }}
      yScale={{ type: "linear", min: 0, max: "auto" }}
      yFormat={function (e) {
        return e + " cm";
      }}
      blendMode="multiply"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "weight",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "size",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default ScatterPlotChart;
