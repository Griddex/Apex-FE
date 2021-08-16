import { FlowElement, XYPosition } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { TNodeTypes } from "./../Data/NetworkData";

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

const GenerateNodeService = (nodeType: TNodeTypes, isNetworkAuto: boolean) => {
  const currentDimensions = nodeDimensions[nodeType];
  const id = uuidv4();

  const newElement: FlowElement = {
    id: isNetworkAuto ? id : `${id}_${nodeType}`,
    type: `${nodeType}Node`,
    data: {
      label: nodeType,
    },
    style: {
      width: currentDimensions[0],
      height: currentDimensions[1],
      padding: "0px",
      borderColor: "#31BFCC",
    },
    position: { x: 0, y: 0 } as XYPosition,
  };

  return newElement;
};

export default GenerateNodeService;
