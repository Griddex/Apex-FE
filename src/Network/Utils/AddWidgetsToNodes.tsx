import { FlowElement } from "@griddex/react-flow-updated";
import React from "react";
import FlowstationNode from "../Components/Widgets/FlowstationWidget";
import GasFacilityNode from "../Components/Widgets/GasFacilityWidget";
import GatheringCenterNode from "../Components/Widgets/GatheringCenterWidget";
import ManifoldNode from "../Components/Widgets/ManifoldWidget";
import TerminalNode from "../Components/Widgets/TerminalWidget";
import WellheadNode from "../Components/Widgets/WellheadWidget";

export interface NodeComponentsType {
  [key: string]: React.MemoExoticComponent<() => JSX.Element>;
}
const nodeComponents: NodeComponentsType = {
  wellhead: WellheadNode,
  manifold: ManifoldNode,
  flowstation: FlowstationNode,
  gasFacility: GasFacilityNode,
  gatheringCenter: GatheringCenterNode,
  terminal: TerminalNode,
};

const AddWidgetsToNodes = (nodes: FlowElement[]) => {
  const nodesWithWidgets = nodes.map((node) => {
    const nodeType: string = node.data.label;
    const CurrentNode = nodeComponents[nodeType];

    return { ...node, label: <CurrentNode /> };
  });

  return nodesWithWidgets;
};

export default AddWidgetsToNodes;
