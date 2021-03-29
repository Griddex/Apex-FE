import { Button, makeStyles } from "@material-ui/core";
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
import ModuleCard from "../../../Application/Components/Cards/ModuleCard";
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
import { saveInputDeckRequestAction } from "../../Redux/Actions/ImportActions";
import { IAllWorkflowProcesses } from "./../../../Application/Components/Workflows/WorkflowTypes";

const useStyles = makeStyles(() => ({
  dialogButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    "& > *": {
      height: 120,
      width: "45%",
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

  if (success) {
    enqueueSnackbar(`${subModuleName} saved`, {
      persist: false,
      variant: "success",
    });
  }

  const saveForecastInputdeck = (
    workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
  ) => {
    const saveForecastInputdeckConfirmation = () => {
      const dialogParameters: DialogStuff = {
        name: "Save_Forecast_Inputdeck_Confirmation_Dialog",
        title: "Save Forecast Inputdeck Confirmation",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        iconType: "confirmation",
        dialogText: `Do you want to save the 
          current Forecast Inputdeck?`,
        actionsList: () =>
          DialogSaveCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () => saveInputDeckRequestAction(workflowProcess),
            ]
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(dialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_InputDeck_Dialog",
      title: "Save Forecast Inputdeck",
      type: "saveForecastInputDeckDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "select",
      workflowProcess,
      workflowCategory: "importDataWorkflows",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, saveForecastInputdeckConfirmation]
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveForecastInputdeckAndGenerateNetwork = (
    workflowProcess: IAllWorkflowProcesses["wrkflwPrcss"]
  ) => {
    const dialogParameters: DialogStuff = {
      name: "Existing_Network_Dialog",
      title: "Save Forecast Inputdeck | Generate Network",
      type: "saveInputDeckGenerateNetworkWorkflowDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "select",
      workflowProcess,
      workflowCategory: "importDataWorkflows",
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
        dispatch(hideDialogAction());
        saveForecastInputdeckAndGenerateNetwork(workflowProcess);
      },
    },
    {
      title: "Save and Manually Generate Network",
      color: "primary",
      variant: "contained",
      startIcon: <DeviceHubOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(hideDialogAction());
        enqueueSnackbar(`${subModuleName} saved`, {
          persist: false,
          variant: "success",
        });

        history.push("/apex/network");
      },
    },
    // {
    //   title: "Save and Link Deck to Existing Network",
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
      {buttonsData.map((button, i) => {
        const { startIcon, handleAction, title } = button;

        return (
          <MiniCard
            key={title}
            icon={startIcon as IMiniCardProps["icon"]}
            moduleAction={handleAction as IMiniCardProps["moduleAction"]}
            title={title as IMiniCardProps["title"]}
            // cardWidth={100}
          />
        );
      })}
    </div>
  );
};

export default ForecastInputDeckFinalization;
