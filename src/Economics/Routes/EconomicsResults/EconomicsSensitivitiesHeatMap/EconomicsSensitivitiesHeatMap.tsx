import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { useTheme } from "@material-ui/core";
import HeatMapCustomCell from "../../../Components/HeatMapCustomComponents/HeatMapCustomCell";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";
import startCase from "lodash.startcase";

export interface IEconomicsSensitivitiesHeatMap {
  sensitivitiesHeatMap1or2D: any[];
}

const EconomicsSensitivitiesHeatMap = () => {
  const theme = useTheme();
  const {
    sensitivitiesHeatMap1or2D,
    heatMapVariableXOptions,
    heatMapVariableYOptions,
  } = useSelector((state: RootState) => state.economicsReducer);

  let keys: string[] = [];

  if (sensitivitiesHeatMap1or2D.length > 0) {
    keys = Object?.keys(sensitivitiesHeatMap1or2D[0])
      ?.filter((key) => key.includes("Color"))
      ?.map((e) => e.replace("Color", ""));
  } else
    return (
      <ApexFlexContainer
        moreStyles={{
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[200],
          minWidth: theme.breakpoints.values["md"],
        }}
      >
        {"No map"}
      </ApexFlexContainer>
    );

  return (
    <ResponsiveHeatMap
      data={sensitivitiesHeatMap1or2D}
      keys={keys}
      indexBy={heatMapVariableYOptions.value}
      margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
      forceSquare={true}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: startCase(heatMapVariableXOptions.value),
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: startCase(heatMapVariableYOptions.value),
        legendPosition: "middle",
        legendOffset: -40,
      }}
      cellOpacity={1}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
      animate={true}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
      cellShape={HeatMapCustomCell}
    />
  );
};

export default EconomicsSensitivitiesHeatMap;
