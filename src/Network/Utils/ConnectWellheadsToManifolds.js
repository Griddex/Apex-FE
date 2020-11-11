import GenerateEdgeService from "./../Services/GenerateEdgeService";

const ConnectWellheadsToManifolds = (wellheadNodes, manifoldNodes) => {
  const allEdges = [];

  for (const wellheadNode of wellheadNodes) {
    for (const manifoldNode of manifoldNodes) {
      const forecastData = wellheadNode.data.forecastData[0];

      const manifold = forecastData["Flow station"]; //Flowstation
      const manifoldName = manifoldNode.data.name;

      if (manifold === manifoldName) {
        const edge = GenerateEdgeService();

        const edgeUpdated = {
          ...edge,
          source: wellheadNode.id,
          target: manifoldNode.id,
        };

        allEdges.push(edgeUpdated);
      }
    }
  }

  return allEdges;
};

export default ConnectWellheadsToManifolds;
