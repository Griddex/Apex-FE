import { Tooltip } from "@mui/material";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import DrainagePointContextMenu from "./../ContextMenu/DrainagePointContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const DrainagePointWidget = ({ title }: IWidget) => {
  const isValidConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "manifold";
  };

  return (
    <div style={widgetStyle}>
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle}
        isValidConnection={isValidConnection}
      />
      <Tooltip
        key="flowstation"
        title={title as string}
        placement="bottom"
        arrow
      >
        <img
          src={DrainagePoint}
          width={20}
          height={20}
          draggable={false}
          alt="DrainagePoint"
        />
      </Tooltip>
    </div>
  );
};

const DrainagePointNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <DrainagePointContextMenu position={position}>
      <DrainagePointWidget title={title} />
    </DrainagePointContextMenu>
  );
});

export default DrainagePointNode;
