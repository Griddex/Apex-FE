import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    country: "AD",
    "hot dog": 17,
    "hot dogColor": "hsl(184, 70%, 50%)",
    burger: 64,
    burgerColor: "hsl(351, 70%, 50%)",
    sandwich: 14,
    sandwichColor: "hsl(103, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(223, 70%, 50%)",
    fries: 38,
    friesColor: "hsl(187, 70%, 50%)",
    donut: 70,
    donutColor: "hsl(73, 70%, 50%)",
    junk: 53,
    junkColor: "hsl(198, 70%, 50%)",
    sushi: 47,
    sushiColor: "hsl(97, 70%, 50%)",
    ramen: 2,
    ramenColor: "hsl(138, 70%, 50%)",
    curry: 69,
    curryColor: "hsl(163, 70%, 50%)",
    udon: 41,
    udonColor: "hsl(31, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 99,
    "hot dogColor": "hsl(259, 70%, 50%)",
    burger: 67,
    burgerColor: "hsl(131, 70%, 50%)",
    sandwich: 37,
    sandwichColor: "hsl(218, 70%, 50%)",
    kebab: 68,
    kebabColor: "hsl(167, 70%, 50%)",
    fries: 15,
    friesColor: "hsl(324, 70%, 50%)",
    donut: 70,
    donutColor: "hsl(57, 70%, 50%)",
    junk: 66,
    junkColor: "hsl(320, 70%, 50%)",
    sushi: 22,
    sushiColor: "hsl(225, 70%, 50%)",
    ramen: 97,
    ramenColor: "hsl(299, 70%, 50%)",
    curry: 25,
    curryColor: "hsl(8, 70%, 50%)",
    udon: 91,
    udonColor: "hsl(267, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 48,
    "hot dogColor": "hsl(211, 70%, 50%)",
    burger: 6,
    burgerColor: "hsl(53, 70%, 50%)",
    sandwich: 61,
    sandwichColor: "hsl(208, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(294, 70%, 50%)",
    fries: 18,
    friesColor: "hsl(163, 70%, 50%)",
    donut: 30,
    donutColor: "hsl(89, 70%, 50%)",
    junk: 63,
    junkColor: "hsl(12, 70%, 50%)",
    sushi: 30,
    sushiColor: "hsl(331, 70%, 50%)",
    ramen: 35,
    ramenColor: "hsl(111, 70%, 50%)",
    curry: 90,
    curryColor: "hsl(83, 70%, 50%)",
    udon: 88,
    udonColor: "hsl(316, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 49,
    "hot dogColor": "hsl(242, 70%, 50%)",
    burger: 20,
    burgerColor: "hsl(298, 70%, 50%)",
    sandwich: 79,
    sandwichColor: "hsl(176, 70%, 50%)",
    kebab: 81,
    kebabColor: "hsl(84, 70%, 50%)",
    fries: 83,
    friesColor: "hsl(266, 70%, 50%)",
    donut: 48,
    donutColor: "hsl(69, 70%, 50%)",
    junk: 46,
    junkColor: "hsl(66, 70%, 50%)",
    sushi: 96,
    sushiColor: "hsl(319, 70%, 50%)",
    ramen: 37,
    ramenColor: "hsl(340, 70%, 50%)",
    curry: 82,
    curryColor: "hsl(260, 70%, 50%)",
    udon: 5,
    udonColor: "hsl(138, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 85,
    "hot dogColor": "hsl(349, 70%, 50%)",
    burger: 75,
    burgerColor: "hsl(148, 70%, 50%)",
    sandwich: 95,
    sandwichColor: "hsl(242, 70%, 50%)",
    kebab: 4,
    kebabColor: "hsl(12, 70%, 50%)",
    fries: 15,
    friesColor: "hsl(11, 70%, 50%)",
    donut: 62,
    donutColor: "hsl(178, 70%, 50%)",
    junk: 70,
    junkColor: "hsl(128, 70%, 50%)",
    sushi: 86,
    sushiColor: "hsl(169, 70%, 50%)",
    ramen: 46,
    ramenColor: "hsl(221, 70%, 50%)",
    curry: 55,
    curryColor: "hsl(15, 70%, 50%)",
    udon: 71,
    udonColor: "hsl(316, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 36,
    "hot dogColor": "hsl(62, 70%, 50%)",
    burger: 91,
    burgerColor: "hsl(27, 70%, 50%)",
    sandwich: 34,
    sandwichColor: "hsl(200, 70%, 50%)",
    kebab: 69,
    kebabColor: "hsl(245, 70%, 50%)",
    fries: 36,
    friesColor: "hsl(360, 70%, 50%)",
    donut: 81,
    donutColor: "hsl(114, 70%, 50%)",
    junk: 90,
    junkColor: "hsl(352, 70%, 50%)",
    sushi: 28,
    sushiColor: "hsl(316, 70%, 50%)",
    ramen: 98,
    ramenColor: "hsl(332, 70%, 50%)",
    curry: 41,
    curryColor: "hsl(334, 70%, 50%)",
    udon: 43,
    udonColor: "hsl(203, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 74,
    "hot dogColor": "hsl(51, 70%, 50%)",
    burger: 86,
    burgerColor: "hsl(280, 70%, 50%)",
    sandwich: 29,
    sandwichColor: "hsl(72, 70%, 50%)",
    kebab: 98,
    kebabColor: "hsl(211, 70%, 50%)",
    fries: 59,
    friesColor: "hsl(60, 70%, 50%)",
    donut: 0,
    donutColor: "hsl(310, 70%, 50%)",
    junk: 17,
    junkColor: "hsl(211, 70%, 50%)",
    sushi: 2,
    sushiColor: "hsl(320, 70%, 50%)",
    ramen: 25,
    ramenColor: "hsl(115, 70%, 50%)",
    curry: 8,
    curryColor: "hsl(13, 70%, 50%)",
    udon: 2,
    udonColor: "hsl(192, 70%, 50%)",
  },
  {
    country: "AO",
    "hot dog": 28,
    "hot dogColor": "hsl(42, 70%, 50%)",
    burger: 33,
    burgerColor: "hsl(236, 70%, 50%)",
    sandwich: 0,
    sandwichColor: "hsl(344, 70%, 50%)",
    kebab: 84,
    kebabColor: "hsl(314, 70%, 50%)",
    fries: 83,
    friesColor: "hsl(154, 70%, 50%)",
    donut: 14,
    donutColor: "hsl(351, 70%, 50%)",
    junk: 56,
    junkColor: "hsl(267, 70%, 50%)",
    sushi: 27,
    sushiColor: "hsl(265, 70%, 50%)",
    ramen: 58,
    ramenColor: "hsl(42, 70%, 50%)",
    curry: 76,
    curryColor: "hsl(336, 70%, 50%)",
    udon: 32,
    udonColor: "hsl(106, 70%, 50%)",
  },
  {
    country: "AQ",
    "hot dog": 48,
    "hot dogColor": "hsl(18, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(165, 70%, 50%)",
    sandwich: 59,
    sandwichColor: "hsl(145, 70%, 50%)",
    kebab: 14,
    kebabColor: "hsl(334, 70%, 50%)",
    fries: 2,
    friesColor: "hsl(261, 70%, 50%)",
    donut: 20,
    donutColor: "hsl(217, 70%, 50%)",
    junk: 34,
    junkColor: "hsl(127, 70%, 50%)",
    sushi: 59,
    sushiColor: "hsl(138, 70%, 50%)",
    ramen: 66,
    ramenColor: "hsl(335, 70%, 50%)",
    curry: 27,
    curryColor: "hsl(65, 70%, 50%)",
    udon: 99,
    udonColor: "hsl(255, 70%, 50%)",
  },
];

const EconomicsTemplateSelectChart = () => {
  return (
    <ResponsiveHeatMap
      data={data}
      keys={[
        "hot dog",
        "burger",
        "sandwich",
        "kebab",
        "fries",
        "donut",
        "junk",
        "sushi",
        "ramen",
        "curry",
        "udon",
      ]}
      indexBy="country"
      margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
      forceSquare={true}
      axisTop={{
        // orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "",
        legendOffset: 36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        // orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      cellOpacity={1}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
      // defs={[
      //     {
      //         id: 'lines',
      //         type: 'patternLines',
      //         background: 'inherit',
      //         color: 'rgba(0, 0, 0, 0.1)',
      //         rotation: -45,
      //         lineWidth: 4,
      //         spacing: 7
      //     }
      // ]}
      // fill={[ { id: 'lines' } ]}
      animate={false}
      // motionConfig="wobbly"
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  );
};

export default EconomicsTemplateSelectChart;
