import { Tooltip, Typography } from "@mui/material";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import DrainagePointContextMenu from "./../ContextMenu/DrainagePointContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ApexXYPosition } from "../../../Application/Types/ApplicationTypes";

const DrainagePointWidget = ({ title, showTitle }: IWidget) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isValidConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "manifold";
  };

  return (
    <div style={widgetStyle}>
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle}
        isValidConnection={isValidConnection}
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
            src={DrainagePoint}
            width={20}
            height={20}
            draggable={false}
            alt="DrainagePoint"
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
    </div>
  );
};

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const showTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.showTitle,
  (showTitle) => showTitle
);

const DrainagePointNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const showTitle = useSelector(showTitleSelector);

  const position: ApexXYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <DrainagePointContextMenu position={position}>
      <DrainagePointWidget title={title} showTitle={showTitle} />
    </DrainagePointContextMenu>
  );
});

export default DrainagePointNode;
