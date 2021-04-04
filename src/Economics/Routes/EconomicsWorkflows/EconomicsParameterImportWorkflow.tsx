import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import SelectWorksheetDialog from "../../../Application/Components/Dialogs/SelectWorksheetDialog";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import VerticalWorkflowStepper from "../../../Application/Components/Workflows/VerticalWorkflowStepper";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
} from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import MatchHeaders from "../../../Import/Routes/Common/Workflows/MatchHeaders";
import MatchUnits from "../../../Import/Routes/Common/Workflows/MatchUnits";
import PreviewSave from "../../../Import/Routes/Common/Workflows/PreviewSave";
import SelectHeaderUnitData from "../../../Import/Routes/Common/Workflows/SelectHeaderUnitData";
import SelectSheet from "../../../Import/Routes/Common/Workflows/SelectSheet";
import {
  IAllWorkflowProcesses,
  IEconomicsWorkflowProcess,
} from "./../../../Application/Components/Workflows/WorkflowTypes";

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

const EconomicsParameterImportWorkflow = ({ dialogText }: DialogStuff) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "economicsDataWorkflows" as IEconomicsWorkflowProcess["wkCy"];
  const wp = "economicsParameterImportWorkflow" as IEconomicsWorkflowProcess["wkPs"];

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[wc][wp]
  );
  const { moduleName, subModuleName, workflowName } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const isStepOptional: () => boolean = useCallback(() => activeStep === 50, [
    activeStep,
  ]);
  const isStepSkipped: (step: number) => boolean = useCallback(
    (step) => skipped.has(step as number),
    [skipped]
  );

  const steps: string[] =
    dialogText === "singleSheetFile" ? stepsSingleSheet : stepsMultiSheet;

  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);
  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };
  const VerticalWorkflowStepperProps = {
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
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped, wp, wc));
  }, [dispatch]);

  const props = {
    wrkflwCtgry: wc,
    wrkflwPrcss: wp,
  };

  function renderSingleSheetWorkflow(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <SelectSheet {...props} />;
      case 1:
        return <SelectHeaderUnitData {...props} />;
      case 2:
        return <MatchHeaders {...props} />;
      case 3:
        return <MatchUnits {...props} />;
      case 4:
        return <PreviewSave {...props} />;
      default:
        return <h1>End</h1>;
    }
  }

  function renderMultiSheetWorkflow(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <SelectWorksheetDialog workflowProcess={wp} workflowCategory={wc} />
        );
      case 1:
        return <SelectSheet {...props} />;
      case 2:
        return <SelectHeaderUnitData {...props} />;
      case 3:
        return <MatchHeaders {...props} />;
      case 4:
        return <MatchUnits {...props} />;
      case 5:
        return <PreviewSave {...props} />;
      default:
        return <h1>End</h1>;
    }
  }

  const finalAction = () => {
    console.log("Economics Parameter Import");
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: true,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    workflowProps,
    workflowProcess: wp,
    workflowCategory: wc,
  };

  const renderWorkflow =
    dialogText === "singleSheetFile"
      ? renderSingleSheetWorkflow
      : renderMultiSheetWorkflow;

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>{renderWorkflow(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <VerticalWorkflowStepper {...VerticalWorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <NavigationButtons {...navigationButtonProps} />
    </div>
  );
};

export default EconomicsParameterImportWorkflow;
