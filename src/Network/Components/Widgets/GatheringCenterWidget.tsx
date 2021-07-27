import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Position, XYPosition } from "react-flow-renderer";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import GatheringCenterContextMenu from "../ContextMenu/GatheringCenterContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const GatheringCenterWidget = ({ name }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Tooltip key="gatheringCenter" title={name} placement="bottom" arrow>
        <img
          src={GatheringCenter}
          width={40}
          height={40}
          draggable={false}
          alt="Gathering Center"
        />
      </Tooltip>
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

const GatheringCenterNode = React.memo((props: Node & IExtraNodeProps) => {
  const {
    xPos,
    yPos,
    data: { name },
  } = props;
  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <GatheringCenterContextMenu position={position}>
      <GatheringCenterWidget name={name} />
    </GatheringCenterContextMenu>
  );
});

export default GatheringCenterNode;
