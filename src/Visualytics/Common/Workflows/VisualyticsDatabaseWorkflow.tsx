import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router-dom";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import VerticalWorkflowStepper from "../../../Application/Components/Workflows/VerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import { IOnlyWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import SelectDatabase from "../../../Import/Components/SelectDatabase";
import ConnectDatabase from "../../../Import/Routes/Common/Workflows/ConnectDatabase";
import MatchHeaders from "../../../Import/Routes/Common/Workflows/MatchHeaders";
import MatchUnits from "../../../Import/Routes/Common/Workflows/MatchUnits";

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
  "Preview & Save",
];

const VisualyticsDatabaseWorkflow = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
}: IOnlyWorkflows) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[wc][wp]
  );
  const applicationData = useSelector(
    (state: RootState) => state.applicationReducer
  );
  const { moduleName, subModuleName, workflowName } = applicationData;

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
    reducer,
  };

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <ConnectDatabase {...props} />;
      case 1:
        return <UploadFile {...props} />;
      case 2:
        return <SelectHeaderUnitData {...props} />;
      case 3:
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
        message="Are you sure you want to leave?"
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

export default VisualyticsDatabaseWorkflow;
