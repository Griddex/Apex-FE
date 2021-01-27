import { Button, makeStyles } from "@material-ui/core";
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
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

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
      type: "networkGenerationDialogWorkflow",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "network",
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
        Save Network
      </Button>
      <Button
        startIcon={<PlaylistPlayIcon />}
        variant="outlined"
        color="secondary"
        style={{ height: "28px" }}
        onClick={() => existingNetworksExtrude(dispatch)}
      >
        Existing Networks
      </Button>
      <Button
        startIcon={<PlaylistPlayIcon />}
        variant="outlined"
        color="primary"
        style={{ height: "28px" }}
        onClick={() => generateNetwork()}
      >
        Generate Network
      </Button>
      <Button
        startIcon={<PlayArrowIcon />}
        variant="outlined"
        color="secondary"
        style={{ height: "28px" }}
        onClick={() => existingNetworksExtrude(dispatch)}
      >
        Run Forecast
      </Button>
      <Button
        startIcon={<MapOutlinedIcon />}
        variant="outlined"
        color="primary"
        style={{ height: "28px" }}
        onClick={() => setShowMiniMap(!showMiniMap)}
      >
        Toggle Minimap
      </Button>
      <Button
        startIcon={<ViewAgendaOutlinedIcon />}
        variant="outlined"
        color="default"
        style={{ height: "28px" }}
        onClick={() => setShowControls(!showControls)}
      >
        Toggle Controls
      </Button>
    </div>
  );
};

export default NetworkDiagramIcons;
