import { Tooltip, Typography } from "@mui/material";
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
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ApexXYPosition } from "../../../Application/Types/ApplicationTypes";

const ManifoldWidget = ({ title, showTitle }: IWidget) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
            src={Manifold}
            width={40}
            height={40}
            draggable={false}
            alt="Manifold"
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
const showTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.showTitle,
  (showTitle) => showTitle
);

const ManifoldNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const showTitle = useSelector(showTitleSelector);

  const position: ApexXYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <ManifoldContextMenu position={position}>
      <ManifoldWidget title={title} showTitle={showTitle} />
    </ManifoldContextMenu>
  );
});

export default ManifoldNode;
