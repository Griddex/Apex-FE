import { makeStyles } from "@material-ui/core";
import ControlCameraOutlinedIcon from "@material-ui/icons/ControlCameraOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MiniCard, {
  IMiniCardProps,
} from "../../../Application/Components/Cards/MiniCard";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { updateNetworkParameterAction } from "../../../Network/Redux/Actions/NetworkActions";
import { saveInputDeckRequestAction } from "../../Redux/Actions/InputActions";
import { IAllWorkflows } from "./../../../Application/Components/Workflows/WorkflowTypes";
import { confirmationDialogParameters } from "../../../Import/Components/DialogParameters/ConfirmationDialogParameters";

const useStyles = makeStyles(() => ({
  dialogButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    "& > *": {
      height: 200,
      width: "45%",
      margin: 10,
    },
  },
}));

const ForecastInputDeckFinalization = ({
  workflowProcess,
}: {
  workflowProcess: IAllWorkflows["wrkflwPrcss"];
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const reducer = "inputReducer";
  const wc = "inputDataWorkflows";
  const wp = workflowProcess;
  const { success } = useSelector((state: RootState) => state[reducer][wc][wp]);
  const { subModuleName } = useSelector(
    (state: RootState) => state.applicationReducer
  );
  if (success) {
    enqueueSnackbar(`${subModuleName} saved`, {
      persist: false,
      variant: "success",
    });
  }

  const saveForecastInputdeck = (
    workflowProcess: IAllWorkflows["wrkflwPrcss"]
  ) => {
    const saveForecastInputdeckConfirmation = (
      titleDesc: Record<string, string>
    ) => {
      const dps = confirmationDialogParameters(
        "ForecastDeck_Save_Confirmation",
        "Forecast Deck Save Confirmation",
        "textDialog",
        `Do you want to save the current forecast Inputdeck?`,
        false,
        true,
        () =>
          saveInputDeckRequestAction(
            workflowProcess,
            titleDesc as Record<string, string>
          ),
        "Save",
        "saveOutlined"
      );

      dispatch(showDialogAction(dps));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_InputDeck_Dialog",
      title: "Save Forecast Inputdeck",
      type: "saveForecastInputDeckDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "save",
      workflowProcess,
      workflowCategory: "inputDataWorkflows",
      actionsList: (titleDesc?: Record<string, string>) =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveForecastInputdeckConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          false,
          "None"
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveForecastInputdeckAndGenerateNetwork = (
    workflowProcess: IAllWorkflows["wrkflwPrcss"]
  ) => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Network_Dialog",
      title: "Save Forecast Inputdeck | Generate Network",
      type: "saveInputDeckGenerateNetworkWorkflowDialog",
      show: true,
      exclusive: false,
      maxWidth: "md",
      iconType: "save",
      workflowProcess,
      workflowCategory: "inputDataWorkflows",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const buttonsData: ButtonProps[] = [
    {
      title: "Save Deck Only",
      color: "primary",
      variant: "contained",
      startIcon: <SaveOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(hideDialogAction());
        saveForecastInputdeck(wp);
      },
    },
    {
      title: "Save and Automatically Generate Network",
      color: "primary",
      variant: "contained",
      startIcon: <ControlCameraOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(updateNetworkParameterAction("isNetworkAuto", true));
        dispatch(hideDialogAction());
        saveForecastInputdeckAndGenerateNetwork(workflowProcess);
      },
    },
    {
      title: "Save and Manually Build Network",
      color: "primary",
      variant: "contained",
      startIcon: <DeviceHubOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(updateNetworkParameterAction("isNetworkAuto", false));
        dispatch(hideDialogAction());
        enqueueSnackbar(`${subModuleName} saved`, {
          persist: false,
          variant: "success",
        });

        dispatch(
          updateNetworkParameterAction("loadNetworkGenerationWorkflow", true)
        );

        history.push("/apex/network/networkManual");
      },
    },
    // {
    //   title: "Save and Link Deck to Stored Network",
    //   color: "primary",
    //   variant: "contained",
    //   startIcon: <LinkOutlinedIcon />,
    //   handleAction: () => {
    //     dispatch(hideDialogAction());
    //     enqueueSnackbar(`${subModuleName} saved`, {
    //       persist: false,
    //       variant: "error",
    //     });
    //   },
    // },
  ];

  return (
    <div className={classes.dialogButtons}>
      {buttonsData.map((button) => {
        const { startIcon, handleAction, title } = button;

        return (
          <MiniCard
            key={title}
            icon={startIcon as IMiniCardProps["icon"]}
            moduleAction={handleAction as IMiniCardProps["moduleAction"]}
            title={title as IMiniCardProps["title"]}
          />
        );
      })}
    </div>
  );
};

export default ForecastInputDeckFinalization;
