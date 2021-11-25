import { ResponsiveHeatMap } from "@nivo/heatmap";
import startCase from "lodash.startcase";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import HeatMapCustomCell from "../../../Components/HeatMapCustomComponents/HeatMapCustomCell";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const sensitivitiesHeatMap1or2DSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.sensitivitiesHeatMap1or2D,
  (data) => data
);
const heatMapVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableXOptions,
  (data) => data
);
const heatMapVariableYOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableYOptions,
  (data) => data
);
const heatMapTreeByScenarioSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapTreeByScenario,
  (data) => data
);

export interface IEconomicsSensitivitiesHeatMap {
  sensitivitiesHeatMap1or2D: any[];
}

const EconomicsSensitivitiesHeatMap = () => {
  const sensitivitiesHeatMap1or2D = useSelector(
    sensitivitiesHeatMap1or2DSelector
  );
  const heatMapVariableXOptions = useSelector(heatMapVariableXOptionsSelector);
  const heatMapVariableYOptions = useSelector(heatMapVariableYOptionsSelector);
  const heatMapTreeByScenario = useSelector(heatMapTreeByScenarioSelector);

  const noOfSensitivities = heatMapTreeByScenario["children"].length;

  const keys = Object?.keys(sensitivitiesHeatMap1or2D[0])
    ?.filter((key) => key.includes("Color"))
    ?.map((e) => e.replace("Color", ""));

  let yId = "";
  let yName = "";
  if (noOfSensitivities >= 2) {
    yId = Object.keys(heatMapVariableYOptions)[0];
    yName = heatMapVariableYOptions[yId].name;
  }

  const xId = Object.keys(heatMapVariableXOptions)[0];
  const xName = heatMapVariableXOptions[xId].name;

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
        legend: <div>{startCase(xName)}</div>,
        // legend: <Typography variant="h4">{startCase(xName)}</Typography>,
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: <div>{startCase(yName)}</div>,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      cellOpacity={1}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
      animate={false}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
      cellShape={HeatMapCustomCell}
      label={(datum, key) =>
        // `${Number(datum[key]).toLocaleString("en-US", {
        //   minimumFractionDigits: 2,
        // })} ₽`

        Math.round(Number(datum[key]))
      }
      tooltipFormat={(value) =>
        // `${Number(value).toLocaleString("en-US", {
        //   minimumFractionDigits: 2,
        // })} ₽`

        Math.round(Number(value))
      }
    />
  );
};

export default EconomicsSensitivitiesHeatMap;
