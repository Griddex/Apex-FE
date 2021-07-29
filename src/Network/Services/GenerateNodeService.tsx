import { FlowElement, XYPosition } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

export interface NodeDimensionsType {
  [key: string]: [string, string];
}

const nodeDimensions: NodeDimensionsType = {
  drainagePointSummary: ["50px", "30px"],
  drainagePoint: ["20px", "20px"],
  manifold: ["60px", "40px"],
  flowstation: ["60px", "40px"],
  gasFacility: ["60px", "40px"],
  gatheringCenter: ["80px", "40px"],
  terminal: ["80px", "40px"],
};

const GenerateNodeService = (nodeType: string) => {
  const CurrentDimensions = nodeDimensions[nodeType];

  const newElement: FlowElement = {
    id: uuidv4(),
    type: `${nodeType}Node`,
    data: {
      label: nodeType,
    },
    style: {
      width: CurrentDimensions[0],
      height: CurrentDimensions[1],
      padding: "0px",
      borderColor: "#31BFCC",
    },
    position: { x: 0, y: 0 } as XYPosition,
  };

  return newElement;
};

export default GenerateNodeService;
