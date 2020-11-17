import { Handle, Position } from "@griddex/react-flow-updated";
import React from "react";
import Flowstation from "../../Images/Flowstation.svg";

const NodeWrapper = React.memo(({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Bottom}
        style={{
          background: "#999",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
      {children}
      <Handle
        type="source"
        position={Position.Top}
        style={{
          background: "#999",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
    </div>
  );
});

export interface NodeType {
  nodeType: string;
}

const FlowstationNode = React.memo(() => {
  return (
    <NodeWrapper>
      <img
        src={Flowstation}
        width={40}
        height={40}
        draggable={false}
        alt="Flowstation"
      />
    </NodeWrapper>
  );
});

export default FlowstationNode;
