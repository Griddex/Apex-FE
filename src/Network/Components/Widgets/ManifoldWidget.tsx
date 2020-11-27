import { Handle, Position, FlowElement } from "@griddex/react-flow-updated";
import React from "react";
import Manifold from "../../Images/Manifold.svg";

export interface NodeType {
  nodeType: string;
}

const ManifoldNode = React.memo(() => {
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
      <img
        src={Manifold}
        width={40}
        height={40}
        draggable={false}
        alt="Manifold"
      />
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

export default ManifoldNode;
