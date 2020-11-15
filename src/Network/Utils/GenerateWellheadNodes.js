import GenerateNodeService from "./../Services/GenerateNodeService";
import { GenerateWellheadNodePositions } from "./GenerateNodePositions";

const injectWellheadPositions = (wellheadPositions, manifoldWells, names) => {
  const wellheadNodes = wellheadPositions.map((wellheadPosition, i) => {
    if (wellheadPosition !== [] && wellheadPosition !== undefined) {
      const wellheadNode = GenerateNodeService("wellhead");

      const wellheadNodeUpdated = {
        ...wellheadNode,
        data: { ...wellheadNode.data, forecastData: manifoldWells[i] },
        position: wellheadPosition,
      };
      // console.log(
      //   "Logged output -->: injectWellheadPositions -> manifoldWells[i]",
      //   manifoldWells[i]
      // );

      return wellheadNodeUpdated;
    }
  });

  return wellheadNodes;
};

export const GenerateWellheadNodes = (
  flowstationNodes,
  gasFacilityNodes,
  flowStationsData,
  gasFacilitiesData
) => {
  const wellNodes = [];

  for (const node of flowstationNodes) {
    const manifoldPosition = node.position;
    const manifoldWells = node.data.flowStation;
    const wellheadNodePositions = GenerateWellheadNodePositions(
      manifoldPosition,
      manifoldWells
    );
    const flowstationNames = Object.keys(flowStationsData);
    const nodes = injectWellheadPositions(
      wellheadNodePositions,
      manifoldWells,
      flowstationNames
    );
    wellNodes.push(nodes);
  }

  for (const node of gasFacilityNodes) {
    const manifoldPosition = node.position;
    const manifoldWells = node.data.gasFacility;
    const wellheadNodePositions = GenerateWellheadNodePositions(
      manifoldPosition,
      manifoldWells
    );
    const gasfacilityNames = Object.keys(gasFacilitiesData);
    const nodes = injectWellheadPositions(
      wellheadNodePositions,
      manifoldWells,
      gasfacilityNames
    );
    wellNodes.push(nodes);
  }

  return wellNodes;
};

export default GenerateWellheadNodes;
