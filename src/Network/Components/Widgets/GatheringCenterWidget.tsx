import React from "react";
import { Handle, Position, XYPosition } from "react-flow-renderer";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import GatheringCenterContextMenu from "../ContextMenu/GatheringCenterContextMenu";

const GatheringCenterWidget = () => {
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
};

interface IXYPos {
  xPos: number;
  yPos: number;
}

const GatheringCenterNode = React.memo((props: Node & IXYPos) => {
  const { xPos, yPos } = props;
  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <GatheringCenterContextMenu position={position}>
      <GatheringCenterWidget />
    </GatheringCenterContextMenu>
  );
});

export default GatheringCenterNode;
