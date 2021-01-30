import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import NavigationButtons from "../../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import TabsWrapper from "../../../../Application/Components/Tabs/TabsWrapper";
import WorkflowBanner from "../../../../Application/Components/Workflows/WorkflowBanner";
import WorkflowStepper from "../../../../Application/Components/Workflows/WorkflowStepper";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { workflowInitAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
// import MatchHeaders from "../Workflows/MatchHeaders";
// import MatchUnits from "../Workflows/MatchUnits";
// import PreviewSave from "../Workflows/PreviewSave";
// import SelectHeaderUnitData from "../Workflows/SelectHeaderUnitData";
// import SelectSheet from "../Workflows/SelectSheet";
// import UploadFile from "../Workflows/UploadFile";

const UploadFile = React.lazy(() => import("../Workflows/UploadFile"));
const SelectSheet = React.lazy(() => import("../Workflows/SelectSheet"));
const SelectHeaderUnitData = React.lazy(
  () => import("../Workflows/SelectHeaderUnitData")
);

const PreviewSave = React.lazy(() => import("../Workflows/PreviewSave"));
const MatchUnits = React.lazy(() => import("../Workflows/MatchUnits"));
const MatchHeaders = React.lazy(() => import("../Workflows/MatchHeaders"));

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
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
  },
}));

//Props for excel workflow from forecasting or facilities
const steps = [
  "Upload File",
  "Select Worksheet",
  "Map Headers, Units and Data",
  "Match Headers",
  "Match Units",
  "Preview & Save",
];

const ExcelWorkflow = ({
  workflowCategory,
  workflowProcess,
  finalAction,
}: IAllWorkflowProcesses) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  const WorkflowBannerProps = {
    activeStep,
    steps,
    moduleName,
    subModuleName,
    workflowName,
  };

  const WorkflowStepperProps = {
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

  useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess as IAllWorkflowProcesses["workflowProcess"],
        workflowCategory
      )
    );
  }, [dispatch]);

  const props = {
    workflowCategory,
    workflowProcess,
  };

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <UploadFile {...props} />;
      case 1:
        return <SelectSheet {...props} />;
      case 2:
        return (
          <TabsWrapper>
            <SelectHeaderUnitData {...props} />
          </TabsWrapper>
        );
      case 3:
        return (
          <TabsWrapper>
            <MatchHeaders {...props} />
          </TabsWrapper>
        );
      case 4:
        return (
          <TabsWrapper>
            <MatchUnits {...props} />
          </TabsWrapper>
        );
      case 5:
        return (
          <TabsWrapper>
            <PreviewSave {...props} />
          </TabsWrapper>
        );
      default:
        return <h1>End</h1>;
    }
  }

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: true,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>{renderImportStep(activeStep)}</div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => <WorkflowStepper {...WorkflowStepperProps} />}
        </ContextDrawer>
      )}
      <NavigationButtons {...navigationButtonProps} />
    </div>
  );
};

export default ExcelWorkflow;
