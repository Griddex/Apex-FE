import { Handle, Position, FlowElement } from "@griddex/react-flow-updated";
import React from "react";
import Flowstation from "../../Images/Flowstation.svg";

export interface NodeType {
  nodeType: string;
}

const FlowstationNode = React.memo(() => {
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
        src={Flowstation}
        width={40}
        height={40}
        draggable={false}
        alt="Flowstation"
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

export default FlowstationNode;
