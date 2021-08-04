import { Tooltip } from "@material-ui/core";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import GatheringCenterContextMenu from "../ContextMenu/GatheringCenterContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const GatheringCenterWidget = ({ title }: IWidget) => {
  const isValidLeftConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "flowstation" || nodeType === "gasFacility";
  };
  const isValidRightConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "terminal";
  };

  return (
    <div style={widgetStyle}>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
        isValidConnection={isValidLeftConnection}
      />
      <Tooltip
        key="gatheringCenter"
        title={title as string}
        placement="bottom"
        arrow
      >
        <img
          src={GatheringCenter}
          width={40}
          height={40}
          draggable={false}
          alt="Gathering Center"
        />
      </Tooltip>
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
        isValidConnection={isValidRightConnection}
      />
    </div>
  );
};

const GatheringCenterNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <GatheringCenterContextMenu position={position}>
      <GatheringCenterWidget title={title} />
    </GatheringCenterContextMenu>
  );
});

export default GatheringCenterNode;
