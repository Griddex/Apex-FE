import { Typography, Button, makeStyles } from "@material-ui/core";
import { groupBy } from "lodash";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  persistNetworkElementsAction,
  saveAndAutoGenerateNetworkRequestAction,
} from "../../../Network/Redux/Actions/NetworkActions";
import ConnectFlowstationsToTerminal from "../../../Network/Utils/ConnectFlowstationsToTerminal";
import ConnectManifoldsToStations from "../../../Network/Utils/ConnectManifoldsToStations";
import ConnectWellheadsToManifolds from "../../../Network/Utils/ConnectWellheadsToManifolds";
import ConnectWellheadSummariesToManifolds from "../../../Network/Utils/ConnectWellheadSummariesToManifolds";
import GenerateFlowstationNodes from "../../../Network/Utils/GenerateFlowstationNodes";
import GenerateGasFacilityNodes from "../../../Network/Utils/GenerateGasFacilityNodes";
import GenerateManifoldNodes from "../../../Network/Utils/GenerateManifoldNodes";
import GenerateTerminalNodes from "../../../Network/Utils/GenerateTerminalNodes";
import GenerateWellheadNodes from "../../../Network/Utils/GenerateWellheadNodes";
import GenerateWellheadSummaryNodes from "../../../Network/Utils/GenerateWellheadSummaryNodes";
import SplitFlowstationsGasFacilities from "../../../Network/Utils/SplitFlowstationsGasFacilities";
import { saveInputDeckRequestAction } from "../../Redux/Actions/ImportActions";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import ControlCameraOutlinedIcon from "@material-ui/icons/ControlCameraOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import { IAllWorkflowProcesses } from "./../../../Application/Components/Workflows/WorkflowTypes";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 350,
    width: "100%",
    marginLeft: 5,
  },
  dialogButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 300,
    width: "100%",
    "& > *": {
      height: 50,
      // width: 0.98 * theme.breakpoints.width("md"),
      width: "95%",
      boxShadow: theme.shadows[1],
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const ForecastInputDeckFinalization = ({
  workflowProcess,
}: {
  workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"];
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const wc = "importDataWorkflows";
  const wp = workflowProcess;
  const { tableData: inputDeckData, success } = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
  );
  const { subModuleName } = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { facilitiesInputDeckTitle } = useSelector(
    (state: RootState) => state.inputReducer
  );

  const { showWellheadSummaryNodes, showWellheadSummaryEdges } = useSelector(
    (state: RootState) => state.networkReducer
  );

  if (success) {
    enqueueSnackbar(`${subModuleName} saved`, {
      persist: false,
      variant: "success",
    });
  }

  const buttonsData: ButtonProps[] = [
    {
      title: "Save Deck Only",
      color: "primary",
      startIcon: <SaveOutlinedIcon />,
      handleAction: () => {
        dispatch(saveInputDeckRequestAction(wp));
      },
    },
    {
      title: "Save and Automatically Generate Network",
      color: "primary",
      startIcon: <ControlCameraOutlinedIcon />,
      handleAction: () => {
        dispatch(saveAndAutoGenerateNetworkRequestAction(workflowProcess));
      },
    },
    {
      title: "Save and Manually Generate Network",
      color: "primary",
      startIcon: <DeviceHubOutlinedIcon />,
      handleAction: () => {
        enqueueSnackbar(`${subModuleName} saved`, {
          persist: false,
          variant: "success",
        });

        history.push("/apex/network");
      },
    },
    {
      title: "Save and Link Deck to Existing Network",
      color: "primary",
      startIcon: <LinkOutlinedIcon />,
      handleAction: () => {
        enqueueSnackbar(`${subModuleName} saved`, {
          persist: false,
          variant: "error",
        });
      },
    },
  ];

  return (
    <div className={classes.root}>
      <AnalyticsComp
        title="Associated Facilities Deck"
        direction="Vertical"
        content={<Typography>{facilitiesInputDeckTitle}</Typography>}
      />
      <div className={classes.dialogButtons}>
        {buttonsData.map((button, i) => (
          <Button
            key={i}
            variant={button.variant}
            color={button.color}
            onClick={button.handleAction}
            startIcon={button.startIcon}
          >
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ForecastInputDeckFinalization;
