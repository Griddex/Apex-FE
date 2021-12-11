import ControlCameraOutlinedIcon from "@mui/icons-material/ControlCameraOutlined";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import MiniCard, {
  IMiniCardProps,
} from "../../../Application/Components/Cards/MiniCard";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
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
import { confirmationDialogParameters } from "../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { saveInputDeckRequestAction } from "../../Redux/Actions/InputActions";
import { TfinalizationChoice } from "../Common/InputLayoutTypes";
import { TAllWorkflowProcesses } from "./../../../Application/Components/Workflows/WorkflowTypes";

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const subModuleNameSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer.subModuleName,
  (module) => module
);

const ForecastInputDeckFinalization = ({
  workflowProcess,
}: {
  workflowProcess: TAllWorkflowProcesses;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const reducer = "inputReducer";
  const wc = "inputDataWorkflows";
  const wp = workflowProcess;

  const successSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["success"],
    (success) => success
  );

  const success = useSelector(successSelector);

  const subModuleName = useSelector(subModuleNameSelector);

  if (success) {
    enqueueSnackbar(`${subModuleName} saved`, {
      persist: false,
      variant: "success",
    });
  }

  const saveForecastInputdeck = (
    workflowProcess: TAllWorkflowProcesses,
    finalizationChoice: TfinalizationChoice
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
            titleDesc as Record<string, string>,
            finalizationChoice
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
      actionsList: (titleDesc?: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () =>
              saveForecastInputdeckConfirmation(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          flag,
          "None"
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveForecastInputdeckAndGenerateNetwork = (
    workflowProcess: TAllWorkflowProcesses
  ) => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Network_Dialog",
      title: "Save Forecast Inputdeck",
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
        saveForecastInputdeck(wp, "save");
      },
    },
    {
      title: "Save and Automatically Generate Network",
      color: "primary",
      variant: "contained",
      startIcon: <ControlCameraOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        dispatch(hideDialogAction());
        saveForecastInputdeckAndGenerateNetwork(wp);
      },
    },
    {
      title: "Save and Manually Build Network",
      color: "primary",
      variant: "contained",
      startIcon: <DeviceHubOutlinedIcon fontSize="large" color="primary" />,
      handleAction: () => {
        saveForecastInputdeck(wp, "saveManual");

        // enqueueSnackbar(`${subModuleName} saved`, {
        //   persist: false,
        //   variant: "success",
        // });
      },
    },
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
