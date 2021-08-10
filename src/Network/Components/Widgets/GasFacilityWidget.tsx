import { Tooltip } from "@material-ui/core";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import GasFacility from "../../Images/GasFacility.svg";
import GasfacilityContextMenu from "../ContextMenu/GasfacilityContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const GasFacilityWidget = ({ title }: IWidget) => {
  const isValidTopConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "gatheringCenter" || nodeType === "terminal";
  };
  const isValidBottomConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "manifold";
  };

  return (
    <div style={widgetStyle}>
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle}
        isValidConnection={isValidTopConnection}
      />
      <Tooltip
        key="gasFacility"
        title={title as string}
        placement="bottom"
        arrow
      >
        <img
          src={GasFacility}
          width={40}
          height={40}
          draggable={false}
          alt="Gas Facility"
        />
      </Tooltip>
      <Handle
        type="target"
        position={Position.Bottom}
        style={handleStyle}
        isValidConnection={isValidBottomConnection}
      />
    </div>
  );
};

const GasFacilityNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data.stationData;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <GasfacilityContextMenu position={position}>
      <GasFacilityWidget title={title} />
    </GasfacilityContextMenu>
  );
});

export default GasFacilityNode;
