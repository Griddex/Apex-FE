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
import { RootState } from "../../../Application/Redux/Reducers/RootReducer";
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

  const { dialogText } = props;
  const skipped = new Set();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer
  );
  const { moduleName, subModuleName, workflowName } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  const steps =
    dialogText === "singleSheetFile" ? stepsSingleSheet : stepsMultiSheet;
  const data = { skipped, isStepSkipped, activeStep, steps, errorSteps: [] };
  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderSingleSheetWorkflow(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <SelectSheet />;
      case 1:
        return <SelectHeaderUnitData />;
      case 2:
        return <MatchHeaders />;
      case 3:
        return <MatchUnits />;
      case 4:
        return <PreviewSave />;
      default:
        return <h1>End</h1>;
    }
  }

  function renderMultiSheetWorkflow(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <SelectWorksheetDialog />;
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
        return <h1>End</h1>;
    }
  }

  const renderWorkflow =
    dialogText === "singleSheetFile"
      ? renderSingleSheetWorkflow
      : renderMultiSheetWorkflow;

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
      <div className={classes.workflowBody}>{renderWorkflow(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer data={data}>
          {(props: JSX.IntrinsicAttributes) => <WorkflowStepper {...props} />}
        </ContextDrawer>
      )}
      <div className={classes.navigationbuttons}>
        <RotateLeftIcon onClick={() => dispatch(workflowResetAction(0))} />
        <ArrowBackIosIcon
          onClick={() => dispatch(workflowBackAction(activeStep))}
        />
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => {
            const dialogParameters = {
              name: "Manage_Deck_Dialog",
              title: `Manage ${subModuleName}`,
              type: "finalizeInputDialog",
              show: true,
              exclusive: true,
              maxWidth: "sm",
              iconType: "information",
              iconColor: theme.palette.primary.main,
            };

            activeStep === steps.length - 1
              ? dispatch(showDialogAction(dialogParameters))
              : dispatch(
                  workflowNextAction(
                    skipped,
                    isStepSkipped,
                    activeStep,
                    steps,
                    "Loading..."
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
