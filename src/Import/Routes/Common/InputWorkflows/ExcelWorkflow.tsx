import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router-dom";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import NavigationButtons from "../../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import VerticalWorkflowStepper from "../../../../Application/Components/Workflows/VerticalWorkflowStepper";
import WorkflowBanner from "../../../../Application/Components/Workflows/WorkflowBanner";
import { IOnlyWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { workflowInitAction } from "../../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { updateEconomicsParameterAction } from "../../../../Economics/Redux/Actions/EconomicsActions";
import * as xlsx from "xlsx";
import isEqual from "react-fast-compare";

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
    width: "97%",
    alignItems: "center",
    justifyContent: "center",
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

const ExcelWorkflow = ({
  reducer,
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
  hasExtraComponent,
  extraComponent,
}: IOnlyWorkflows) => {
  console.log("I'm in excel workflowwwwwwwwwwwwwww");
  const classes = useStyles();
  const dispatch = useDispatch();
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const skipped = new Set<number>();
  const { showContextDrawer } = useSelector(
    (state: RootState) => {
      const { showContextDrawer } = state.layoutReducer;
      return { showContextDrawer };
    },
    (prev, next) => isEqual(prev, next)
  );
  const { activeStep } = useSelector(
    (state: RootState) => {
      const { activeStep } = state.workflowReducer[wc][wp];
      return { activeStep };
    },
    (prev, next) => isEqual(prev, next)
  );
  const { currentDevOption, developmentScenariosCompleted } = useSelector(
    (state: RootState) => {
      const { currentDevOption, developmentScenariosCompleted } =
        state[reducer][wc][wp];
      return { currentDevOption, developmentScenariosCompleted };
    },
    (prev, next) => isEqual(prev, next)
  );
  const { moduleName, subModuleName, workflowName } = useSelector(
    (state: RootState) => {
      const { moduleName, subModuleName, workflowName } =
        state.applicationReducer;
      return { moduleName, subModuleName, workflowName };
    },
    (prev, next) => isEqual(prev, next)
  );

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  const [inputWorkbook, setInputWorkbook] = React.useState({} as xlsx.WorkBook);

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
        return <MatchHeaders {...props} />;
      case 4:
        return <MatchUnits {...props} />;
      case 5:
        return <PreviewSave {...props} />;
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
    finalAction: () => {
      if (wp.includes("economicsCostsRevenues")) {
        dispatch(
          updateEconomicsParameterAction(
            `inputDataWorkflows.${wp}.developmentScenariosCompleted`,
            [...developmentScenariosCompleted, currentDevOption?.value]
          )
        );
      }
      finalAction && finalAction();
    },
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
        // message="Are you sure you want to leave?"
        message={(location, action) => {
          console.log(
            "Logged output --> ~ file: DatabaseWorkflow.tsx ~ line 174 ~ action",
            action
          );
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

export default React.memo(ExcelWorkflow);
