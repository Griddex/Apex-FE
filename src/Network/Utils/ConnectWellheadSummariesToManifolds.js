import GenerateEdgeService from "../Services/GenerateEdgeService";

const ConnectWellheadSummariesToManifolds = (
  wellheadSummaryNodes,
  manifoldNodes
) => {
  const allEdges = [];

  let i = 0;
  for (const manifoldNode of manifoldNodes) {
    const wellSummaryNode = wellheadSummaryNodes[i];

    const edge = GenerateEdgeService();

    const edgeUpdated = {
      ...edge,
      source: wellSummaryNode.id,
      target: manifoldNode.id,
    };

    allEdges.push(edgeUpdated);

    i = i + 1;
  }
  return allEdges;
};

export default ConnectWellheadSummariesToManifolds;
