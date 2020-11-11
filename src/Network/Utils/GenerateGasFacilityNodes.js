import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateGasfacilityNodePositions } from "./GenerateNodePositions";

const GenerateGasFacilityNodes = (gasFacilitiesUnique) => {
  const gasfacilityPositions = GenerateGasfacilityNodePositions(
    gasFacilitiesUnique
  );

  const gasFacilityNodes = gasFacilitiesUnique
    .filter((gasFacility) => gasFacility && gasFacility !== undefined)
    .map((gasFacility, i) => {
      if (gasFacility && gasFacility !== undefined) {
        const gasFacilityNode = GenerateNodeService("gasFacility");
        const gasFacilityNodeUpdated = {
          ...gasFacilityNode,
          data: { ...gasFacilityNode.data, name: gasFacility },
          position: gasfacilityPositions[i],
        };

        return gasFacilityNodeUpdated;
      }
    });

  return gasFacilityNodes;
};

export default GenerateGasFacilityNodes;
