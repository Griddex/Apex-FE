import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SkipNextOutlinedIcon from "@material-ui/icons/SkipNextOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  workflowBackAction,
  workflowNextAction,
  workflowResetAction,
  workflowSkipAction,
} from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IWorkflowProcessState } from "../../Redux/State/WorkflowStateTypes";
import { INavigationButtonsProp } from "./NavigationButtonTypes";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  buttonContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg:first-child": { width: 15, height: 15 },
    "& p:last-child": { fontSize: 12, fontWeight: "bold" },
  },
  navigationbuttons: (props: INavigationButtonsProp) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      padding: theme.spacing(0.25),
      height: props.mainNav ? 40 : 30,
      width: props.mainNav ? 50 : 35,
    },
  }),
}));

type isStepSkippedType = (step: number) => boolean;

const NavigationButtons = (props: INavigationButtonsProp) => {
  const {
    mainNav,
    showReset,
    showBack,
    showSkip,
    showNext,
    finalAction,
    workflowProps,
    workflowProcess,
  } = props;
  const classes = useStyles(props);
  const dispatch = useDispatch();

  const {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  } = workflowProps as IWorkflowProcessState;

  return (
    <div className={classes.navigationbuttons}>
      {showReset && (
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={() =>
            workflowResetAction &&
            dispatch(workflowResetAction(0, workflowProcess as string))
          }
        >
          <div className={classes.buttonContent}>
            <RotateLeftIcon />
            {mainNav && <Typography>{"Reset"}</Typography>}
          </div>
        </Button>
      )}
      {showBack && (
        <Button
          className={classes.button}
          variant="outlined"
          disabled={activeStep === 0}
          onClick={() =>
            workflowBackAction &&
            dispatch(workflowBackAction(activeStep, workflowProcess as string))
          }
        >
          <div className={classes.buttonContent}>
            <ArrowBackIosIcon />
            {mainNav && <Typography>{"Back"}</Typography>}
          </div>
        </Button>
      )}
      {showSkip && isStepOptional && isStepOptional(activeStep) && (
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() =>
            workflowSkipAction &&
            dispatch(
              workflowSkipAction(
                isStepOptional,
                activeStep,
                workflowProcess as string
              )
            )
          }
        >
          <div className={classes.buttonContent}>
            <SkipNextOutlinedIcon />
            {mainNav && <Typography>{"Skip"}</Typography>}
          </div>
        </Button>
      )}
      {showNext && (
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => {
            console.log(
              "Logged output --> ~ file: NavigationButtons.tsx ~ line 135 ~ steps",
              steps
            );
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
                    workflowProcess as string
                  )
                );
          }}
        >
          {activeStep === steps.length - 1 ? (
            <div className={classes.buttonContent}>
              <DoneAllIcon />
              {mainNav && <Typography>{"Finalize"}</Typography>}
            </div>
          ) : (
            <div className={classes.buttonContent}>
              <ArrowForwardIosIcon />
              {mainNav && <Typography>{"Next"}</Typography>}
            </div>
          )}
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;