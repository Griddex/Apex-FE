import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as StepperActions from "../../../Redux/Actions/SetStepperActions";
import ImportExcelDnD from "./ImportExcelDnD";
import ImportExcelParseTable from "./ImportExcelParseTable";
import ImportExcelPreview from "./ImportExcelPreview";
import ImportExcelMatch from "./ImportExcelMatch";
import WorkflowStepper from "./../../../../Application/Components/WorkflowStepper";
import ContextDrawer from "../../../../Application/Components/ContextDrawer";

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
  maincontent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
    padding: 0,
  },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
  "Upload File",
  "Select Worksheet",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const {
  workflowInitAction,
  workflowResetAction,
  workflowNextAction,
  workflowBackAction,
  workflowSkipAction,
  workflowSaveAction,
} = StepperActions;

const ImportExcelWorkflow = () => {
  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped));
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.workflowReducer.activeStep);
  const { showContextDrawer } = useSelector((state) => state.layoutReducer);
  const skipped = new Set();

  const data = { steps, activeStep, skipped, errorSteps: [] };

  function isStepOptional(step) {
    return step === 50;
  }

  // const isStepFailed = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function renderImportStep(activeStep) {
    switch (activeStep) {
      case 0:
        return <ImportExcelDnD />;
      case 1:
        return <ImportExcelParseTable />;
      case 2:
        return <ImportExcelPreview />;
      case 3:
        // return < ImportExcelMatch />;
        return <h1>4th route</h1>;
      default:
        return <h1>No view</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.maincontent}>{renderImportStep(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer data={data}>
          {(props) => <WorkflowStepper {...props} />}
        </ContextDrawer>
      )}
      <div className={classes.navigationbuttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(workflowResetAction(0))}
          className={classes.button}
          startIcon={<RotateLeftIcon />}
        >
          Reset
        </Button>
        <Button
          disabled={activeStep === 0}
          onClick={() => dispatch(workflowBackAction(activeStep))}
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
              dispatch(workflowSkipAction(isStepOptional, activeStep))
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
              ? dispatch(workflowSaveAction())
              : dispatch(
                  workflowNextAction(skipped, isStepSkipped, activeStep, steps)
                );
          }}
          className={classes.button}
          endIcon={
            activeStep === steps.length - 1 ? (
              <SaveIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
        >
          {activeStep === steps.length - 1 ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ImportExcelWorkflow;
