import makeStyles from "@mui/styles/makeStyles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import NavigationButtons from "../../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import VerticalWorkflowStepper from "../../../../Application/Components/Workflows/VerticalWorkflowStepper";
import WorkflowBanner from "../../../../Application/Components/Workflows/WorkflowBanner";
import { IExcelOrDatabaseWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { workflowInitAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";

const ContextDrawer = React.lazy(
  () => import("../../../../Application/Components/Drawers/ContextDrawer")
);
const SelectDatabase = React.lazy(
  () => import("../../../Components/SelectDatabase")
);
const ConnectDatabase = React.lazy(
  () => import("../Workflows/ConnectDatabase")
);
const MatchHeaders = React.lazy(() => import("../Workflows/MatchHeaders"));
const MatchUnits = React.lazy(() => import("../Workflows/MatchUnits"));
const PreviewSave = React.lazy(() => import("../Workflows/PreviewSave"));
const SelectHeaderUnitData = React.lazy(
  () => import("../Workflows/SelectHeaderUnitData")
);
const UploadFile = React.lazy(() => import("../Workflows/UploadFile"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "row",
    height: "90%",
    width: "97%",
    alignItems: "center",
    justifyContent: "center", //around, between
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
  workflowContent: { height: "100%", width: "100%" },
}));

const steps = [
  "Connect Database",
  "Upload File",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (reducer) => reducer
);

const applicationSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer,
  (reducer) => reducer
);

const DatabaseWorkflow = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
  storedConnections,
}: IExcelOrDatabaseWorkflows) => {
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;
  const skipped = new Set<number>();
  const StoredConnections = storedConnections as JSX.Element;

  const classes = useStyles();
  const dispatch = useDispatch();

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) => state.workflowReducer[wc][wp]["activeStep"],
    (activeStep) => activeStep
  );
  const { moduleName, subModuleName, workflowName } =
    useSelector(applicationSelector);

  const showContextDrawer = useSelector(showContextDrawerSelector);
  const activeStep = useSelector(activeStepSelector);

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback(
    (step: number) => skipped.has(step),
    [skipped]
  );

  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
    showChip: true,
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
  }, []);

  const props = {
    wrkflwCtgry: wc,
    wrkflwPrcss: wp,
    reducer,
  };

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return StoredConnections;
      case 1:
        return <UploadFile {...props} />;
      case 2:
        return <SelectHeaderUnitData {...props} />;
      case 3:
        return <MatchHeaders {...props} />;
      case 4:
        return <MatchUnits {...props} />;
      case 5:
        return <PreviewSave {...props} />;
      default:
        return <h1>No view</h1>;
    }
  }

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: true,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    isNavButtonDisabled: {
      reset: false,
      skip: false,
      back: activeStep === 0 ? true : false,
      next: false,
    },
    finalAction,
    workflowProps,
    workflowProcess: wp,
    workflowCategory: wc,
  };

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <Prompt
        when={activeStep < steps.length}
        message={(location, action) => {
          return location.pathname.startsWith("/apex")
            ? true
            : `Are you sure you want to go to ${location.pathname}?`;
        }}
      />
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
          {() => <VerticalWorkflowStepper {...VerticalWorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <NavigationButtons {...navigationButtonProps} />
    </div>
  );
};

export default DatabaseWorkflow;
