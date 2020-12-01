import * as React from "react";
import { FlowElement, XYPosition } from "react-flow-renderer";
import { uuid } from "uuidv4";

export interface NodeDimensionsType {
  [key: string]: [string, string];
}

const nodeDimensions: NodeDimensionsType = {
  wellheadSummary: ["40px", "30px"],
  wellhead: ["20px", "20px"],
  manifold: ["60px", "40px"],
  flowstation: ["60px", "40px"],
  gasFacility: ["60px", "40px"],
  gatheringCenter: ["80px", "40px"],
  terminal: ["80px", "40px"],
};

const GenerateNodeByPositionService = (
  nodeType: string,
  nodePosition: XYPosition
) => {
  const CurrentDimensions = nodeDimensions[nodeType];

  const newElement: FlowElement = {
    id: uuid(),
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
    position: nodePosition,
  };
  return newElement;
};

export default GenerateNodeByPositionService;
