import React from "react";
import { ResponsiveStream } from "@nivo/stream";
import { useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";

const ForecastStackedAreaChart = () => {
  const { transForecastResult: data } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  console.log(
    "Logged output --> ~ file: ForecastStackedAreaChart.tsx ~ line 99 ~ ForecastStackedAreaChart ~ data",
    data
  );

  let keys: string[] = [];
  if (Array.isArray(data) && data.length > 0) keys = Object.keys(data[0]);
  else keys = [];

  return (
    <ResponsiveStream
      data={data}
      keys={keys}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
      }}
      curve="linear"
      offsetType="diverging"
      colors={{ scheme: "nivo" }}
      fillOpacity={0.85}
      borderColor={{ theme: "background" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#2c998f",
          size: 4,
          padding: 2,
          stagger: true,
        },
        {
          id: "squares",
          type: "patternSquares",
          background: "inherit",
          color: "#e4c912",
          size: 6,
          padding: 2,
          stagger: true,
        },
      ]}
      fill={[
        {
          match: {
            id: "G01_E8500X_ABASE80E85W05",
          },
          id: "dots",
        },
        {
          match: {
            id: "G01_E8000X_ABASE80E85W02",
          },
          id: "squares",
        },
      ]}
      dotSize={8}
      dotColor={{ from: "color" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default ForecastStackedAreaChart;
