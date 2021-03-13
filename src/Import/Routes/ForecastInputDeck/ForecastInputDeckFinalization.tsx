import { Button, makeStyles, Typography } from "@material-ui/core";
import ControlCameraOutlinedIcon from "@material-ui/icons/ControlCameraOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { saveAndAutoGenerateNetworkRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import { saveInputDeckRequestAction } from "../../Redux/Actions/ImportActions";
import { IAllWorkflowProcesses } from "./../../../Application/Components/Workflows/WorkflowTypes";

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
  const { success } = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
  );
  const { subModuleName } = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { facilitiesInputDeckTitle } = useSelector(
    (state: RootState) => state.inputReducer
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
      variant: "contained",
      startIcon: <SaveOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
        dispatch(saveInputDeckRequestAction(wp));
      },
    },
    {
      title: "Save and Automatically Generate Network",
      color: "primary",
      variant: "contained",
      startIcon: <ControlCameraOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
        dispatch(saveAndAutoGenerateNetworkRequestAction(workflowProcess));
      },
    },
    {
      title: "Save and Manually Generate Network",
      color: "primary",
      variant: "contained",
      startIcon: <DeviceHubOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
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
      variant: "contained",
      startIcon: <LinkOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
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
