import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { mapData } from "../../../Data/EconomicsData";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const EconomicsSensitivitiesHeatMap = () => {
  return (
    <ResponsiveHeatMap
      data={mapData}
      // keys={["Gas Price1", "Gas Price2", "Gas Price3", "Gas Price4"]}
      keys={["4.5", "3.4", "1.9", "2.7"]}
      indexBy="Oil Price"
      margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
      forceSquare={true}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "Gas Price",
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Oil Price",
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
      animate={true}
      // motionConfig="wobbly"
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  );
};

export default EconomicsSensitivitiesHeatMap;
