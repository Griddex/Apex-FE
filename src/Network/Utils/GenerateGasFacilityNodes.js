import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateGasfacilityNodePositions } from "./GenerateNodePositions";

const GenerateGasFacilityNodes = (gasFacilitiesData) => {
  const gasFacilitiesUnique = Object.keys(gasFacilitiesData);

  const gasfacilityPositions = GenerateGasfacilityNodePositions(
    gasFacilitiesUnique
  );

  const gasFacilityNodes = Object.values(gasFacilitiesData)
    .filter((data) => data && data !== undefined)
    .map((data, i) => {
      if (data && data !== undefined) {
        const stationName = data[0]["Flow station"];
        const gasFacilityNode = GenerateNodeService("gasFacility");

        const gasFacilityNodeUpdated = {
          ...gasFacilityNode,
          data: {
            ...gasFacilityNode.data,
            gasFacility: data,
            name: stationName,
          },
          position: gasfacilityPositions[i],
        };

        return gasFacilityNodeUpdated;
      }
    });

  return gasFacilityNodes;
};

export default GenerateGasFacilityNodes;
