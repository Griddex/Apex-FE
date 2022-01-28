import { Tooltip, Typography } from "@mui/material";
import React from "react";
import {
  Connection,
  Handle,
  Node,
  Position,
  XYPosition,
} from "react-flow-renderer";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import GatheringCenterContextMenu from "../ContextMenu/GatheringCenterContextMenu";
import { handleStyle, widgetStyle } from "./WidgetStyles";
import { IExtraNodeProps, IWidget } from "./WidgetTypes";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { ApexXYPosition } from "../../../Application/Types/ApplicationTypes";

const GatheringCenterWidget = ({ title, showTitle }: IWidget) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isValidLeftConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "flowstation" || nodeType === "gasFacility";
  };
  const isValidRightConnection = (connection: Connection) => {
    const nodeType = connection?.target?.split("_")[1];
    return nodeType === "terminal";
  };

  return (
    <div style={widgetStyle}>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
        isValidConnection={isValidLeftConnection}
      />
      <Tooltip
        key="gatheringCenter"
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
            src={GatheringCenter}
            width={40}
            height={40}
            draggable={false}
            alt="Gathering Center"
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
        type="source"
        position={Position.Right}
        style={handleStyle}
        isValidConnection={isValidRightConnection}
      />
    </div>
  );
};

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const showTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.showTitle,
  (showTitle) => showTitle
);

const GatheringCenterNode = React.memo((props: Node & IExtraNodeProps) => {
  const { xPos, yPos, data } = props;
  const { title } = data;

  const showTitle = useSelector(showTitleSelector);

  const position: ApexXYPosition = {
    x: xPos,
    y: yPos,
  };

  return (
    <GatheringCenterContextMenu position={position}>
      <GatheringCenterWidget title={title} showTitle={showTitle} />
    </GatheringCenterContextMenu>
  );
});

export default GatheringCenterNode;
