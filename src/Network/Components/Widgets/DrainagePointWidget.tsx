import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Node, Position, XYPosition } from "react-flow-renderer";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import DrainagePointContextMenu from "./../ContextMenu/DrainagePointContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const DrainagePointWidget = ({ title }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="source" position={Position.Top} style={handleStyle} />
      <Tooltip key="flowstation" title={title} placement="bottom" arrow>
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
