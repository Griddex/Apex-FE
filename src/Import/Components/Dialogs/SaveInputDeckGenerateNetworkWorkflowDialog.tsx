import { Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogSaveAndGenerateNetworkCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveAndGenerateNetworkCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import DialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import WorkflowDialogBanner from "../../../Application/Components/Workflows/WorkflowDialogBanner";
import {
  IAllWorkflows,
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { saveAndAutoGenerateNetworkRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import SaveInputDeckGenerateNetworkWorkflow from "../../Routes/Common/InputWorkflows/SaveInputDeckGenerateNetworkWorkflow";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
  },
  dialogHeader: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "5%",
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
    width: "5%",
    height: "100%",
    padding: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: 0,
    },
  },
}));

const DialogTitle: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          <DialogIcons iconType={iconType as IconNameType} />
        </div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={() => {
              dispatch(hideSpinnerAction());
              onClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
  },
}))(MuiDialogActions);

const steps = ["Select Facilities Deck", "Save & Generate"];

const SaveInputDeckGenerateNetworkWorkflowDialog = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, workflowProcess } = props;

  const reducer = "inputReducer" as ReducersType;
  const wc = "inputDataWorkflows";
  const wp = workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const storedTitles = useSelector(
    (state: RootState) =>
      state.applicationReducer["allFormTitles"]["forecastTitles"]
  );

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  const formProps = {
    title: formTitle,
    setTitle: setFormTitle,
    description: formDescription,
    setDescription: setFormDescription,
    storedTitles,
  };

  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[wc][wp]
  );
  const skipped = new Set<number>();
  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback(
    (step: number) => skipped.has(step),
    [skipped]
  );

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const saveForecastInputdeckConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_Inputdeck_Generate_Network_Confirmation_Dialog",
      title: "Save Forecast Inputdeck + Generate Network Confirmation",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      iconType: "confirmation",
      dialogText: `Do you want to save the current Forecast 
        Inputdeck and then generate the network?`,
      actionsList: () =>
        DialogSaveAndGenerateNetworkCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () => saveAndAutoGenerateNetworkRequestAction(wp, titleDesc),
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedProps = {
    reducer,
    showChart: false,
    activeStep,
    workflowProcess: wp,
    finalAction: saveForecastInputdeckConfirmation,
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: saveForecastInputdeckConfirmation,
    workflowProps,
    workflowProcess: wp,
    workflowCategory: wc,
  };

  React.useEffect(() => {
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped, wp, wc));
  }, []);

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <WorkflowBanner
          activeStep={activeStep}
          steps={steps}
          subModuleName={title as string}
        />
      </DialogTitle>

      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <SaveInputDeckGenerateNetworkWorkflow
            {...storedProps}
            {...formProps}
          />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>{" "}
        </div>
      </DialogContent>
      <DialogActions>
        <NavigationButtons {...navigationButtonProps} />
      </DialogActions>
    </Dialog>
  );
};
export default SaveInputDeckGenerateNetworkWorkflowDialog;
