import GenerateEdgeService from "./../Services/GenerateEdgeService";
import groupBy from "lodash/groupBy";

const ConnectWellheadsToManifolds = (wellheadNodesObj, manifoldNodes) => {
  const allEdges = [];

  for (const manifoldNode of manifoldNodes) {
    const manifoldName = manifoldNode.data.rowData[0].stationName;
    const wellheadNodes = wellheadNodesObj[manifoldName];

    for (const wellheadNode of wellheadNodes) {
      const edge = GenerateEdgeService();

      const edgeUpdated = {
        ...edge,
        source: wellheadNode.id,
        target: manifoldNode.id,
      };

      allEdges.push(edgeUpdated);
    }
  }
  return allEdges;
};

export default ConnectWellheadsToManifolds;
