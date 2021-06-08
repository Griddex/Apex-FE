import React from "react";
import { ResponsiveStream } from "@nivo/stream";
import { useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";

const ForecastStackedAreaChart = () => {
  const { forecastResults: data } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  let keys: string[] = [];
  if (Array.isArray(data) && data.length > 0) keys = Object.keys(data[0]);
  else keys = [];

  //TODO To be sent by Gift, send this instead of keys
  const bottomAxisValues = data.map((_, i) => 2020 + i);

  //TODO Check algorithm in backend that reverses the array
  data.reverse();

  return (
    <ResponsiveStream
      data={data}
      keys={keys}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legend: <text>Year</text>,
        legendOffset: 36,
        renderTick: ({
          tickIndex,
          opacity,
          textAnchor,
          textBaseline,
          textX,
          textY,
          value,
          x,
          y,
        }) => {
          return (
            <g transform={`translate(${x},${y})`}>
              <text
                alignmentBaseline={"central"}
                textAnchor={textAnchor}
                transform={`translate(${textX},${textY})`}
                fontSize={11}
                // fontFamily={""}
              >
                {tickIndex % 1 === 0 ? bottomAxisValues[tickIndex] : ""}
              </text>
            </g>
          );
        },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
      }}
      curve="linear"
      offsetType="diverging"
      colors={{ scheme: "category10" }}
      fillOpacity={1}
      borderColor={{ theme: "background" }}
      // defs={[
      //   {
      //     id: "dots",
      //     type: "patternDots",
      //     background: "inherit",
      //     color: "#2c998f",
      //     size: 4,
      //     padding: 2,
      //     stagger: true,
      //   },
      //   {
      //     id: "squares",
      //     type: "patternSquares",
      //     background: "inherit",
      //     color: "#e4c912",
      //     size: 6,
      //     padding: 2,
      //     stagger: true,
      //   },
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: "G01_E8500X_ABASE80E85W05",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "G01_E8000X_ABASE80E85W02",
      //     },
      //     id: "squares",
      //   },
      // ]}

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
