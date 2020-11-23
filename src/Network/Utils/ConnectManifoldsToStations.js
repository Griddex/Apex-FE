import GenerateEdgeService from "../Services/GenerateEdgeService";

const ConnectManifoldsToStations = (
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
      const station = manifoldNode.data.rowData[0].stationName;
      const stationName = stationNode.data.name;

      if (station === stationName) {
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

export default ConnectManifoldsToStations;
