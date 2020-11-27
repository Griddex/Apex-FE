import { Handle, Position, FlowElement } from "@griddex/react-flow-updated";
import React from "react";
import GatheringCenter from "../../Images/GatheringCenter.svg";

export interface NodeType {
  nodeType: string;
}

const GatheringCenterNode = React.memo(() => {
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
      <img
        src={GatheringCenter}
        width={40}
        height={40}
        draggable={false}
        alt="Gathering Center"
      />
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

export default GatheringCenterNode;
