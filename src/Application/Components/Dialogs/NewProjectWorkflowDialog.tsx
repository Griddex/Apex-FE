import { DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../../Project/Components/DialogParameters/ProjectSuccessFailureDialogsParameters";
import { createNewProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import NewProjectWorkflow from "../../../Project/Workflows/NewProjectWorkflow";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import { workflowInitAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogSaveCancelButtons from "../DialogButtons/DialogSaveCancelButtons";
import DialogContextDrawer from "../Drawers/DialogContextDrawer";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../Workflows/DialogVerticalWorkflowStepper";
import WorkflowDialogBanner from "../Workflows/WorkflowDialogBanner";
import { DialogStuff } from "./DialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    height: 48,
  },
  dialogHeader: {
    display: "flex",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "5%",
    height: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  closeButton: {
    color: theme.palette.grey[500],
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

const steps = ["Choose Unit Settings", "New Project Title & Description"];
const workflowCategory = "projectDataWorkflows";
const workflowProcess = "newProjectWorkflow";

const NewProjectWorkflowDialog = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType } = props;

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]
  );
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

  const { projectTitle, projectDescription, pressureAddend } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  );

  const finalAction = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Create_New_Project_Dialog",
      title: "Create New Project Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to create the new project?",
      iconType: "confirmation",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, true],
          [
            () =>
              createNewProjectAction(
                projectTitle,
                projectDescription,
                dayFormat,
                monthFormat,
                yearFormat,
                pressureAddend,
                successDialogParameters,
                failureDialogParameters
              ),
            unloadDialogsAction,
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    finalNavIcon: () => <SaveOutlinedIcon />,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  React.useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess,
        workflowCategory
      )
    );
  }, [dispatch]);

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
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <WorkflowDialogBanner activeStep={activeStep} steps={steps} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <NewProjectWorkflow activeStep={activeStep} />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>
        </div>
      </DialogContent>
      <DialogActions>
        <NavigationButtons {...navigationButtonProps} />
      </DialogActions>
    </Dialog>
  );
};

export default NewProjectWorkflowDialog;
