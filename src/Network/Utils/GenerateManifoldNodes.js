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
    .filter((manifold) => manifold && manifold !== undefined)
    .map((manifold, i) => {
      if (manifold && manifold !== undefined) {
        const manifoldNode = GenerateNodeService("manifold");

        const manifoldNodeUpdated = {
          ...manifoldNode,
          data: { ...manifoldNode.data, station: manifold },
          position: manifoldPositions[i],
        };

        return manifoldNodeUpdated;
      }
    });

  return manifoldNodes;
};

export default GenerateManifoldNodes;
