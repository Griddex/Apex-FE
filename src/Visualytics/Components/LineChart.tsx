import { makeStyles } from "@material-ui/core";
import React from "react";
import { ResponsiveLine } from "@nivo/line";

const useStyles = makeStyles(() => ({
  rootLineChart: {
    marginTop: 10,
  },
}));

const data = [
  {
    id: "japan",
    color: "hsl(207, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 189,
      },
      {
        x: "helicopter",
        y: 13,
      },
      {
        x: "boat",
        y: 243,
      },
      {
        x: "train",
        y: 6,
      },
      {
        x: "subway",
        y: 16,
      },
      {
        x: "bus",
        y: 82,
      },
      {
        x: "car",
        y: 128,
      },
      {
        x: "moto",
        y: 35,
      },
      {
        x: "bicycle",
        y: 160,
      },
      {
        x: "horse",
        y: 189,
      },
      {
        x: "skateboard",
        y: 75,
      },
      {
        x: "others",
        y: 112,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(46, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 149,
      },
      {
        x: "helicopter",
        y: 149,
      },
      {
        x: "boat",
        y: 72,
      },
      {
        x: "train",
        y: 246,
      },
      {
        x: "subway",
        y: 181,
      },
      {
        x: "bus",
        y: 168,
      },
      {
        x: "car",
        y: 85,
      },
      {
        x: "moto",
        y: 233,
      },
      {
        x: "bicycle",
        y: 297,
      },
      {
        x: "horse",
        y: 177,
      },
      {
        x: "skateboard",
        y: 138,
      },
      {
        x: "others",
        y: 38,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(92, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 131,
      },
      {
        x: "helicopter",
        y: 243,
      },
      {
        x: "boat",
        y: 62,
      },
      {
        x: "train",
        y: 223,
      },
      {
        x: "subway",
        y: 165,
      },
      {
        x: "bus",
        y: 10,
      },
      {
        x: "car",
        y: 197,
      },
      {
        x: "moto",
        y: 51,
      },
      {
        x: "bicycle",
        y: 249,
      },
      {
        x: "horse",
        y: 10,
      },
      {
        x: "skateboard",
        y: 2,
      },
      {
        x: "others",
        y: 89,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(81, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 142,
      },
      {
        x: "helicopter",
        y: 229,
      },
      {
        x: "boat",
        y: 122,
      },
      {
        x: "train",
        y: 238,
      },
      {
        x: "subway",
        y: 193,
      },
      {
        x: "bus",
        y: 174,
      },
      {
        x: "car",
        y: 165,
      },
      {
        x: "moto",
        y: 30,
      },
      {
        x: "bicycle",
        y: 88,
      },
      {
        x: "horse",
        y: 115,
      },
      {
        x: "skateboard",
        y: 33,
      },
      {
        x: "others",
        y: 100,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(301, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 176,
      },
      {
        x: "helicopter",
        y: 55,
      },
      {
        x: "boat",
        y: 67,
      },
      {
        x: "train",
        y: 122,
      },
      {
        x: "subway",
        y: 220,
      },
      {
        x: "bus",
        y: 17,
      },
      {
        x: "car",
        y: 210,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 259,
      },
      {
        x: "horse",
        y: 52,
      },
      {
        x: "skateboard",
        y: 74,
      },
      {
        x: "others",
        y: 268,
      },
    ],
  },
];

const SimpleLineChart = () => {
  const classes = useStyles();

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default SimpleLineChart;
