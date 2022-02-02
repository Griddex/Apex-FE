import makeStyles from "@mui/styles/makeStyles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import VerticalWorkflowStepper from "../../../Application/Components/Workflows/VerticalWorkflowStepper";
import { showContextDrawerAction } from "../../../Application/Redux/Actions/LayoutActions";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";

const EconomicsAnalyses = React.lazy(
  () => import("../EconomicsAnalyses/EconomicsAnalyses")
);
const StoredCostsAndRevenuesDecks = React.lazy(
  () =>
    import(
      "../EconomicsInput/EconomicsCostsAndRevenues/StoredCostsAndRevenuesDecks"
    )
);
const StoredEconomicsParametersDecks = React.lazy(
  () =>
    import(
      "../EconomicsInput/EconomicsParameters/StoredEconomicsParametersDecks"
    )
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
  workflowContent: { height: "100%", width: "100%" },
}));

const steps = [
  "Select Parameters & Assumptions",
  "Select Costs & Revenues",
  "Economics Analyses",
];

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (drawer) => drawer
);
const applicationSelector = createDeepEqualSelector(
  (state: RootState) => state.applicationReducer,
  (reducer) => reducer
);
const selectedEconomicsParametersInputDeckIdSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.selectedEconomicsParametersInputDeckId,
  (data) => data
);

const EconomicsAnalysesWorkflow = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reducer = "economicsReducer";
  const wc = "economicsDataWorkflows";
  const wp = "economicsAnalyses";

  const skipped = new Set<number>();

  const showContextDrawer = useSelector(showContextDrawerSelector);

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) => state.workflowReducer[wc][wp]["activeStep"],
    (reducer) => reducer
  );
  const selectedEconomicsParametersInputDeckId = useSelector(
    selectedEconomicsParametersInputDeckIdSelector
  );

  const activeStep = useSelector(activeStepSelector);

  const { moduleName, subModuleName, workflowName } =
    useSelector(applicationSelector);

  const isStepOptional = useCallback(() => activeStep === 50, [activeStep]);
  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

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

  React.useEffect(() => {
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped, wp, wc));
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  function renderImportStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <StoredEconomicsParametersDecks
            reducer={reducer}
            finalAction={() => {}}
            showChart={false}
          />
        );
      case 1:
        return (
          <StoredCostsAndRevenuesDecks
            reducer={reducer}
            finalAction={() => {}}
            showChart={false}
          />
        );
      case 2:
        return <EconomicsAnalyses />;
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
      next: selectedEconomicsParametersInputDeckId ? false : true,
    },
    finalAction: () => {
      const dialogParameters: DialogStuff = {
        name: "Finalize_EconomicsAnalysis_Dialog",
        title: `Finalize EconomicsAnalysis Dialog`,
        type: "economicsAnalysesFinalizationDialog",
        show: true,
        exclusive: true,
        maxWidth: "sm",
        iconType: "information",
        actionsList: () => DialogCancelButton(),
      };
      dispatch(showDialogAction(dialogParameters));
    },
    workflowProps,
    workflowProcess: wp,
    workflowCategory: wc,
  };

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody}>
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

export default EconomicsAnalysesWorkflow;
