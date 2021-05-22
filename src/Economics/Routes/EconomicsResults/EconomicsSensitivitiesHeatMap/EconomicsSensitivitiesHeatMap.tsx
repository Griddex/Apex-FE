import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import ApexFlexStyle from "../../../../Application/Components/Styles/ApexFlexStyle";
import { useTheme } from "@material-ui/core";
import HeatMapCustomCell from "../../../Components/HeatMapCustomComponents/HeatMapCustomCell";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";

export interface IEconomicsSensitivitiesHeatMap {
  sensitivitiesHeatMap1or2D: any[];
}

const EconomicsSensitivitiesHeatMap = () => {
  const theme = useTheme();
  const {
    sensitivitiesHeatMap1or2D,
    heatMapVariableXOption,
    heatMapVariableYOption,
    heatMapVariableZOption,
  } = useSelector((state: RootState) => state.economicsReducer);

  let keys: string[] = [];

  if (sensitivitiesHeatMap1or2D.length > 0) {
    keys = Object?.keys(sensitivitiesHeatMap1or2D[0])
      ?.filter((key) => key.includes("Color"))
      ?.map((e) => e.replace("Color", ""));
  } else
    return (
      <ApexFlexStyle
        moreStyles={{
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[200],
        }}
      >
        {"No map"}
      </ApexFlexStyle>
    );

  return (
    <ResponsiveHeatMap
      data={sensitivitiesHeatMap1or2D}
      keys={keys}
      indexBy={heatMapVariableYOption.value}
      margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
      forceSquare={true}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: heatMapVariableXOption.value,
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: heatMapVariableYOption.value,
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
