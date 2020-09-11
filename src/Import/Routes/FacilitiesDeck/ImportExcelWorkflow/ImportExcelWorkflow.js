import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles, fade } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/ContextDrawer";
// import ImportExcelMatch from "./ImportExcelMatch";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
  workflowSaveAction,
  workflowSkipAction,
} from "../../../../Application/Redux/Actions/WorkflowActions";
import WorkflowStepper from "./../../../../Application/Components/WorkflowStepper";
import ImportExcelDnD from "./ImportExcelDnD";
import ImportExcelParseTable from "./ImportExcelParseTable";
import ImportExcelPreview from "./ImportExcelPreview";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ImportExcelSelectWorksheet from "./ImportExcelSelectWorksheet";

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
    alignItems: "flex-end",
    height: "5%",
  },
  workflowBanner: {
    display: "flex",
    justifyContent: "center",
    width: 54,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 0, 1, 1),
    // borderRadius: theme.spacing(0),
    marginLeft: 6,
    boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
  },
  workflowBannerHeader: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 6,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "space-evenly", //around, between
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

const ImportExcelWorkflow = () => {
  const isStepOptional = useCallback(() => activeStep === 50, [steps]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [steps]);
  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped));
  }, [steps, isStepOptional, isStepSkipped]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const skipped = new Set();
  const { showContextDrawer } = useSelector((state) => state.layoutReducer);
  const activeStep = useSelector((state) => state.workflowReducer.activeStep);
  const applicationData = useSelector((state) => state.applicationReducer);
  const { moduleName, subModuleName, workflowName } = applicationData;
  const data = { skipped, isStepSkipped, activeStep, steps, errorSteps: [] };

  function renderImportStep(activeStep) {
    switch (activeStep) {
      case 0:
        return <ImportExcelDnD />;
      case 1:
        return <ImportExcelSelectWorksheet />;
      case 2:
        return <ImportExcelParseTable />;
      case 3:
        return <ImportExcelPreview />;
      case 4:
        // return < ImportExcelMatch />;
        return <h1>4th route</h1>;
      default:
        return <h1>No view</h1>;
    }
  }

  return (
    <div className={classes.root}>
      <Container
        className={classes.workflowHeaderRow}
        maxWidth="md"
        fixed
        disableGutters
      >
        <Box className={classes.workflowBanner}>
          <Typography variant="subtitle2">{`${activeStep + 1}/${
            steps.length
          }`}</Typography>
        </Box>
        <Box className={classes.workflowBannerHeader}>
          <Typography variant="subtitle2">{`${moduleName} `}</Typography>
          <Typography variant="subtitle2">{` > ${subModuleName}`}</Typography>
          <Typography variant="subtitle2" color="primary">
            {` > ${workflowName}`}
          </Typography>
        </Box>
      </Container>
      <div className={classes.workflowBody}>{renderImportStep(activeStep)}</div>
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
