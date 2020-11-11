import GenerateEdgeService from "../Services/GenerateEdgeService";

const ConnectFlowstationsToTerminal = (
  terminalNodes,
  flowstationNodes,
  gasFacilityNodes
) => {
  const allEdges = [];
  const flowstationGasFacilityNodes = [
    ...flowstationNodes,
    ...gasFacilityNodes,
  ];

  for (const terminalNode of terminalNodes) {
    for (const flowstationGasfacility of flowstationGasFacilityNodes) {
      // const terminal = terminalNode.data.name;
      // const flowstationGasfacilityName = flowstationGasfacility.data.name;

      // if (terminal === flowstationName) {
      const edge = GenerateEdgeService();

      const edgeUpdated = {
        ...edge,
        source: flowstationGasfacility.id,
        target: terminalNode.id,
      };

      allEdges.push(edgeUpdated);
      // }
    }
  }

  return allEdges;
};

export default ConnectFlowstationsToTerminal;
