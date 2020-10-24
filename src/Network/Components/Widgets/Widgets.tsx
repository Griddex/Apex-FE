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
        type="source"
        position={Position.Top}
        style={{
          background: "#555",
          // borderRadius: "0px",
          borderWidth: "0px",
          width: "8px",
          height: "8px",
        }}
        isValidConnection={(connection) => true}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#555",
          // borderRadius: "0px",
          borderWidth: "0px",
          height: "8px",
          width: "8px",
        }}
        isValidConnection={(connection) => true}
      />
      {children}
      <Handle
        type="target"
        position={Position.Right}
        style={{
          background: "#555",
          // borderRadius: "0px",
          borderWidth: "0px",
          height: "8px",
          width: "8px",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#555",
          // borderRadius: "0px",
          borderWidth: "0px",
          width: "8px",
          height: "8px",
        }}
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
          <img
            src={Wellhead}
            width={40}
            height={40}
            style={{ margin: "5px" }}
          />
        </NodeWrapper>
      );
    case "manifold":
      return (
        <NodeWrapper>
          <img src={Manifold} width={40} height={40} />
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
