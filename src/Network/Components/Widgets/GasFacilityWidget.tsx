import { Tooltip } from "@material-ui/core";
import React from "react";
import { Handle, Position, XYPosition, Node } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import GasFacility from "../../Images/GasFacility.svg";
import GasfacilityContextMenu from "../ContextMenu/GasfacilityContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const GasFacilityWidget = ({ title }: IWidget) => {
  return (
    <div style={widgetStyle}>
      <Handle type="target" position={Position.Bottom} style={handleStyle} />
      <Tooltip key="gasFacility" title={title} placement="bottom" arrow>
        <img
          src={GasFacility}
          width={40}
          height={40}
          draggable={false}
          alt="Gas Facility"
        />
      </Tooltip>
      <Handle type="source" position={Position.Top} style={handleStyle} />
    </div>
  );
};

const GasFacilityNode = React.memo((props: Node & IExtraNodeProps) => {
  const { nodeElementsManual, isNetworkAuto } = useSelector(
    (state: RootState) => state.networkReducer
  );
  const noOfNodes = nodeElementsManual.filter(
    (node: Node & IExtraNodeProps) => node.type === "gasFacilityNode"
  ).length;

  if (!isNetworkAuto) {
    props = {
      ...props,
      ["data"]: {
        stationData: { title: `Gas Facility_${noOfNodes}` },
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
    <GasfacilityContextMenu position={position}>
      <GasFacilityWidget title={title} />
    </GasfacilityContextMenu>
  );
});

export default GasFacilityNode;
