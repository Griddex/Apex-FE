import * as React from "react";
import { FlowElement, XYPosition } from "@griddex/react-flow-updated";
import FlowstationNode from "../Components/Widgets/FlowstationWidget";
import GasFacilityNode from "../Components/Widgets/GasFacilityWidget";
import GatheringCenterNode from "../Components/Widgets/GatheringCenterWidget";
import ManifoldNode from "../Components/Widgets/ManifoldWidget";
import TerminalNode from "../Components/Widgets/TerminalWidget";
import WellheadNode from "../Components/Widgets/WellheadWidget";
import { uuid } from "uuidv4";

export interface NodeComponentsType {
  [key: string]: React.MemoExoticComponent<() => JSX.Element>;
}

export interface NodeDimensionsType {
  [key: string]: [string, string];
}

const nodeComponents: NodeComponentsType = {
  wellhead: WellheadNode,
  manifold: ManifoldNode,
  flowstation: FlowstationNode,
  gasFacility: GasFacilityNode,
  gatheringCenter: GatheringCenterNode,
  terminal: TerminalNode,
};

const nodeDimensions: NodeDimensionsType = {
  wellhead: ["20px", "20px"],
  manifold: ["60px", "40px"],
  flowstation: ["60px", "40px"],
  gasFacility: ["60px", "40px"],
  gatheringCenter: ["80px", "40px"],
  terminal: ["80px", "40px"],
};

const GenerateNodeService = (nodeType: string) => {
  const CurrentNode = nodeComponents[nodeType];
  const CurrentDimensions = nodeDimensions[nodeType];

  const newElement: FlowElement = {
    id: uuid(),
    type: `${nodeType}Node`,
    data: {
      label: JSON.stringify(<CurrentNode />),
    },
    style: {
      width: CurrentDimensions[0],
      height: CurrentDimensions[1],
      padding: "0px",
      borderColor: "#2BB4C1",
    },
    position: { x: 0, y: 0 } as XYPosition,
  };
  return newElement;
};

export default GenerateNodeService;
