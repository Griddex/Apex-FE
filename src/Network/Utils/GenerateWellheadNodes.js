import GenerateNodeService from "./../Services/GenerateNodeService";
import { GenerateWellheadNodePositions } from "./GenerateNodePositions";

const injectWellheadPositions = (wellheadPositions, rowData) => {
  const wellheadNodes = wellheadPositions.map((wellheadPosition, i) => {
    if (wellheadPosition !== [] && wellheadPosition !== undefined) {
      const wellheadNode = GenerateNodeService("wellhead");

      const wellheadNodeUpdated = {
        ...wellheadNode,
        data: { ...wellheadNode.data, forecastData: rowData },
        position: wellheadPosition,
      };

      return wellheadNodeUpdated;
    }
  });

  return wellheadNodes;
};

export const GenerateWellheadNodes = (
  manifoldNodes,
  flowStationsData,
  gasFacilitiesData
) => {
  const wellNodes = {};

  let i = 1;
  for (const node of manifoldNodes) {
    const wellheadGroupOffset = i % 2 === 0 ? 50 : 100;

    const rowData = node.data.rowData;
    const { stationName } = rowData[0];
    // const stationName =
    // stationType === "flowstationNode" ? "flowStation" : "gasFacility";
    const manifoldPosition = node.position;
    const manifoldWellNames =
      rowData && rowData.map((row) => row["drainagePoint"]);

    const wellheadNodePositions = GenerateWellheadNodePositions(
      manifoldPosition,
      manifoldWellNames,
      wellheadGroupOffset
    );
    const flowStationNames = Object.keys(flowStationsData);
    const gasFacilityNames = Object.keys(gasFacilitiesData);
    const stationNames = [...flowStationNames, ...gasFacilityNames];
    const nodes = injectWellheadPositions(
      wellheadNodePositions,
      rowData,
      stationNames
    );
    wellNodes[stationName] = nodes;
    i += 1;
  }

  return wellNodes;
};

export default GenerateWellheadNodes;
