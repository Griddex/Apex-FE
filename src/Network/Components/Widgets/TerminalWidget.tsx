import { Tooltip } from "@mui/material";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import Terminal from "../../Images/Terminal.svg";
import TerminalContextMenu from "../ContextMenu/TerminalContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const TerminalWidget = ({ title }: IWidget) => {
  const isValidConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return (
      nodeType === "gatheringCenter" ||
      nodeType === "gasFacility" ||
      nodeType === "flowstation"
    );
  };

  return (
    <div style={widgetStyle}>
      <Handle
        type="target"
        position={Position.Bottom}
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
          src={Terminal}
          width={40}
          height={40}
          draggable={false}
          alt="Terminal"
        />
      </Tooltip>
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

const TerminalNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <TerminalContextMenu position={position}>
      <TerminalWidget title={title} />
    </TerminalContextMenu>
  );
});

export default TerminalNode;
