import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateManifoldNodePositions } from "./GenerateNodePositions";

const GenerateManifoldNodes = (flowstationNodes, gasFacilityNodes) => {
  const manifoldPositions = GenerateManifoldNodePositions(
    flowstationNodes,
    gasFacilityNodes
  );
  console.log(
    "Logged output --> ~ file: GenerateManifoldNodes.js ~ line 9 ~ GenerateManifoldNodes ~ manifoldPositions",
    manifoldPositions
  );

  const flowstationGasFacilityNodes = [
    ...flowstationNodes,
    ...gasFacilityNodes,
  ];

  const manifoldNodes = flowstationGasFacilityNodes
    .filter((stationNode) => stationNode && stationNode !== undefined)
    .map((stationNode, i) => {
      if (stationNode && stationNode !== undefined) {
        const manifoldNode = GenerateNodeService("manifold");
        const name =
          stationNode.type === "flowstationNode"
            ? "flowStation"
            : "gasFacility";

        const manifoldNodeUpdated = {
          ...manifoldNode,
          data: {
            ...manifoldNode.data,
            rowData: stationNode.data[name],
          },
          position: manifoldPositions[i],
        };

        return manifoldNodeUpdated;
      }
    });

  return manifoldNodes;
};

export default GenerateManifoldNodes;
