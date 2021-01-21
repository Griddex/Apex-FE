import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SkipNextOutlinedIcon from "@material-ui/icons/SkipNextOutlined";
import { Typography } from "@material-ui/core";

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

const MainNavigationButtons = ({
  showReset, //In
  showBack, //In
  showSkip, //In
  showNext, //In
  workflowResetAction, //from import
  workflowBackAction, //from import
  workflowSkipAction, //from import
  workflowNextAction, //from import
  activeStep, //Use workflow process to access from store
  steps, //Use workflow process to access from store
  isStepOptional, //Use workflow process to access from store
  skipped, //Use workflow process to access from store
  isStepSkipped, //Use workflow process to access from store
  workflowProcess, //In
}: INavigationButtonsProp) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //1.

  const {
    projectName,
    projectDescription,
    dateFormat,
    pressureAddend,
  } = useSelector((state: RootState) => state.projectReducer);

  const newProjectDialogActions = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Okay",
        variant: "outlined",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  const successDialogParameters: DialogStuff = {
    name: "New_Project_Success_Dialog",
    title: "New Project Success",
    type: "textDialog",
    show: true,
    exclusive: true,
    maxWidth: "xs",
    dialogText: "New Project Creation Successful",
    iconType: "success",
    actionsList: () => newProjectDialogActions(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };

  const failureDialogParameters: DialogStuff = {
    name: "New_Project_Failure_Dialog",
    title: "New Project Failure",
    type: "textDialog",
    show: true,
    exclusive: true,
    maxWidth: "xs",
    dialogText: "New Project Creation failure",
    iconType: "error",
    actionsList: () => newProjectDialogActions(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };

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
            <Typography>{"Reset"}</Typography>
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
            <Typography>{"Back"}</Typography>
          </div>
        </Button>
      )}
      {showSkip && isStepOptional(activeStep) && (
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
            <Typography>{"Skip"}</Typography>
          </div>
        </Button>
      )}
      {showNext && (
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => {
            activeStep === steps.length - 1
              ? finalAction && dispatch(finalAction(...finalActionArgs))
              : workflowNextAction &&
                dispatch(
                  workflowNextAction(
                    skipped,
                    isStepSkipped,
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
              <Typography>{"Finalize"}</Typography>
            </div>
          ) : (
            <div className={classes.buttonContent}>
              <ArrowForwardIosIcon />
              <Typography>{"Next"}</Typography>
            </div>
          )}
        </Button>
      )}
    </div>
  );
};

export default MainNavigationButtons;
