import { Tooltip, Typography } from "@mui/material";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import Flowstation from "../../Images/Flowstation.svg";
import FlowstationContextMenu from "../ContextMenu/FlowstationContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";

const FlowstationWidget = ({ title, showTitle }: IWidget) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
        open={showTitle ? false : open}
        onClose={handleClose}
        onOpen={handleOpen}
        placement="bottom"
        arrow
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={Flowstation}
            width={40}
            height={40}
            draggable={false}
            alt="Flowstation"
          />
          {showTitle && (
            <Typography
              style={{ lineHeight: 1, fontSize: "0.6rem", marginTop: 5 }}
              variant="body1"
            >
              {title}
            </Typography>
          )}
        </div>
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
const showTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.showTitle,
  (showTitle) => showTitle
);

const FlowstationNode = React.memo((props: Node & IExtraNodeProps) => {
  const isNetworkAuto = useSelector(isNetworkAutoSelector);
  const showTitle = useSelector(showTitleSelector);

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
    <FlowstationContextMenu
      position={showTitle ? { x: null, y: null } : position}
    >
      <FlowstationWidget title={title} showTitle={showTitle} />
    </FlowstationContextMenu>
  );
});

export default FlowstationNode;
