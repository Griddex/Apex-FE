import React from "react";
import { Handle, Position, XYPosition } from "react-flow-renderer";
import GasFacility from "../../Images/GasFacility.svg";
import GasfacilityContextMenu from "../ContextMenu/GasfacilityContextMenu";

const GasFacilityWidget = () => {
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
        src={GasFacility}
        width={40}
        height={40}
        draggable={false}
        alt="Gas Facility"
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

const GasFacilityNode = React.memo((props: Node & IXYPos) => {
  const { xPos, yPos } = props;
  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <GasfacilityContextMenu position={position}>
      <GasFacilityWidget />
    </GasfacilityContextMenu>
  );
});

export default GasFacilityNode;
