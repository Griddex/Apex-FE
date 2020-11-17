import GenerateNodeService from "./../Services/GenerateNodeService";
import { GenerateWellheadNodePositions } from "./GenerateNodePositions";

const injectWellheadPositions = (wellheadPositions, manifoldWells) => {
  const wellheadNodes = wellheadPositions.map((wellheadPosition, i) => {
    if (wellheadPosition !== [] && wellheadPosition !== undefined) {
      const wellheadNode = GenerateNodeService("wellhead");

      const wellheadNodeUpdated = {
        ...wellheadNode,
        data: { ...wellheadNode.data, forecastData: manifoldWells[i] },
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
  const wellNodes = [];

  let i = 1;
  for (const node of manifoldNodes) {
    const wellheadGroupOffset = i % 2 === 0 ? 50 : 100;

    const { type, data } = node.data.station;
    const stationName =
      type === "flowstationNode" ? "flowStation" : "gasFacility";
    const manifoldPosition = node.position;
    const manifoldWells = data[stationName];

    const wellheadNodePositions = GenerateWellheadNodePositions(
      manifoldPosition,
      manifoldWells,
      wellheadGroupOffset
    );
    const flowStationNames = Object.keys(flowStationsData);
    const gasFacilityNames = Object.keys(gasFacilitiesData);
    const stationNames = [...flowStationNames, ...gasFacilityNames];
    const nodes = injectWellheadPositions(
      wellheadNodePositions,
      manifoldWells,
      stationNames
    );
    wellNodes.push(nodes);
    i += 1;
  }

  return wellNodes;
};

export default GenerateWellheadNodes;
