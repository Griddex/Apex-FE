import { DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle"; // DialogTitleProps,
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import DialogIcons from "../../../Application/Components/Icons/DialogIcons";
import { IconNameType } from "../../../Application/Components/Icons/DialogIconsTypes";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { runForecastRequestAction } from "../../Redux/Actions/NetworkActions";
import RunForecastWorkflow from "../../Workflows/RunForecastWorkflow";

const useStyles = makeStyles((theme) => ({
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
  listDialogContent: { display: "flex", flexDirection: "column" },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
  avatar: {
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
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

const steps = ["Select Network", "Select Forecast Parameters"];
const workflowCategory = "networkDataWorkflows";
const workflowProcess = "networkGeneration";

const RunForecastWorkflowDialog = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, isDialog } = props;

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]
  );

  const isStepOptional = React.useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = React.useCallback(
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

  const finalAction = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Run_Forecast_Dialog",
      title: "Confirm Run Forecast",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: `Do you want to run the forecast using the current parameters?`,
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, runForecastRequestAction],
          "Run",
          "play",
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
    finalAction,
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

  if (isDialog) {
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
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            height: 650,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
          >
            <RunForecastWorkflow {...workflowProps} />
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
  }

  return (
    <ApexFlexContainer flexDirection="column">
      <WorkflowBanner
        activeStep={activeStep}
        steps={steps}
        subModuleName={title as string}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <RunForecastWorkflow {...workflowProps} />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>
        </div>
      </div>
      <div>
        <NavigationButtons {...navigationButtonProps} />
      </div>
    </ApexFlexContainer>
  );
};

export default RunForecastWorkflowDialog;
