import { Handle, Position, Node, XYPosition } from "react-flow-renderer";
import React from "react";
import Manifold from "../../Images/Manifold.svg";
import ManifoldContextMenu from "./../ContextMenu/ManifoldContextMenu";
import { Tooltip } from "@material-ui/core";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";
import { handleStyle, widgetStyle } from "./WidgetStyles";

const ManifoldWidget = ({ name }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Tooltip key="flowstation" title={name} placement="bottom" arrow>
        <img
          src={Manifold}
          width={40}
          height={40}
          draggable={false}
          alt="Manifold"
        />
      </Tooltip>
      <Handle type="source" position={Position.Top} style={handleStyle} />
    </div>
  );
};

const ManifoldNode = React.memo((props: Node & IExtraNodeProps) => {
  console.log(
    "Logged output --> ~ file: ManifoldWidget.tsx ~ line 53 ~ ManifoldNode ~ props",
    props
  );
  const {
    xPos,
    yPos,
    data: { rowData },
  } = props;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  const name = `${rowData[0]["stationName"]} Manifold`;

  return (
    <ManifoldContextMenu position={position}>
      <ManifoldWidget name={name} />
    </ManifoldContextMenu>
  );
});

export default ManifoldNode;
