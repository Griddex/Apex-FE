import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateManifoldNodePositions } from "./GenerateNodePositions";

const GenerateManifoldNodes = (flowstationNodes, gasFacilityNodes) => {
  const manifoldPositions = GenerateManifoldNodePositions(
    flowstationNodes,
    gasFacilityNodes
  );

  const flowstationGasFacilityNodes = [
    ...flowstationNodes,
    ...gasFacilityNodes,
  ];

  const manifoldNodes = flowstationGasFacilityNodes
    .filter((station) => station && station !== undefined)
    .map((station, i) => {
      if (station && station !== undefined) {
        const manifoldNode = GenerateNodeService("manifold");

        const manifoldNodeUpdated = {
          ...manifoldNode,
          data: { ...manifoldNode.data, station },
          position: manifoldPositions[i],
        };

        return manifoldNodeUpdated;
      }
    });

  return manifoldNodes;
};

export default GenerateManifoldNodes;
