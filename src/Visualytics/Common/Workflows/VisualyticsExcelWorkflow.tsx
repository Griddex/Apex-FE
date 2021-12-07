import makeStyles from "@mui/styles/makeStyles";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router-dom";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { WorkBook, utils } from "xlsx";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import VerticalWorkflowStepper from "../../../Application/Components/Workflows/VerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import { IOnlyWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const ContextDrawer = React.lazy(
  () => import("../../../Application/Components/Drawers/ContextDrawer")
);
const VisualyticsPreviewSave = React.lazy(
  () => import("../../Routes/VisualyticsPreviewSave")
);
const UploadFile = React.lazy(
  () => import("../../../Import/Routes/Common/Workflows/UploadFile")
);
const SelectSheet = React.lazy(
  () => import("../../../Import/Routes/Common/Workflows/SelectSheet")
);
const SelectHeaderUnitData = React.lazy(
  () => import("../../../Import/Routes/Common/Workflows/SelectHeaderUnitData")
);
const PreviewSave = React.lazy(
  () => import("../../../Import/Routes/Common/Workflows/PreviewSave")
);

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
    flexDirection: "column",
    height: "90%",
    width: "97%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const steps = [
  "Upload File",
  "Select Worksheet",
  "Map Headers, Units and Data",
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

const VisualyticsExcelWorkflow = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
  hasExtraComponent,
  extraComponent,
}: IOnlyWorkflows) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const skipped = new Set<number>();

  const showContextDrawer = useSelector(showContextDrawerSelector);

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) => state.workflowReducer[wc][wp]["activeStep"],
    (activeStep) => activeStep
  );

  const activeStep = useSelector(activeStepSelector);

  const { moduleName, subModuleName, workflowName } =
    useSelector(applicationSelector);

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  const [inputWorkbook, setInputWorkbook] = React.useState({} as WorkBook);

  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };

  const VerticalWorkflowStepperProps = {
    activeStep,
    steps,
    skipped,
    isStepSkipped,
    moduleName,
    subModuleName,
    workflowName,
    errorSteps: [],
  };

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const props = {
    wrkflwCtgry: wc,
    wrkflwPrcss: wp,
    reducer,
    inputWorkbook,
    setInputWorkbook,
  };

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <UploadFile
            {...props}
            hasExtraComponent={hasExtraComponent}
            extraComponent={extraComponent}
          />
        );
      case 1:
        return <SelectSheet {...props} />;
      case 2:
        return <SelectHeaderUnitData {...props} />;
      case 3:
        return <VisualyticsPreviewSave {...props} />;
      default:
        return <h1>End</h1>;
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

  React.useEffect(() => {
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped, wp, wc));
  }, [dispatch]);

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
      <div className={classes.workflowBody}>{renderImportStep(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <VerticalWorkflowStepper {...VerticalWorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <NavigationButtons {...navigationButtonProps} />
    </div>
  );
};

export default VisualyticsExcelWorkflow;
