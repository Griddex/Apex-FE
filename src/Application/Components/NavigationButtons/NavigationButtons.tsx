import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { confirmationDialogParameters } from "../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { showDialogAction } from "../../Redux/Actions/DialogsAction";
import {
  workflowBackAction,
  workflowNextAction,
  workflowResetAction,
  workflowSkipAction,
} from "../../Redux/Actions/WorkflowActions";
import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import {
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../Workflows/WorkflowTypes";
import { INavigationButtonsProp } from "./NavigationButtonTypes";

const useStyles = makeStyles((theme) => ({
  button: (props: INavigationButtonsProp) => ({
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.25),
    height: props.isMainNav ? 30 : 30,
    width: props.isMainNav ? 90 : 40,
  }),
  buttonContent: (props: INavigationButtonsProp) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: props.isMainNav ? "space-evenly" : "center",
    alignItems: "center",
    width: "100%",
    "& svg:first-child": { width: 15, height: 15 },
    "& p:last-child": { fontSize: 12, fontWeight: "bold" },
  }),
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

type isStepSkippedType = (step: number) => boolean;

const NavigationButtons = (props: INavigationButtonsProp) => {
  const {
    isMainNav,
    showReset,
    showBack,
    showSkip,
    showNext,
    nextOrFinalDisabled,
    finalAction,
    finalNavIcon,
    workflowProps,
    workflowProcess,
    workflowCategory,
  } = props;

  const classes = useStyles(props);
  const dispatch = useDispatch();
  const wp = workflowProcess as TAllWorkflowProcesses;
  const wc = workflowCategory as TAllWorkflowCategories;

  const { activeStep, steps, isStepOptional, skipped, isStepSkipped } =
    workflowProps as IWorkflowProcessState;

  return (
    <div className={classes.navigationbuttons}>
      {showReset && (
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            const dialogParameters = confirmationDialogParameters(
              "Navigation_Reset_Confirmation",
              "Reset Confirmation",
              "textDialog",
              `Do you want to reset this workflow?. 
              You will lose all data up to current step.`,
              true,
              true,
              () => workflowResetAction(0, wp, wc),
              "Reset",
              "reset"
            );

            dispatch(showDialogAction(dialogParameters));
          }}
        >
          <div className={classes.buttonContent}>
            <div>
              <RotateLeftIcon />
            </div>
            <div>{isMainNav && <Typography>{"Reset"}</Typography>}</div>
          </div>
        </Button>
      )}
      {showBack && (
        <Button
          className={classes.button}
          variant="contained"
          color="inherit"
          disabled={activeStep === 0}
          onClick={() =>
            workflowBackAction &&
            dispatch(workflowBackAction(activeStep, wp, wc))
          }
        >
          <div className={classes.buttonContent}>
            <div>
              <ArrowBackIosIcon />
            </div>
            <div>{isMainNav && <Typography>{"Back"}</Typography>}</div>
          </div>
        </Button>
      )}
      {showSkip && isStepOptional && isStepOptional(activeStep) && (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() =>
            workflowSkipAction &&
            dispatch(workflowSkipAction(isStepOptional, activeStep, wp, wc))
          }
        >
          <div className={classes.buttonContent}>
            <div>
              <SkipNextOutlinedIcon />
            </div>
            <div>{isMainNav && <Typography>{"Skip"}</Typography>}</div>
          </div>
        </Button>
      )}
      {showNext && (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={nextOrFinalDisabled}
          onClick={() => {
            activeStep === steps.length - 1
              ? finalAction && finalAction()
              : workflowNextAction &&
                dispatch(
                  workflowNextAction(
                    skipped as Set<number>,
                    isStepSkipped as isStepSkippedType,
                    activeStep,
                    steps,
                    "Loading...",
                    wp,
                    wc
                  )
                );
          }}
        >
          {activeStep === steps.length - 1 ? (
            <div className={classes.buttonContent}>
              <div>{finalNavIcon ? finalNavIcon() : <DoneAllIcon />}</div>
              <div>{isMainNav && <Typography>{"Finalize"}</Typography>}</div>
            </div>
          ) : (
            <div className={classes.buttonContent}>
              <div>{isMainNav && <Typography>{"Next"}</Typography>}</div>
              <div>
                <ArrowForwardIosIcon />
              </div>
            </div>
          )}
        </Button>
      )}
    </div>
  );
};

export default React.memo(NavigationButtons);
