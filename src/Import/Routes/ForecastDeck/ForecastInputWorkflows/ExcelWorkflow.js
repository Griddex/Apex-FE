import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
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
import MatchHeaders from "../../Common/Workflows/MatchHeaders";
import MatchUnits from "./MatchUnits";
import PreviewSave from "./PreviewSave";
import SelectHeaderUnitData from "./SelectHeaderUnitData";
import SelectSheet from "./SelectSheet";
import UploadFile from "./UploadFile";

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
    flexDirection: "column",
    height: "90%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  navigationbuttons: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": { border: `2px solid` },
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

const ExcelWorkflow = () => {
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
        return <UploadFile />;
      case 1:
        return <SelectSheet />;
      case 2:
        return <SelectHeaderUnitData />;
      case 3:
        return <MatchHeaders />;
      case 4:
        return <MatchUnits />;
      case 5:
        return <PreviewSave />;
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
      <div className={classes.workflowBody}>{renderImportStep(activeStep)}</div>
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

export default ExcelWorkflow;
