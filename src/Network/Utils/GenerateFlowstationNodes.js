import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateFlowstationNodePositions } from "./GenerateNodePositions";

const GenerateFlowstationNodes = (flowStationsUnique) => {
  const flowstationPositions = GenerateFlowstationNodePositions(
    flowStationsUnique
  );

  const flowstationNodes = flowStationsUnique
    .filter((flowStation) => flowStation && flowStation !== undefined)
    .map((flowStation, i) => {
      const flowstationNode = GenerateNodeService("flowstation");
      const flowstationNodeUpdated = {
        ...flowstationNode,
        data: { ...flowstationNode.data, name: flowStation },
        position: flowstationPositions[i],
      };

      return flowstationNodeUpdated;
    });

  return flowstationNodes;
};

export default GenerateFlowstationNodes;
