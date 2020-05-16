import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImportExcel_1_DnD from "./ImportExcel_1_DnD";
import ImportExcel_2_Preview from "./ImportExcel_2_Preview";
import ImportExcel_3_Match from "./ImportExcel_3_Match";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import * as StepperActions from "../../../Redux/Actions/SetStepperActions";
import { loadWorkflowAction } from "./../../../../Application/Redux/Actions/UILayoutActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
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

const Steps = [
  "Import Excel Drag and Drop",
  "Import Excel Preview",
  "Import Excel Match",
];

const {
  handleWorkflowInitializeAction,
  handleResetAction,
  handleNextAction,
  handleBackAction,
  handleSkipAction,
  handleSaveAction,
} = StepperActions;

function isStepOptional(step) {
  return step === 5;
}

function ImportExcel() {
  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow

    dispatch(
      handleWorkflowInitializeAction("Facilities", "ImportExcel", Steps)
    );
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.ImportReducer.Loading);
  const ActiveStep = useSelector((state) => state.ImportReducer.ActiveStep);

  function renderImportStep(ActiveStep) {
    switch (ActiveStep) {
      case 0:
        return <ImportExcel_1_DnD />;
      case 1:
        return <ImportExcel_2_Preview />;
      case 2:
        return <ImportExcel_3_Match />;
    }
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={Loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxwidth="lg" className={classes.root}>
        <Container maxWidth="lg" className={classes.maincontent}>
          {renderImportStep(ActiveStep) || (
            <div>Oops...something went wrong</div>
          )}
        </Container>
        <div className={classes.navigationbuttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              dispatch(handleResetAction("Facilities", "ImportExcel"))
            }
            className={classes.button}
            startIcon={<RotateLeftIcon />}
          >
            Reset
          </Button>
          <Button
            disabled={ActiveStep === 0}
            onClick={() =>
              dispatch(
                handleBackAction("Facilities", "ImportExcel", ActiveStep)
              )
            }
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
          {isStepOptional(ActiveStep) && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                dispatch(
                  handleSkipAction("Facilities", "ImportExcel", ActiveStep)
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
              ActiveStep === Steps
                ? dispatch(handleSaveAction())
                : dispatch(
                    handleNextAction("Facilities", "ImportExcel", ActiveStep)
                  );
            }}
            className={classes.button}
            endIcon={
              ActiveStep === Steps.length - 1 ? (
                <SaveIcon />
              ) : (
                <ArrowForwardIosIcon />
              )
            }
          >
            {ActiveStep === Steps.length - 1 ? "Save" : "Next"}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default ImportExcel;
