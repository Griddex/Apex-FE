import { Tooltip } from "@material-ui/core";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import Manifold from "../../Images/Manifold.svg";
import ManifoldContextMenu from "./../ContextMenu/ManifoldContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const ManifoldWidget = ({ title }: IWidget) => {
  const isValidTopConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "flowstation" || nodeType === "gasFacility";
  };
  const isValidBottomConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "drainagePoint";
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
        key="flowstation"
        title={title as string}
        placement="bottom"
        arrow
      >
        <img
          src={Manifold}
          width={40}
          height={40}
          draggable={false}
          alt="Manifold"
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

const ManifoldNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <ManifoldContextMenu position={position}>
      <ManifoldWidget title={title} />
    </ManifoldContextMenu>
  );
});

export default ManifoldNode;
