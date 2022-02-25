import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useCallback } from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import DialogContextDrawer from "../../../Application/Components/Drawers/DialogContextDrawer";
import { ITitleAndDescriptionFormProps } from "../../../Application/Components/Forms/FormTypes";
import NavigationButtons from "../../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../../Application/Components/NavigationButtons/NavigationButtonTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import DialogVerticalWorkflowStepper from "../../../Application/Components/Workflows/DialogVerticalWorkflowStepper";
import WorkflowBanner from "../../../Application/Components/Workflows/WorkflowBanner";
import { TAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { workflowInitAction } from "../../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataRow,
  TUseState,
} from "../../../Application/Types/ApplicationTypes";
import { saveProductionPrioritizationRequestAction } from "../../Redux/Actions/NetworkActions";
import EditOrCreateProductionPrioritizationWorkflow from "../../Workflows/EditOrCreateProductionPrioritizationWorkflow";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export interface IEditOrCreateProductionPrioritization {
  currRow?: Partial<IStoredDataRow>;
  setCurrRow?: TUseState<IStoredDataRow>;
  currentRow?: Partial<IStoredDataRow>;
  setCurrentRow?: TUseState<IStoredDataRow>;
  workflowProcess?: TAllWorkflowProcesses;
  activeStep?: number;
  forecastParametersIndex?: number;
  steps: string[];
}

const declineParametersTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["declineParametersTitles"],
  (title) => title
);

const EditOrCreateProductionPrioritizationWorkflowDialog: React.FC<
  DialogStuff<IStoredDataRow>
> = (props) => {
  const workflowCategory = "networkDataWorkflows";
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    workflowProcess,
    currentRow,
    forecastParametersIndex,
  } = props;

  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const storedTitles = useSelector(declineParametersTitlesSelector);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [currRow, setCurrRow] = React.useState(currentRow);

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  const productionPrioritizationParametersObj = { ...currRow, ...titleDesc };

  let steps = [] as string[];

  if (workflowProcessDefined === "forecastParametersCreate") {
    steps = [
      "Select Forecast InputDeck",
      "Production Prioritization",
      "Title and Description",
    ];
  } else {
    steps = ["Production Prioritization", "Title and Description"];
  }

  const skipped = new Set<number>();

  const activeStepSelector = createDeepEqualSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcessDefined][
        "activeStep"
      ],
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

  const createProps = {
    shouldUpdate,
    setShouldUpdate,
    currRow,
    setCurrRow,
    activeStep,
    workflowProcess: workflowProcessDefined,
    forecastParametersIndex,

    title: formTitle,
    setTitle: setFormTitle,
    description: formDescription,
    setDescription: setFormDescription,
    storedTitles,
    steps,
  } as NonNullable<IEditOrCreateProductionPrioritization> &
    ITitleAndDescriptionFormProps;

  const saveSelectedProductionPrioritization = () => {
    return saveProductionPrioritizationRequestAction(
      productionPrioritizationParametersObj
    );
  };

  const createProductionPrioritizationConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Network_Dialog",
      title: "Confirm Parameters Save",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      iconType: "confirmation",
      dialogText: "Do you want to save the current production prioritization?",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, saveSelectedProductionPrioritization],
          "Save",
          "saveOutlined",
          false,
          "Some",
          2
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
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
    finalAction: createProductionPrioritizationConfirmation,
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
        workflowProcessDefined,
        workflowCategory
      )
    );
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
        <ApexFlexContainer>
          <EditOrCreateProductionPrioritizationWorkflow {...createProps} />
          <DialogContextDrawer>
            <DialogVerticalWorkflowStepper {...workflowProps} />
          </DialogContextDrawer>
        </ApexFlexContainer>
      </DialogContent>
      <DialogActions>
        <NavigationButtons {...navigationButtonProps} />
      </DialogActions>
    </Dialog>
  );
};

export default EditOrCreateProductionPrioritizationWorkflowDialog;
