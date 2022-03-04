import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { runForecastRequestAction } from "../../Redux/Actions/NetworkActions";
import RunForecastWorkflow from "../../Workflows/RunForecastWorkflow";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const steps = ["Select Network", "Select Forecast Parameters"];
const workflowCategory = "networkDataWorkflows";
const workflowProcess = "networkGeneration";

const activeStepSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.workflowReducer[workflowCategory][workflowProcess]["activeStep"],
  (activeStep) => activeStep
);

const selectedNetworkIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedNetworkId,
  (data) => data
);
const selectedForecastingParametersIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedForecastingParametersId,
  (data) => data
);

const RunForecastWorkflowDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, isDialog } = props;

  const skipped = new Set<number>();

  const activeStep = useSelector(activeStepSelector);
  const selectedNetworkId = useSelector(selectedNetworkIdSelector);
  const selectedForecastingParametersId = useSelector(
    selectedForecastingParametersIdSelector
  );

  const isStepOptional = React.useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = React.useCallback(
    (step: number) => skipped.has(step),
    [skipped]
  );

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const finalAction = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Run_Forecast_Dialog",
      title: "Confirm Run Forecast",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: `Do you want to run the forecast using the current parameters?`,
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, runForecastRequestAction],
          "Run",
          "play",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const nextDisableds = {
    0: selectedNetworkId,
    1: selectedForecastingParametersId,
  } as Record<number, string>;

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    isNavButtonDisabled: {
      reset: false,
      skip: false,
      back: activeStep === 0 ? true : false,
      next: nextDisableds[activeStep] ? false : true,
    },
    finalAction,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  React.useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess,
        workflowCategory
      )
    );
  }, []);

  if (isDialog) {
    return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={show as boolean}
        maxWidth={maxWidth}
        fullWidth
      >
        <DialogTitle
          onClose={() => dispatch(hideDialogAction())}
          iconType={iconType}
        >
          <WorkflowBanner
            activeStep={activeStep}
            steps={steps}
            subModuleName={title as string}
            showChip={true}
          />
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            height: 650,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
          >
            <RunForecastWorkflow {...workflowProps} />
            <DialogContextDrawer>
              <DialogVerticalWorkflowStepper {...workflowProps} />
            </DialogContextDrawer>
          </div>
        </DialogContent>
        <DialogActions>
          <NavigationButtons {...navigationButtonProps} />
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <ApexFlexContainer flexDirection="column">
      <WorkflowBanner
        activeStep={activeStep}
        steps={steps}
        subModuleName={title as string}
        showChip={true}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <RunForecastWorkflow {...workflowProps} />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>
        </div>
      </div>
      <div>
        <NavigationButtons {...navigationButtonProps} />
      </div>
    </ApexFlexContainer>
  );
};

export default RunForecastWorkflowDialog;
