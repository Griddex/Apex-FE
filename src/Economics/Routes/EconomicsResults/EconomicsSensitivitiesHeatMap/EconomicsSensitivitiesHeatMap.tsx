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
    heatMapTreeByScenario,
  } = useSelector((state: RootState) => {
    const {
      sensitivitiesHeatMap1or2D,
      heatMapVariableXOptions,
      heatMapVariableYOptions,
      heatMapTreeByScenario,
    } = state.economicsReducer;

    return {
      sensitivitiesHeatMap1or2D,
      heatMapVariableXOptions,
      heatMapVariableYOptions,
      heatMapTreeByScenario,
    };
  });
  console.log(
    "Logged output --> ~ file: EconomicsSensitivitiesHeatMap.tsx ~ line 21 ~ EconomicsSensitivitiesHeatMap ~ sensitivitiesHeatMap1or2D",
    sensitivitiesHeatMap1or2D
  );

  const noOfSensitivities = heatMapTreeByScenario["children"].length;

  const keys = Object?.keys(sensitivitiesHeatMap1or2D[0])
    ?.filter((key) => key.includes("Color"))
    ?.map((e) => e.replace("Color", ""));
  console.log(
    "Logged output --> ~ file: EconomicsSensitivitiesHeatMap.tsx ~ line 39 ~ EconomicsSensitivitiesHeatMap ~ keys",
    keys
  );

  let yId = "";
  let yName = "";
  if (noOfSensitivities >= 2) {
    yId = Object.keys(heatMapVariableYOptions)[0];
    yName = heatMapVariableYOptions[yId].name;
    console.log(
      "Logged output --> ~ file: EconomicsSensitivitiesHeatMap.tsx ~ line 46 ~ EconomicsSensitivitiesHeatMap ~ yName",
      yName
    );
  }

  const xId = Object.keys(heatMapVariableXOptions)[0];
  const xName = heatMapVariableXOptions[xId].name;
  console.log(
    "Logged output --> ~ file: EconomicsSensitivitiesHeatMap.tsx ~ line 49 ~ EconomicsSensitivitiesHeatMap ~ xName",
    xName
  );

  return (
    <ResponsiveHeatMap
      data={sensitivitiesHeatMap1or2D}
      keys={keys}
      indexBy={yName}
      margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
      forceSquare={true}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: startCase(xName),
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: startCase(yName),
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
