import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle"; // DialogTitleProps,
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import NewProjectWorkflow from "../../../Project/Workflows/NewProjectWorkflow";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import { workflowInitAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import DialogContextDrawer from "../Drawers/DialogContextDrawer";
import DialogIcons from "../Icons/DialogIcons";
import { IconNameType } from "../Icons/DialogIconsTypes";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../Workflows/WorkflowBanner";
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
    <MuiDialogTitle className={classes.root} {...other} >
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
            size="large">
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

  const storedTitles = useSelector(
    (state: RootState) =>
      state.applicationReducer["allFormTitles"]["projectTitles"]
  );
  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [disable, setDisable] = React.useState(false);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

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

  const finalAction = (titleDesc: Record<string, string>) => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Create_Project_Dialog",
      title: "Create Project Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to create the new project?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, () => createProjectAction(titleDesc, true)],
          "Create",
          "createOutlined",
          false,
          "All"
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
    nextOrFinalDisabled: disable,
    finalAction: () => finalAction(titleDesc),
    finalNavIcon: () => <SaveOutlinedIcon />,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  React.useEffect(() => {
    console.log("hey");
  }, [disable]);

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
          <NewProjectWorkflow
            activeStep={activeStep}
            // title={formTitle}
            setTitle={setFormTitle}
            // description={formDescription}
            setDescription={setFormDescription}
            setDisable={setDisable}
            storedTitles={storedTitles}
          />
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
