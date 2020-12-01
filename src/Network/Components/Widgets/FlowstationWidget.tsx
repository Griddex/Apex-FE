import { Handle, Position, FlowElement, XYPosition } from "react-flow-renderer";
import React from "react";
import Flowstation from "../../Images/Flowstation.svg";
import FlowstationContextMenu from "../ContextMenu/FlowstationContextMenu";

const FlowstationWidget = () => {
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
};

interface IXYPos {
  xPos: number;
  yPos: number;
}

const FlowstationNode = React.memo((props: Node & IXYPos) => {
  const { xPos, yPos } = props;
  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <FlowstationContextMenu position={position}>
      <FlowstationWidget />
    </FlowstationContextMenu>
  );
});

export default FlowstationNode;
