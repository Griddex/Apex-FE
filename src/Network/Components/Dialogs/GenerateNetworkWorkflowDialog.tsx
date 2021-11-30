import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useCallback, useEffect } from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogGenerateNetworkCancelButtons from "../../../Application/Components/DialogButtons/DialogGenerateNetworkCancelButtons";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { autoGenerateNetworkRequestAction } from "../../Redux/Actions/NetworkActions";
import GenerateNetworkWorkflow from "../../Workflows/GenerateNetworkWorkflow";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const steps = ["Select Facilities InputDeck", "Select Forecast InputDeck"];
const workflowCategory = "networkDataWorkflows";
const workflowProcess = "networkGeneration";

const GenerateNetworkWorkflowDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType } = props;

  const skipped = new Set<number>();

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]["activeStep"],
    (activeStep) => activeStep
  );

  const activeStep = useSelector(activeStepSelector);

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback(
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
      name: "Generate_Network_Dialog",
      title: "Confirm Network Generation",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: `Do you want to generate the 
      production network diagram with the current parameters?`,
      iconType: "confirmation",
      actionsList: () =>
        DialogGenerateNetworkCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, autoGenerateNetworkRequestAction]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const navigationButtonProps: INavigationButtonsProp = {
    isMainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess,
        workflowCategory
      )
    );
  }, [dispatch]);

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
          <GenerateNetworkWorkflow {...workflowProps} />
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
};

export default GenerateNetworkWorkflowDialog;
