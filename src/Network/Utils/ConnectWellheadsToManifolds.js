import GenerateEdgeService from "./../Services/GenerateEdgeService";
import groupBy from "lodash/groupBy";

const ConnectWellheadsToManifolds = (wellheadNodesArray, manifoldNodes) => {
  const allEdges = [];

  const manifoldNodesObj = groupBy(
    manifoldNodes,
    (row) => row.data.station.data.name
  );

  for (const wellheadNodes of wellheadNodesArray) {
    for (const wellheadNode of wellheadNodes) {
      const wellheadManifold = wellheadNode.data.forecastData["Flow station"];

      const manifoldNode = manifoldNodesObj[wellheadManifold];

      const edge = GenerateEdgeService();

      const edgeUpdated = {
        ...edge,
        source: wellheadNode.id,
        target: manifoldNode[0].id,
      };

      allEdges.push(edgeUpdated);
    }
  }

  return allEdges;
};

export default ConnectWellheadsToManifolds;
