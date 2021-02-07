import { IconButton, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import React from "react";
import ForecastActionsMenu from "../Menus/ForecastActionsMenu";
import NetworkActionsMenu from "../Menus/NetworkActionsMenu";
import { INetworkDiagramIcons } from "./NetworkDiagramIconsTypes";

const useStyles = makeStyles(() => ({
  networkContentIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottom: "1px solid #E7E7E7",
    height: 28,
    "& > *": {
      marginLeft: 5,
    },
  },
  CanvasWidget: { height: "100%", backgroundColor: "#FFF" },
}));

const NetworkDiagramButtons = (props: INetworkDiagramIcons) => {
  const theme = useTheme();
  const classes = useStyles();
  const { showMiniMap, setShowMiniMap, showControls, setShowControls } = props;

  return (
    <div className={classes.networkContentIcons}>
      <NetworkActionsMenu />
      <ForecastActionsMenu />
      <Tooltip
        key={"miniMapToolTip"}
        title={"Toggle the production network's minimap on or off"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 0,
          }}
          onClick={() => setShowMiniMap(!showMiniMap)}
        >
          <MapOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        key={"controlsToolTip"}
        title={"Toggle the production network's controls on or off"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 0,
          }}
          onClick={() => setShowControls(!showControls)}
        >
          <ViewAgendaOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default NetworkDiagramButtons;
