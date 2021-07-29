import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Position, XYPosition, Node } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import Flowstation from "../../Images/Flowstation.svg";
import FlowstationContextMenu from "../ContextMenu/FlowstationContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const FlowstationWidget = ({ title }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Tooltip key="flowstation" title={title} placement="bottom" arrow>
        <img
          src={Flowstation}
          width={40}
          height={40}
          draggable={false}
          alt="Flowstation"
        />
      </Tooltip>
      <Handle type="source" position={Position.Top} style={handleStyle} />
    </div>
  );
};

const FlowstationNode = React.memo((props: Node & IExtraNodeProps) => {
  const { nodeElementsManual, isNetworkAuto } = useSelector(
    (state: RootState) => state.networkReducer
  );
  const noOfNodes = nodeElementsManual.filter(
    (node: Node & IExtraNodeProps) => node.type === "flowstationNode"
  ).length;

  if (!isNetworkAuto) {
    props = {
      ...props,
      ["data"]: {
        stationData: { title: `Flowstation_${noOfNodes}` },
      },
    };
  }

  const {
    xPos,
    yPos,
    data: {
      stationData: { title },
    },
  } = props;

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
