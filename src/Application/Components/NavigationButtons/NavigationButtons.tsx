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
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      border: `2px solid`,
      boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
    },
  },
}));

type isStepSkippedType = (step: number) => boolean;
//Too many renders?
//Try react.memo
//Usecallback for finalaction?
const NavigationButtons = ({
  mainNav,
  showReset,
  showBack,
  showSkip,
  showNext,
  finalAction,
  workflowProcess,
}: INavigationButtonsProp) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  } = useSelector(
    (state: RootState) =>
      state.workflowReducer["allWorkflows"][workflowProcess as string]
  ) as IWorkflowProcessState;
  console.log(
    "Logged output --> ~ file: NavigationButtons.tsx ~ line 64 ~ steps",
    steps
  );

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
