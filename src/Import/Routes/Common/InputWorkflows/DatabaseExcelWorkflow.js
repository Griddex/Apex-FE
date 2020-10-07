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
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import WorkflowStepper from "../../../../Application/Components/Workflows/WorkflowStepper";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
  workflowSaveAction,
  workflowSkipAction,
} from "../../../../Application/Redux/Actions/WorkflowActions";
import SelectDatabase from "../../../Components/SelectDatabase";
import ConnectDatabase from "../Workflows/ConnectDatabase";
import Visualytics from "./../../../../Visualytics/Common/Visualytics";

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
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
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
      boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
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
  "Connect Database",
  "Upload File",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const DatabaseExcelWorkflow = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const skipped = new Set();
  const { showContextDrawer } = useSelector((state) => state.layoutReducer);
  const activeStep = useSelector((state) => state.workflowReducer.activeStep);
  const applicationData = useSelector((state) => state.applicationReducer);
  const { moduleName, subModuleName, workflowName } = applicationData;

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  const data = { skipped, isStepSkipped, activeStep, steps, errorSteps: [] };
  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderImportStep(activeStep) {
    switch (activeStep) {
      case 0:
        return <ConnectDatabase />;
      case 1:
        return <Visualytics />;

      default:
        return <h1>No view</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <Container className={classes.workflowHeaderRow} fixed disableGutters>
        <Box className={classes.workflowBanner}>
          <Typography variant="subtitle1">{`${activeStep + 1}/${
            steps.length
          }`}</Typography>
        </Box>
        <Box className={classes.workflowBannerHeader}>
          <Typography variant="subtitle1">{`${moduleName} `}</Typography>
          <Typography variant="subtitle1">{` | ${subModuleName}`}</Typography>
          <Typography variant="subtitle1" color="primary">
            {` | ${workflowName}`}
          </Typography>
        </Box>
      </Container>
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
        <ContextDrawer data={data}>
          {(props) => <WorkflowStepper {...props} />}
        </ContextDrawer>
      )}
      <div className={classes.navigationbuttons}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(workflowResetAction(0))}
          className={classes.button}
          startIcon={<RotateLeftIcon />}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
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
              <DoneAllIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default DatabaseExcelWorkflow;
