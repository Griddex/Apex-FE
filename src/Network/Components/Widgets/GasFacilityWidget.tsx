import { Tooltip } from "@mui/material";
import React from "react";
import isEqual from "react-fast-compare";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import GasFacility from "../../Images/GasFacility.svg";
import GasfacilityContextMenu from "../ContextMenu/GasfacilityContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const GasFacilityWidget = ({ title }: IWidget) => {
  const isValidTopConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "gatheringCenter" || nodeType === "terminal";
  };
  const isValidBottomConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "gasFacility";
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
        key="gasFacility"
        title={title as string}
        placement="bottom"
        arrow
      >
        <img
          src={GasFacility}
          width={40}
          height={40}
          draggable={false}
          alt="Gas Facility"
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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const isNetworkAutoSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.isNetworkAuto,
  (isNetworkAuto) => isNetworkAuto
);

const GasFacilityNode = React.memo((props: Node & IExtraNodeProps) => {
  const isNetworkAuto = useSelector(isNetworkAutoSelector);

  const { xPos, yPos, data } = props;

  let title = "";
  if (isNetworkAuto) {
    title = data?.stationData?.title;
  } else {
    title = data?.title;
  }

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
