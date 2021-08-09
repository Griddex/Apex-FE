import { Tooltip } from "@material-ui/core";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import Flowstation from "../../Images/Flowstation.svg";
import FlowstationContextMenu from "../ContextMenu/FlowstationContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const FlowstationWidget = ({ title }: IWidget) => {
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
        key="flowstation"
        title={title as string}
        placement="bottom"
        arrow
      >
        <img
          src={Flowstation}
          width={40}
          height={40}
          draggable={false}
          alt="Flowstation"
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

const FlowstationNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, stationData } = props;
  const { title } = stationData;

  const position: XYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <FlowstationContextMenu position={position}>
      <FlowstationWidget title={title} />
    </FlowstationContextMenu>
  );
});

export default FlowstationNode;
