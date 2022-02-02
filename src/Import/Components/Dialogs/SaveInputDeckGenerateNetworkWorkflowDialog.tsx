import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useCallback } from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogSaveAndGenerateNetworkCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveAndGenerateNetworkCancelButtons";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { saveInputDeckRequestAction } from "../../Redux/Actions/InputActions";
import SaveInputDeckGenerateNetworkWorkflow from "../../Routes/Common/InputWorkflows/SaveInputDeckGenerateNetworkWorkflow";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const steps = ["Select Facilities Deck", "Save & Generate"];
const forecastTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["forecastTitles"],
  (title) => title
);

const SaveInputDeckGenerateNetworkWorkflowDialog: React.FC<DialogStuff> = (
  props
) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, workflowProcess } = props;

  const reducer = "inputReducer" as ReducersType;
  const wc = "inputDataWorkflows";
  const wp = workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const storedTitles = useSelector(forecastTitlesSelector);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [disable, setDisable] = React.useState(true);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  const formProps = {
    title: formTitle,
    setTitle: React.useCallback(setFormTitle, []),
    description: formDescription,
    setDescription: React.useCallback(setFormDescription, []),
    storedTitles,
  };

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) => state.workflowReducer[wc][wp]["activeStep"],
    (activeStep) => activeStep
  );

  const activeStep = useSelector(activeStepSelector);

  const skipped = new Set<number>();
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

  const saveForecastInputdeckConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_Inputdeck_Generate_Network_Confirmation_Dialog",
      title: "Save Forecast Inputdeck + Generate Network Confirmation",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      iconType: "confirmation",
      dialogText: `Do you want to save the current Forecast 
        Inputdeck and then generate the network?`,
      actionsList: () =>
        DialogSaveAndGenerateNetworkCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveInputDeckRequestAction(
                wp,
                titleDesc as Record<string, string>,
                "saveAuto"
              ),
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedProps = {
    reducer,
    showChart: false,
    activeStep,
    workflowProcess: wp,
    finalAction: saveForecastInputdeckConfirmation,
  };

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
      next: false,
    },
    finalAction: saveForecastInputdeckConfirmation,
    workflowProps,
    workflowProcess: wp,
    workflowCategory: wc,
  };

  React.useEffect(() => {
    dispatch(workflowInitAction(steps, isStepOptional, isStepSkipped, wp, wc));
  }, []);

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
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <SaveInputDeckGenerateNetworkWorkflow
            {...storedProps}
            {...formProps}
          />
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
export default SaveInputDeckGenerateNetworkWorkflowDialog;
