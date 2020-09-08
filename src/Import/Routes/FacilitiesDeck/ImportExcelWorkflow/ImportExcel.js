import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as StepperActions from "../../../Redux/Actions/SetStepperActions";
import ImportExcel_1_DnD from "./ImportExcel_1_DnD";
import ImportExcel_2_ParseTable from "./ImportExcel_2_ParseTable";
import ImportExcel_3_Preview from "./ImportExcel_3_Preview";
import ImportExcel_4_Match from "./ImportExcel_4_Match";

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
  "Import Excel Drag and Drop",
  "Import Excel Set Header & Units",
  "Import Excel Preview",
  "Import Excel Header Match",
];

const {
  workflowInitAction,
  workflowResetAction,
  workflowNextAction,
  workflowBackAction,
  workflowSkipAction,
  workflowSaveAction,
} = StepperActions;

function isStepOptional(step) {
  return step === 50;
}

function ImportExcel() {
  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(workflowInitAction("Facilities", "ImportExcel", steps));
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.importReducer.activeStep);

  function renderImportStep(activeStep) {
    switch (activeStep) {
      case 0:
        return <ImportExcel_1_DnD />;
      case 1:
        return <ImportExcel_2_ParseTable />;
      case 2:
        return <ImportExcel_3_Preview />;
      case 3:
        return <ImportExcel_4_Match />;
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.maincontent}>{renderImportStep(activeStep)}</div>
      <div className={classes.navigationbuttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(workflowResetAction("Facilities", "ImportExcel"))
          }
          className={classes.button}
          startIcon={<RotateLeftIcon />}
        >
          Reset
        </Button>
        <Button
          disabled={activeStep === 0}
          onClick={() =>
            dispatch(
              workflowBackAction("Facilities", "ImportExcel", activeStep)
            )
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
                workflowSkipAction("Facilities", "ImportExcel", activeStep)
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
              ? dispatch(workflowSaveAction())
              : dispatch(
                  workflowNextAction("Facilities", "ImportExcel", activeStep)
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
}

export default ImportExcel;
