import { Handle, Position } from "@griddex/react-flow-updated";
import React from "react";
import GatheringCenter from "../../Images/GatheringCenter.svg";

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
        position={Position.Left}
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
        position={Position.Right}
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

const GatheringCenterNode = React.memo(() => {
  return (
    <NodeWrapper>
      <img
        src={GatheringCenter}
        width={40}
        height={40}
        draggable={false}
        alt="Gathering Center"
      />
    </NodeWrapper>
  );
});

export default GatheringCenterNode;
