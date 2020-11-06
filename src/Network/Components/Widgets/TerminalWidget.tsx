import { Handle, Position } from "@griddex/react-flow-updated";
import React from "react";
import Terminal from "../../Images/Terminal.svg";

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
        position={Position.Top}
        style={{
          background: "#555",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{
          background: "#555",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
      {children}
      <Handle
        type="target"
        position={Position.Right}
        style={{
          background: "#555",
          borderWidth: "0px",
          height: "4px",
          width: "4px",
          borderRadius: "0px",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#555",
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

const TerminalNode = React.memo(() => {
  return (
    <NodeWrapper>
      <img
        src={Terminal}
        width={40}
        height={40}
        draggable={false}
        alt="Terminal"
      />
    </NodeWrapper>
  );
});

export default TerminalNode;
