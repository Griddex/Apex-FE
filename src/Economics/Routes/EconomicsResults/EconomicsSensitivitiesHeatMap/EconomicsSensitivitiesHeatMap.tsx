import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { useTheme } from "@material-ui/core";
import HeatMapCustomCell from "../../../Components/HeatMapCustomComponents/HeatMapCustomCell";

export interface IEconomicsSensitivitiesHeatMap {
  mapDataDisplayed: any[];
}

const EconomicsSensitivitiesHeatMap = ({
  mapDataDisplayed,
}: IEconomicsSensitivitiesHeatMap) => {
  const theme = useTheme();

  let keys: string[] = [];

  if (mapDataDisplayed.length > 0) {
    keys = Object?.keys(mapDataDisplayed[0])
      ?.filter((key) => key.includes("Color"))
      ?.map((e) => e.replace("Color", ""));
  } else
    return (
      <CenteredStyle
        moreStyles={{
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[200],
        }}
      >
        {"No map"}
      </CenteredStyle>
    );

  return (
    <ResponsiveHeatMap
      data={mapDataDisplayed}
      keys={keys}
      indexBy="Oil Price"
      margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
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
      cellShape={HeatMapCustomCell}
    />
  );
};

export default EconomicsSensitivitiesHeatMap;
