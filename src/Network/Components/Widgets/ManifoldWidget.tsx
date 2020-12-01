import { Handle, Position, Node, XYPosition } from "react-flow-renderer";
import React from "react";
import Manifold from "../../Images/Manifold.svg";
import ManifoldContextMenu from "./../ContextMenu/ManifoldContextMenu";

const ManifoldWidget = () => {
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
};

interface IXYPos {
  xPos: number;
  yPos: number;
}

const ManifoldNode = React.memo((props: Node & IXYPos) => {
  const { xPos, yPos } = props;
  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <ManifoldContextMenu position={position}>
      <ManifoldWidget />
    </ManifoldContextMenu>
  );
});

export default ManifoldNode;
