import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import WorkflowStepper from "../../../Application/Components/Workflows/WorkflowStepper";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
  workflowSaveAction,
  workflowSkipAction,
} from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SelectDatabase from "../../../Import/Components/SelectDatabase";
import EconomicCosts from "../EconomicCosts";
import EconomicsCalculations from "../EconomicsCalculations";
import EconomicsParameters from "../EconomicsParameters";
import SelectForecast from "../SelectForecast";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  button: {
    marginRight: theme.spacing(1),
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
    flexDirection: "row",
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  workflowDatabasePanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "95%",
    width: "20%",
    border: "1px solid #A8A8A8",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
    padding: 20,
  },
  workflowContent: { height: "100%", width: "90%" },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      border: `2px solid`,
      boxShadow: theme.shadows[2],
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

const steps = [
  "Select Forecast Run",
  "Import or Input Costs",
  "Input Economics Assumptions",
  "Calculate Indices [and Define Sensitivities]",
  "View Results",
];

const NetCashFlowWorkflow = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowProcess = "netCashFlowWorkflow";

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer["allExistingWorkflows"][workflowProcess]
  );
  const applicationData = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { moduleName, subModuleName, workflowName } = applicationData;

  const isStepOptional: (activeStep: number) => boolean = useCallback(
    (activeStep: number) => (activeStep as number) === 50,
    [activeStep]
  );
  const isStepSkipped: (step: number) => boolean = useCallback(
    (step: number) => skipped.has(step as number),
    [skipped]
  );

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

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <SelectForecast />;
      case 1:
        return <EconomicCosts />;
      case 2:
        return (
          <EconomicsParameters workflowProcess="netCashAnalysisWorkflow" />
        );
      case 3:
        return <EconomicsCalculations />;
      default:
        return <h1>No view</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>
        {activeStep === 2 && (
          <div className={classes.workflowDatabasePanel}>
            <SelectDatabase />
          </div>
        )}
        <div className={classes.workflowContent}>
          {renderImportStep(activeStep)}
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <WorkflowStepper {...WorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <div className={classes.navigationbuttons}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(workflowResetAction(0, workflowProcess))}
          className={classes.button}
          startIcon={<RotateLeftIcon />}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={() =>
            dispatch(workflowBackAction(activeStep, workflowProcess))
          }
          className={classes.button}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
        {isStepOptional(activeStep) && (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              dispatch(
                workflowSkipAction(isStepOptional, activeStep, workflowProcess)
              )
            }
            className={classes.button}
          >
            Skip
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            activeStep === steps
              ? dispatch(workflowSaveAction(workflowProcess))
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
          className={classes.button}
          endIcon={
            activeStep === steps.length - 1 ? (
              <DoneAllIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
        >
          {activeStep === steps.length - 1 ? "Finalize" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default NetCashFlowWorkflow;
