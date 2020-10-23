import React from "react";
import { Handle, Position } from "react-flow-renderer";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import Wellhead from "../../Images/Wellhead.svg";

const NodeWrapper = React.memo(({ children }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      {children}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "#555" }}
      />
    </>
  );
});

export interface NodeType {
  nodeType: string;
}

const Widgets: React.FC<NodeType> = ({ nodeType }: NodeType) => {
  switch (nodeType) {
    case "wellhead":
      return (
        <NodeWrapper>
          <img src={Wellhead} width={40} height={40} />
        </NodeWrapper>
      );
    case "flowstation":
      return (
        <NodeWrapper>
          <img src={Flowstation} width={40} height={40} />
        </NodeWrapper>
      );
    case "gasFacility":
      return (
        <NodeWrapper>
          <img src={GasFacility} width={40} height={40} />
        </NodeWrapper>
      );
    case "gatheringCenter":
      return (
        <NodeWrapper>
          <img src={GatheringCenter} width={40} height={40} />
        </NodeWrapper>
      );
    case "nanifold":
      return (
        <NodeWrapper>
          <img src={Manifold} width={40} height={40} />
        </NodeWrapper>
      );
    case "terminal":
      return (
        <NodeWrapper>
          <img src={Terminal} width={40} height={40} />
        </NodeWrapper>
      );

    default:
      return null;
  }
};

export default Widgets;
