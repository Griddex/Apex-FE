import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Position, XYPosition } from "react-flow-renderer";
import GasFacility from "../../Images/GasFacility.svg";
import GasfacilityContextMenu from "../ContextMenu/GasfacilityContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const GasFacilityWidget = ({ name }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Tooltip key="gasFacility" title={name} placement="bottom" arrow>
        <img
          src={GasFacility}
          width={40}
          height={40}
          draggable={false}
          alt="Gas Facility"
        />
      </Tooltip>
      <Handle type="source" position={Position.Top} style={handleStyle} />
    </div>
  );
};

const GasFacilityNode = React.memo((props: Node & IExtraNodeProps) => {
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
    <GasfacilityContextMenu position={position}>
      <GasFacilityWidget name={name} />
    </GasfacilityContextMenu>
  );
});

export default GasFacilityNode;
