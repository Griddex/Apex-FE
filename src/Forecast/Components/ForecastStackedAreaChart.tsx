// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/stream
import React from "react";

import { ResponsiveStream } from "@nivo/stream";
import { useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// const data = [
//   {
//     G01_E1000X_ABASE10E40W06: 73,
//     G01_E4000X_ABASE10E40W06: 56,
//     G01_E8000X_ABASE80E85W02: 90,
//     G01_E8500X_ABASE80E85W02: 11,
//     G01_E8500X_ABASE80E85W05: 147,
//     G01_F2000X_ABASF20W01: 69,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 74,
//     G01_E4000X_ABASE10E40W06: 88,
//     G01_E8000X_ABASE80E85W02: 78,
//     G01_E8500X_ABASE80E85W02: 160,
//     G01_E8500X_ABASE80E85W05: 64,
//     G01_F2000X_ABASF20W01: 71,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 139,
//     G01_E4000X_ABASE10E40W06: 187,
//     G01_E8000X_ABASE80E85W02: 26,
//     G01_E8500X_ABASE80E85W02: 103,
//     G01_E8500X_ABASE80E85W05: 119,
//     G01_F2000X_ABASF20W01: 194,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 51,
//     G01_E4000X_ABASE10E40W06: 163,
//     G01_E8000X_ABASE80E85W02: 153,
//     G01_E8500X_ABASE80E85W02: 72,
//     G01_E8500X_ABASE80E85W05: 62,
//     G01_F2000X_ABASF20W01: 200,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 106,
//     G01_E4000X_ABASE10E40W06: 86,
//     G01_E8000X_ABASE80E85W02: 139,
//     G01_E8500X_ABASE80E85W02: 176,
//     G01_E8500X_ABASE80E85W05: 76,
//     G01_F2000X_ABASF20W01: 30,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 182,
//     G01_E4000X_ABASE10E40W06: 153,
//     G01_E8000X_ABASE80E85W02: 146,
//     G01_E8500X_ABASE80E85W02: 105,
//     G01_E8500X_ABASE80E85W05: 31,
//     G01_F2000X_ABASF20W01: 189,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 135,
//     G01_E4000X_ABASE10E40W06: 184,
//     G01_E8000X_ABASE80E85W02: 74,
//     G01_E8500X_ABASE80E85W02: 71,
//     G01_E8500X_ABASE80E85W05: 28,
//     G01_F2000X_ABASF20W01: 40,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 49,
//     G01_E4000X_ABASE10E40W06: 58,
//     G01_E8000X_ABASE80E85W02: 83,
//     G01_E8500X_ABASE80E85W02: 43,
//     G01_E8500X_ABASE80E85W05: 196,
//     G01_F2000X_ABASF20W01: 175,
//   },
//   {
//     G01_E1000X_ABASE10E40W06: 64,
//     G01_E4000X_ABASE10E40W06: 142,
//     G01_E8000X_ABASE80E85W02: 58,
//     G01_E8500X_ABASE80E85W02: 113,
//     G01_E8500X_ABASE80E85W05: 77,
//     G01_F2000X_ABASF20W01: 48,
//   },
// ];
const ForecastStackedAreaChart = () => {
  const { transForecastResult: data, forecastKeys } = useSelector(
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
      keys={forecastKeys}
      // keys={[
      //   "G01_E1000X_ABASE10E40W06",
      //   "G01_E4000X_ABASE10E40W06",
      //   "G01_E8000X_ABASE80E85W02",
      //   "G01_E8500X_ABASE80E85W02",
      //   "G01_E8500X_ABASE80E85W05",
      //   "G01_F2000X_ABASF20W01",
      // ]}
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
