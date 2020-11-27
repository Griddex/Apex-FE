import GenerateNodeService from "./../Services/GenerateNodeService";
import { GenerateWellheadNodePositions } from "./GenerateNodePositions";

const injectWellheadPositions = (
  wellheadPositions,
  rowData,
  stationsData,
  wellheadDatabyManifold
) => {
  const { stationName } = rowData[0];
  const wellheadData = stationsData[stationName];

  const wellheadNodes = wellheadPositions.map((wellheadPosition, i) => {
    if (wellheadPosition !== [] && wellheadPosition !== undefined) {
      const wellheadNode = GenerateNodeService("wellhead");
      const wellData = wellheadData[i]["Drainage Point"];

      const wellheadNodeUpdated = {
        ...wellheadNode,
        data: {
          ...wellheadNode.data,
          forecastData: wellheadDatabyManifold[wellData],
          position: wellheadPosition,
        },
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
  gasFacilitiesData,
  wellheadDatabyManifold
) => {
  const stationsData = { ...flowStationsData, ...gasFacilitiesData };
  const wellNodes = {};

  let i = 1;
  for (const node of manifoldNodes) {
    const wellheadGroupOffset = i % 2 === 0 ? 50 : 100;

    const rowData = node.data.rowData;
    const { stationName } = rowData[0];
    const manifoldPosition = node.position;
    const manifoldWellNames =
      rowData && rowData.map((row) => row["drainagePoint"]);

    const wellheadNodePositions = GenerateWellheadNodePositions(
      manifoldPosition,
      manifoldWellNames,
      wellheadGroupOffset
    );
    // const stationNames = Object.keys(stationsData);
    const nodes = injectWellheadPositions(
      wellheadNodePositions,
      rowData,
      stationsData,
      wellheadDatabyManifold
    );
    wellNodes[stationName] = nodes;

    i += 1;
  }

  return wellNodes;
};

export default GenerateWellheadNodes;
