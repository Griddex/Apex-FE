import { Handle, Position } from "@griddex/react-flow-updated";
import React from "react";
import Wellhead from "../../Images/Wellhead.svg";

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
        type="source"
        position={Position.Top}
        style={{
          // background: "#555",
          background: "#999",
          borderWidth: "0px",
          width: "4px",
          height: "4px",
          borderRadius: "0px",
        }}
      />
      {children}
    </div>
  );
});

export interface NodeType {
  nodeType: string;
}

const WellheadNode = React.memo(() => {
  return (
    <NodeWrapper>
      <img
        src={Wellhead}
        width={20}
        height={20}
        draggable={false}
        alt="Wellhead"
      />
    </NodeWrapper>
  );
});

export default WellheadNode;
