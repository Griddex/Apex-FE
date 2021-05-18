import { makeStyles } from "@material-ui/core";
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    country: "AD",
    "hot dog": 121,
    "hot dogColor": "hsl(120, 70%, 50%)",
    burger: 148,
    burgerColor: "hsl(320, 70%, 50%)",
    sandwich: 128,
    sandwichColor: "hsl(42, 70%, 50%)",
    kebab: 64,
    kebabColor: "hsl(183, 70%, 50%)",
    fries: 114,
    friesColor: "hsl(143, 70%, 50%)",
    donut: 7,
    donutColor: "hsl(184, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 56,
    "hot dogColor": "hsl(120, 70%, 50%)",
    burger: 185,
    burgerColor: "hsl(139, 70%, 50%)",
    sandwich: 188,
    sandwichColor: "hsl(352, 70%, 50%)",
    kebab: 27,
    kebabColor: "hsl(285, 70%, 50%)",
    fries: 127,
    friesColor: "hsl(293, 70%, 50%)",
    donut: 191,
    donutColor: "hsl(167, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 154,
    "hot dogColor": "hsl(225, 70%, 50%)",
    burger: 9,
    burgerColor: "hsl(238, 70%, 50%)",
    sandwich: 84,
    sandwichColor: "hsl(140, 70%, 50%)",
    kebab: 137,
    kebabColor: "hsl(41, 70%, 50%)",
    fries: 99,
    friesColor: "hsl(309, 70%, 50%)",
    donut: 51,
    donutColor: "hsl(147, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 186,
    "hot dogColor": "hsl(245, 70%, 50%)",
    burger: 140,
    burgerColor: "hsl(62, 70%, 50%)",
    sandwich: 157,
    sandwichColor: "hsl(36, 70%, 50%)",
    kebab: 8,
    kebabColor: "hsl(218, 70%, 50%)",
    fries: 113,
    friesColor: "hsl(308, 70%, 50%)",
    donut: 94,
    donutColor: "hsl(254, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 37,
    "hot dogColor": "hsl(326, 70%, 50%)",
    burger: 65,
    burgerColor: "hsl(108, 70%, 50%)",
    sandwich: 121,
    sandwichColor: "hsl(302, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(344, 70%, 50%)",
    fries: 171,
    friesColor: "hsl(167, 70%, 50%)",
    donut: 153,
    donutColor: "hsl(158, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 133,
    "hot dogColor": "hsl(44, 70%, 50%)",
    burger: 123,
    burgerColor: "hsl(86, 70%, 50%)",
    sandwich: 131,
    sandwichColor: "hsl(259, 70%, 50%)",
    kebab: 65,
    kebabColor: "hsl(233, 70%, 50%)",
    fries: 103,
    friesColor: "hsl(70, 70%, 50%)",
    donut: 69,
    donutColor: "hsl(272, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 86,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 65,
    burgerColor: "hsl(257, 70%, 50%)",
    sandwich: 132,
    sandwichColor: "hsl(148, 70%, 50%)",
    kebab: 181,
    kebabColor: "hsl(268, 70%, 50%)",
    fries: 146,
    friesColor: "hsl(309, 70%, 50%)",
    donut: 36,
    donutColor: "hsl(131, 70%, 50%)",
  },
];

const SimpleBarChart = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
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
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default SimpleBarChart;
