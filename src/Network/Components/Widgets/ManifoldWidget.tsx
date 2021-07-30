import { Handle, Position, Node, XYPosition } from "react-flow-renderer";
import React from "react";
import Manifold from "../../Images/Manifold.svg";
import ManifoldContextMenu from "./../ContextMenu/ManifoldContextMenu";
import { Tooltip } from "@material-ui/core";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { useSelector } from "react-redux";

const ManifoldWidget = ({ title }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Tooltip key="flowstation" title={title} placement="bottom" arrow>
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
  const { nodeElementsManual, isNetworkAuto } = useSelector(
    (state: RootState) => state.networkReducer
  );
  const noOfNodes = nodeElementsManual.filter(
    (node: Node & IExtraNodeProps) => node.type === "manifoldNode"
  ).length;

  if (!isNetworkAuto) {
    props = {
      ...props,
      ["data"]: {
        title: `Manifold_${noOfNodes}`,
      },
    };
  }

  const {
    xPos,
    yPos,
    data: { title },
  } = props;

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
