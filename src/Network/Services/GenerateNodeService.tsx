import * as React from "react";
import { FlowElement, XYPosition } from "@griddex/react-flow-updated";
import { uuid } from "uuidv4";

export interface NodeDimensionsType {
  [key: string]: [string, string];
}

const nodeDimensions: NodeDimensionsType = {
  wellhead: ["20px", "20px"],
  manifold: ["60px", "40px"],
  flowstation: ["60px", "40px"],
  gasFacility: ["60px", "40px"],
  gatheringCenter: ["80px", "40px"],
  terminal: ["80px", "40px"],
};

const GenerateNodeService = (nodeType: string) => {
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
    position: { x: 0, y: 0 } as XYPosition,
  };
  return newElement;
};

export default GenerateNodeService;
