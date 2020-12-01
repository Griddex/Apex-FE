import GenerateNodeService from "../Services/GenerateNodeService";
import { GenerateWellheadSummaryNodePositions } from "./GenerateNodePositions";

export const GenerateWellheadSummaryNodes = (manifoldNodes) => {
  const wellheadSummaryNodePositions = GenerateWellheadSummaryNodePositions(
    manifoldNodes
  );

  const wellheadSummaryNodes = wellheadSummaryNodePositions.map(
    (wellheadSummaryPosition, i) => {
      if (
        wellheadSummaryPosition !== [] &&
        wellheadSummaryPosition !== undefined
      ) {
        const wellheadSummaryNode = GenerateNodeService("wellheadSummary");
        const data = manifoldNodes[i].data.rowData;

        const wellheadNodeUpdated = {
          ...wellheadSummaryNode,
          data: {
            ...wellheadSummaryNode.data,
            forecastData: data,
            position: wellheadSummaryPosition,
          },
          position: wellheadSummaryPosition,
        };

        return wellheadNodeUpdated;
      }
    }
  );

  return wellheadSummaryNodes;
};

export default GenerateWellheadSummaryNodes;
