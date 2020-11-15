import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateFlowstationNodePositions } from "./GenerateNodePositions";

const GenerateFlowstationNodes = (flowStationsData) => {
  const flowStationsUnique = Object.keys(flowStationsData);

  const flowstationPositions = GenerateFlowstationNodePositions(
    flowStationsUnique
  );

  const flowstationNodes = Object.values(flowStationsData)
    .filter((data) => data && data !== undefined)
    .map((data, i) => {
      if (data && data !== undefined) {
        const stationName = data[0]["Flow station"];
        const flowstationNode = GenerateNodeService("flowstation");

        const flowstationNodeUpdated = {
          ...flowstationNode,
          data: {
            ...flowstationNode.data,
            flowStation: data,
            name: stationName,
          },
          position: flowstationPositions[i],
        };

        return flowstationNodeUpdated;
      }
    });

  return flowstationNodes;
};

export default GenerateFlowstationNodes;
