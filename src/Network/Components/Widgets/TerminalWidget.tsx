import React from "react";
import { Handle, Node, Position, XYPosition } from "react-flow-renderer";
import Terminal from "../../Images/Terminal.svg";
import TerminalContextMenu from "../ContextMenu/TerminalContextMenu";

const TerminalWidget = () => {
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
        src={Terminal}
        width={40}
        height={40}
        draggable={false}
        alt="Terminal"
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
};

interface IXYPos {
  xPos: number;
  yPos: number;
}

const TerminalNode = React.memo((props: Node & IXYPos) => {
  const { xPos, yPos } = props;
  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <TerminalContextMenu position={position}>
      <TerminalWidget />
    </TerminalContextMenu>
  );
});

export default TerminalNode;
