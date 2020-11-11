import GenerateEdgeService from "../Services/GenerateEdgeService";

const ConnectManifoldsToFlowstations = (
  manifoldNodes,
  flowstationNodes,
  gasFacilityNodes
) => {
  const allEdges = [];
  const manifoldAndflowstationNodes = [
    ...flowstationNodes,
    ...gasFacilityNodes,
  ];

  for (const manifoldNode of manifoldNodes) {
    for (const flowstationNode of manifoldAndflowstationNodes) {
      const flowstation = manifoldNode.data.name;
      const flowstationName = flowstationNode.data.name;

      if (flowstation === flowstationName) {
        const edge = GenerateEdgeService();

        const edgeUpdated = {
          ...edge,
          source: manifoldNode.id,
          target: flowstationNode.id,
        };

        allEdges.push(edgeUpdated);
      }
    }
  }

  return allEdges;
};

export default ConnectManifoldsToFlowstations;
