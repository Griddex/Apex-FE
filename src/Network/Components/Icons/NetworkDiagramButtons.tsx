import { IconButton, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import React from "react";
import ChartButtons from "../../../Visualytics/Components/Menus/ChartButtons";
import ForecastButtonsMenu from "../Menus/ForecastButtonsMenu";
import NetworkButtonsMenu from "../Menus/NetworkButtonsMenu";
import { INetworkDiagramIcons } from "./NetworkDiagramIconsTypes";

const useStyles = makeStyles(() => ({
  networkContentIcons: {
    display: "flex",
    flexDirection: "row",
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

  const {
    showMiniMap,
    setShowMiniMap,
    showControls,
    setShowControls,
    componentRef,
  } = props;

  return (
    <div className={classes.networkContentIcons}>
      <NetworkButtonsMenu />
      <ForecastButtonsMenu />
      <Tooltip
        key={"miniMapToolTip"}
        title={"Minimap"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
          }}
          onClick={() => setShowMiniMap(!showMiniMap)}
        >
          <MapOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        key={"controlsToolTip"}
        title={"Controls"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
          }}
          onClick={() => setShowControls(!showControls)}
        >
          <ViewAgendaOutlinedIcon />
        </IconButton>
      </Tooltip>
      <ChartButtons
        showExtraButtons={false}
        componentRef={componentRef as React.MutableRefObject<any>}
      />
    </div>
  );
};

export default NetworkDiagramButtons;
