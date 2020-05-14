import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import ImportExcel_1_DnD from "./ImportExcel_1_DnD";
import ImportExcel_2_Preview from "./ImportExcel_2_Preview";
import ImportExcel_3_Match from "./ImportExcel_3_Match";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { setStepperStepsAndActiveStep } from "../../../Redux/Actions/SetStepperActions";

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

function getSteps() {
  return [
    "Import Excel Drag and Drop",
    "Import Excel Preview",
    "Import Excel Match",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Import Excel Drag and Drop";
    case 1:
      return "Import Excel Preview";
    case 2:
      return "Import Excel Match";
  }
}

function ImportExcel(reduxProps) {
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const classes = useStyles();
  const Loading = useSelector((state) => state.ImportReducer.Loading);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function isStepOptional(step) {
    return step === 5;
  }

  function isStepFailed(step) {
    return step === 100;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(skipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(setStepperStepsAndActiveStep(steps, activeStep));
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  function handleSave() {}

  function renderImportStep(activeStep, reduxProps) {
    switch (activeStep) {
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
          {renderImportStep(activeStep, reduxProps)}
        </Container>
        <div className={classes.navigationbuttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            className={classes.button}
            startIcon={<RotateLeftIcon />}
          >
            Reset
          </Button>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
          {isStepOptional(activeStep) && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSkip}
              className={classes.button}
            >
              Skip
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              activeStep === steps ? handleSave() : handleNext();
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
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportExcel);
