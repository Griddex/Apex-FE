import { Button, Hidden, makeStyles } from "@material-ui/core";
import React from "react";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { useDispatch, useSelector } from "react-redux";
import existingNetworksExtrude from "../DialogExtrusion/ExistingNetworksExtrude";
import saveNetworkExtrude from "../DialogExtrusion/SaveNetworkExtrude";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import { INetworkDiagramIcons } from "./NetworkDiagramIconsTypes";
import networkReducer from "./../../Redux/Reducers/NetworkReducers";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import DialogOkayCancelButtons from "../../../Application/Components/DialogButtons/DialogOkayCancelButtons";
import { runForecastRequestAction } from "../../Redux/Actions/ForecastingActions";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";

const useStyles = makeStyles(() => ({
  networkContentIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #E7E7E7",
    height: 28,
  },
  CanvasWidget: { height: "100%", backgroundColor: "#FFF" },
}));

const NetworkDiagramIcons = (props: INetworkDiagramIcons) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { showMiniMap, setShowMiniMap, showControls, setShowControls } = props;

  const generateNetwork = () => {
    const dialogParameters: DialogStuff = {
      name: "Generate_Network_Dialog",
      title: "Generate Network",
      type: "networkGenerationWorkflowDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "network",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const runForecast = () => {
    const dialogParameters: DialogStuff = {
      name: "Forecasting_Parameters_Dialog",
      title: "Select Forecasting Parameters",
      type: "runForecastDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "information",
      actionsList: () =>
        DialogOkayCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, runForecastRequestAction]
        ),
      // dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const existingNetworks = () => {
    const dialogParameters: DialogStuff = {
      name: "Existing_Network_Dialog",
      title: "Existing Network",
      type: "existingNetworksDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "select",
      actionsList: () =>
        DialogOkayButton([true], [true], [unloadDialogsAction]),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const existingForecastParameters = () => {
    const dialogParameters: DialogStuff = {
      name: "Existing_Forecast_Parameters_Dialog",
      title: "Existing Forecast Parameters Dialog",
      type: "existingForecastingParametersDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "information",
      actionsList: () =>
        DialogOkayCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, runForecastRequestAction]
        ),
      // dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <div className={classes.networkContentIcons}>
      <Button
        startIcon={<SaveOutlinedIcon />}
        variant="outlined"
        color="secondary"
        style={{ height: "28px" }}
        onClick={() => saveNetworkExtrude(dispatch)}
      >
        <Hidden mdDown>Save Network</Hidden>
      </Button>
      <Button
        startIcon={<PlaylistPlayIcon />}
        variant="outlined"
        color="secondary"
        style={{ height: "28px" }}
        onClick={() => existingNetworks()}
      >
        <Hidden mdDown>Existing Networks</Hidden>
      </Button>
      <Button
        startIcon={<PlaylistPlayIcon />}
        variant="outlined"
        color="primary"
        style={{ height: "28px" }}
        onClick={() => generateNetwork()}
      >
        <Hidden mdDown>Generate Network</Hidden>
      </Button>
      <Button
        startIcon={<PlayArrowIcon />}
        variant="outlined"
        color="secondary"
        style={{ height: "28px" }}
        onClick={() => runForecast()}
      >
        <Hidden mdDown>Run Forecast</Hidden>
      </Button>
      <Button
        startIcon={<PlayArrowIcon />}
        variant="outlined"
        color="secondary"
        style={{ height: "28px" }}
        onClick={() => existingForecastParameters()}
      >
        <Hidden mdDown>Existing Forecast Parameters</Hidden>
      </Button>
      <Button
        startIcon={<MapOutlinedIcon />}
        variant="outlined"
        color="primary"
        style={{ height: "28px" }}
        onClick={() => setShowMiniMap(!showMiniMap)}
      >
        <Hidden mdDown>Toggle Minimap</Hidden>
      </Button>
      <Button
        startIcon={<ViewAgendaOutlinedIcon />}
        variant="outlined"
        color="default"
        style={{ height: "28px" }}
        onClick={() => setShowControls(!showControls)}
      >
        <Hidden mdDown>Toggle Controls</Hidden>
      </Button>
    </div>
  );
};

export default NetworkDiagramIcons;
