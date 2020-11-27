import { FlowElement } from "@griddex/react-flow-updated";
import React from "react";

export interface NodeComponentsType {
  [key: string]: React.MemoExoticComponent<
    (props: Record<string, unknown>) => JSX.Element
  >;
}

const AddWidgetsToNodes = (nodes: FlowElement[]) => {
  const nodesWithWidgets = nodes.map((node) => {
    return node;
  });

  return nodesWithWidgets;
};

export default AddWidgetsToNodes;
