import { Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import dialogIcons from "../../../Application/Components/Icons/DialogIcons";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { saveInputDeckRequestAction } from "../../Redux/Actions/ImportActions";
import SaveForecastInputDeckWorkflow from "../../Routes/Common/InputWorkflows/SaveForecastInputDeckWorkflow";

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
  const classes = useStyles(props);
  const { iconType, children, onClose, ...other } = props;

  return (
    <MuiDialogTitle className={classes.root} {...other} disableTypography>
      <div className={classes.dialogHeader}>
        <div className={classes.mainIcon}>
          {dialogIcons[iconType ? iconType : "select"]}
        </div>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={onClose}
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

const steps = [
  "Select Facilities Deck",
  "Input Title and Description",
  "Finalize",
];

const SaveForecastInputDeckWorkflowDialog = (props: DialogStuff) => {
  const dispatch = useDispatch();

  const { title, show, maxWidth, iconType } = props;

  const skipped = new Set<number>();

  // const wc = workflowCategory as IImportWorkflowProcess["wrkflwCtgry"];
  // const wp = workflowProcess as IImportWorkflowProcess["wrkflwPrcss"];
  const wc = "importDataWorkflows";
  const { workflowProcess } = props as {
    workflowProcess: NonNullable<IAllWorkflowProcesses["wrkflwPrcss"]>;
  };
  const wp = workflowProcess as NonNullable<
    IAllWorkflowProcesses["wrkflwPrcss"]
  >;

  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[wc][wp]
  );
  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  // if (success) {
  //   enqueueSnackbar(`${getInputWorkflowlabel[wp]} saved`, {
  //     persist: false,
  //     variant: "success",
  //   });
  // }

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const finalAction = React.useCallback(() => {
    dispatch(saveInputDeckRequestAction(wp));
  }, [wp]);

  const existingProps = { activeStep, workflowProcess, finalAction };

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    workflowProps,
    workflowProcess,
    workflowCategory: wc,
  };

  // useEffect(() => {
  //   dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped, wp, wc));
  // }, [dispatch]);

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
      <DialogContent dividers>
        <SaveForecastInputDeckWorkflow {...existingProps} />
        <Divider />
      </DialogContent>
      <DialogActions>
        <NavigationButtons {...navigationButtonProps} />
      </DialogActions>
    </Dialog>
  );
};
export default SaveForecastInputDeckWorkflowDialog;
