import { FlowElement } from "react-flow-renderer";
import React from "react";

export interface NodeComponentsType {
  [key: string]: React.MemoExoticComponent<
    (props: Record<string, unknown>) => JSX.Element
  >;
}

//TODO: Not needed
const AddWidgetsToNodes = (nodes: FlowElement[]) => {
  console.log(
    "Logged output --> ~ file: AddWidgetsToNodes.tsx ~ line 12 ~ AddWidgetsToNodes ~ nodes",
    nodes
  );
  const nodesWithWidgets = nodes.map((node) => {
    return node;
  });

  return nodesWithWidgets;
};

export default AddWidgetsToNodes;
