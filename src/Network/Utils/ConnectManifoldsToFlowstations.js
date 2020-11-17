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
    for (const stationNode of manifoldAndflowstationNodes) {
      console.log("Logged output -->: stationNode", stationNode);
      const flowstation = manifoldNode.data.station.data.name;
      const stationName = stationNode.data.name;

      if (flowstation === stationName) {
        const edge = GenerateEdgeService();

        const edgeUpdated = {
          ...edge,
          source: manifoldNode.id,
          target: stationNode.id,
        };

        allEdges.push(edgeUpdated);
      }
    }
  }

  return allEdges;
};

export default ConnectManifoldsToFlowstations;
