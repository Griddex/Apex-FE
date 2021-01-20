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

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
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

const SaveForecastParametersNavButtons = ({
  showReset,
  showBack,
  showSkip,
  showNext,
  workflowResetAction,
  workflowBackAction,
  workflowSkipAction,
  workflowNextAction,
  finalAction,
  activeStep,
  steps,
  isStepOptional,
  skipped,
  isStepSkipped,
  workflowProcess,
}: INavigationButtonsProp) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    title: "Save Forecasting Parameters Failure",
    type: "textDialog",
    show: true,
    exclusive: true,
    maxWidth: "xs",
    dialogText: "Save Forecasting Parameters failure",
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
          startIcon={<RotateLeftIcon />}
        >
          Reset
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
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      )}
      {showSkip && isStepOptional(activeStep) && (
        <Button
          className={classes.button}
          variant="contained"
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
          Skip
        </Button>
      )}
      {showNext && (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            activeStep === steps.length - 1
              ? finalAction &&
                dispatch(
                  finalAction(
                    projectName ?? "",
                    projectDescription ?? "",
                    dateFormat ?? "",
                    pressureAddend ?? 14.7,
                    successDialogParameters,
                    failureDialogParameters
                  )
                )
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
          endIcon={
            activeStep === steps.length - 1 ? (
              <DoneAllIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
        >
          {activeStep === steps.length - 1 ? "Create" : "Next"}
        </Button>
      )}
    </div>
  );
};

export default SaveForecastParametersNavButtons;
