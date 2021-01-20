import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SelectWorksheetDialog from "../../../Application/Components/Dialogs/SelectWorksheetDialog";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import WorkflowStepper from "../../../Application/Components/Workflows/WorkflowStepper";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  workflowInitAction,
  workflowResetAction,
  workflowBackAction,
  workflowNextAction,
} from "../../../Application/Redux/Actions/WorkflowActions";
import MatchHeaders from "../../../Import/Routes/Common/Workflows/MatchHeaders";
import MatchUnits from "../../../Import/Routes/Common/Workflows/MatchUnits";
import PreviewSave from "../../../Import/Routes/Common/Workflows/PreviewSave";
import SelectHeaderUnitData from "../../../Import/Routes/Common/Workflows/SelectHeaderUnitData";
import SelectSheet from "../../../Import/Routes/Common/Workflows/SelectSheet";
import { IWorkflowProcessState } from "../../../Application/Redux/State/WorkflowStateTypes";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  button: {
    // width: 55,
    // height: 45,
    marginRight: theme.spacing(1),
  },
  buttonContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg:first-child": { width: 15, height: 15 },
    "& p:last-child": { fontSize: 12, fontWeight: "bold" },
  },
  workflowHeaderRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "5%",
    margin: 0,
    "& > *": { height: "60%" },
  },
  workflowBanner: {
    display: "flex",
    justifyContent: "center",
    width: 54,
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    // borderRadius: theme.spacing(0),
    // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    "& > *": { fontWeight: "bold" },
  },
  workflowBannerHeader: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 6,
    "& > *": { fontWeight: "bold" },
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      padding: theme.spacing(0.5),
      height: 40,
      width: 50,
      // border: "1.5px solid",
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

//Props for excel workflow from forecasting or facilities
const stepsSingleSheet = [
  "Select Worksheet",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const stepsMultiSheet = [
  "Worksheet Dialog",
  "Select Worksheet",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const EconomicsParameterImportWorkflow = (props: DialogStuff) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const workflowProcess = "economicsParameterImportWorkflow";

  const { dialogText } = props;
  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[workflowProcess]
  );
  const { moduleName, subModuleName, workflowName } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const isStepOptional: () => boolean = useCallback(() => activeStep === 50, [
    activeStep,
  ]);
  const isStepSkipped: (step: number) => boolean = useCallback(
    (step) => skipped.has(step as number),
    [skipped]
  );

  const steps: string[] =
    dialogText === "singleSheetFile" ? stepsSingleSheet : stepsMultiSheet;

  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);
  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };
  const WorkflowStepperProps = {
    moduleName,
    subModuleName,
    workflowName,
    skipped,
    isStepSkipped,
    activeStep,
    steps,
    errorSteps: [],
  };

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(steps, isStepOptional, isStepSkipped, workflowProcess)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderSingleSheetWorkflow(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <SelectSheet workflowProcess={workflowProcess as string} />;
      case 1:
        return (
          <SelectHeaderUnitData workflowProcess={workflowProcess as string} />
        );
      case 2:
        return <MatchHeaders workflowProcess={workflowProcess as string} />;
      case 3:
        return <MatchUnits workflowProcess={workflowProcess as string} />;
      case 4:
        return <PreviewSave workflowProcess={workflowProcess as string} />;
      default:
        return <h1>End</h1>;
    }
  }

  function renderMultiSheetWorkflow(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <SelectWorksheetDialog workflowProcess={workflowProcess as string} />
        );
      case 1:
        return <SelectSheet workflowProcess={workflowProcess as string} />;
      case 2:
        return (
          <SelectHeaderUnitData workflowProcess={workflowProcess as string} />
        );
      case 3:
        return <MatchHeaders workflowProcess={workflowProcess as string} />;
      case 4:
        return <MatchUnits workflowProcess={workflowProcess as string} />;
      case 5:
        return <PreviewSave workflowProcess={workflowProcess as string} />;
      default:
        return <h1>End</h1>;
    }
  }

  const renderWorkflow =
    dialogText === "singleSheetFile"
      ? renderSingleSheetWorkflow
      : renderMultiSheetWorkflow;

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>{renderWorkflow(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <WorkflowStepper {...WorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <div className={classes.navigationbuttons}>
        <RotateLeftIcon
          onClick={() => dispatch(workflowResetAction(0, workflowProcess))}
        />
        <ArrowBackIosIcon
          onClick={() =>
            dispatch(workflowBackAction(activeStep, workflowProcess))
          }
        />
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => {
            const dialogParameters: DialogStuff = {
              name: "Manage_Deck_Dialog",
              title: `Manage ${subModuleName}`,
              type: "finalizeInputDialog",
              show: true,
              exclusive: true,
              maxWidth: "sm",
              iconType: "information",
            };

            activeStep === steps.length - 1
              ? dispatch(showDialogAction(dialogParameters))
              : dispatch(
                  workflowNextAction(
                    skipped,
                    isStepSkipped,
                    activeStep,
                    steps,
                    "Loading...",
                    workflowProcess
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
      </div>
    </div>
  );
};

export default EconomicsParameterImportWorkflow;
