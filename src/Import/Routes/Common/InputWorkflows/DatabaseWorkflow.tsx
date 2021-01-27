import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import NavigationButtons from "../../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import WorkflowBanner from "../../../../Application/Components/Workflows/WorkflowBanner";
import WorkflowStepper from "../../../../Application/Components/Workflows/WorkflowStepper";
import { IWorkflowProcess } from "../../../../Application/Components/Workflows/WorkflowTypes";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
  workflowSaveAction,
  workflowSkipAction,
} from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import SelectDatabase from "../../../Components/SelectDatabase";
import ConnectDatabase from "../Workflows/ConnectDatabase";
import MatchHeaders from "../Workflows/MatchHeaders";
import MatchUnits from "../Workflows/MatchUnits";
import PreviewSave from "../Workflows/PreviewSave";
import SelectHeaderUnitData from "../Workflows/SelectHeaderUnitData";
import UploadFile from "../Workflows/UploadFile";

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
  "Connect Database",
  "Upload File",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const DatabaseWorkflow = ({ workflowProcess }: IWorkflowProcess) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowCategory = "inputDataWorkflows";

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]
  );
  const applicationData = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { moduleName, subModuleName, workflowName } = applicationData;

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  const data = { skipped, isStepSkipped, activeStep, steps, errorSteps: [] };
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

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess as string,
        workflowCategory
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <ConnectDatabase workflowProcess={workflowProcess as string} />;
      case 1:
        return <UploadFile workflowProcess={workflowProcess as string} />;
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
        return <h1>No view</h1>;
    }
  }

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: true,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: () => console.log("DatabaseWorkflow"),
    workflowProps,
    workflowProcess,
  };

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
      <NavigationButtons {...navigationButtonProps} />
    </div>
  );
};

export default DatabaseWorkflow;
