import React from "react";
// import { Handle, Position } from "react-flow-renderer";
import { Handle, Position } from "@griddex/react-flow-updated";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import Wellhead from "../../Images/Wellhead.svg";
// import { ReactComponent as Wellhead } from "../../Images/Wellhead.svg";

const NodeWrapper = React.memo(({ children }) => {
  const [showHandle, setShowHandle] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseOver={() => setShowHandle(true)}
      onMouseLeave={() => setShowHandle(false)}
    >
      {showHandle && (
        <Handle
          type="source"
          position={Position.Top}
          style={{
            background: "#555",
            borderWidth: "0px",
            width: "4px",
            height: "4px",
          }}
        />
      )}
      {showHandle && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: "#555",
            borderWidth: "0px",
            height: "4px",
            width: "4px",
          }}
        />
      )}
      {children}
      {showHandle && (
        <Handle
          type="target"
          position={Position.Right}
          style={{
            background: "#555",
            borderWidth: "0px",
            height: "4px",
            width: "4px",
          }}
        />
      )}
      {showHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            background: "#555",
            borderWidth: "0px",
            width: "4px",
            height: "4px",
          }}
        />
      )}
    </div>
  );
});

export interface NodeType {
  nodeType: string;
}

export const WellheadNode = React.memo(() => {
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

export const ManifoldNode = React.memo(() => {
  return (
    <NodeWrapper>
      <img
        src={Manifold}
        width={40}
        height={40}
        draggable={false}
        alt="Manifold"
      />
    </NodeWrapper>
  );
});

export const FlowstationNode = React.memo(() => {
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

export const GasFacilityNode = React.memo(() => {
  return (
    <NodeWrapper>
      <img
        src={GasFacility}
        width={40}
        height={40}
        draggable={false}
        alt="Gas Facility"
      />
    </NodeWrapper>
  );
});

export const GatheringCenterNode = React.memo(() => {
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

export const TerminalNode = React.memo(() => {
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
