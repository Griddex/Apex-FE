import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Node, Position, XYPosition } from "react-flow-renderer";
import Terminal from "../../Images/Terminal.svg";
import TerminalContextMenu from "../ContextMenu/TerminalContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const TerminalWidget = ({ name }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Tooltip key="flowstation" title={name} placement="bottom" arrow>
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
    <TerminalContextMenu position={position}>
      <TerminalWidget name={name} />
    </TerminalContextMenu>
  );
});

export default TerminalNode;
