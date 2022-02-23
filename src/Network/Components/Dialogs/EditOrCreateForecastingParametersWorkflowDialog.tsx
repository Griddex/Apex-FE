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
import { saveForecastParametersRequestAction } from "../../Redux/Actions/NetworkActions";
import { IEditOrCreateForecastingParameters } from "../../Routes/EditOrCreateForecastingParameters";
import EditOrCreateForecastParametersWorkflow from "../../Workflows/EditOrCreateForecastParametersWorkflow";
import { IForecastParametersStoredRow } from "./StoredNetworksDialogTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const forecastingParametersTitlesSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.applicationReducer["allFormTitles"]["forecastingParametersTitles"],
  (title) => title
);

const EditOrCreateForecastingParametersWorkflowDialog: React.FC<
  DialogStuff<IForecastParametersStoredRow>
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
  console.log(
    "🚀 ~ file: EditOrCreateForecastingParametersWorkflowDialog.tsx ~ line 56 ~ workflowProcessDefined",
    workflowProcessDefined
  );

  const storedTitles = useSelector(forecastingParametersTitlesSelector);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [currRow, setCurrRow] = React.useState(currentRow);
  const [nextDisableds, setNextDisableds] = React.useState<
    Record<number, boolean>
  >({ 0: false, 1: false, 2: false });

  const titleDesc = {
    title: formTitle,
    description: formDescription,
  };

  const forecastingParametersObj = { ...currRow, ...titleDesc };

  let steps = [] as string[];
  if (workflowProcessDefined === "forecastParametersCreate") {
    steps = [
      "Select Forecast InputDeck",
      "Forecast Parameters",
      "Title and Description",
    ];
  } else {
    steps = ["Forecast Parameters", "Title and Description"];
  }
  console.log(
    "🚀 ~ file: EditOrCreateForecastingParametersWorkflowDialog.tsx ~ line 102 ~ steps",
    steps
  );

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

  const workflowBannerProps = {
    steps,
    activeStep,
    subModuleName: title as string,
    showChip: true,
  };

  const createProps = {
    currRow,
    setCurrRow,
    activeStep,
    workflowProcess: workflowProcessDefined,
    forecastParametersIndex,
    setNextDisableds,

    title: formTitle,
    setTitle: setFormTitle,
    description: formDescription,
    setDescription: setFormDescription,
    storedTitles,
    steps,
  } as NonNullable<IEditOrCreateForecastingParameters> &
    ITitleAndDescriptionFormProps;

  const createForecastingParametersConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Forecast_Parameters_Dialog",
      title: "Save Forecast Parameters Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current forecasting parameters?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () => saveForecastParametersRequestAction(forecastingParametersObj),
          ],
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

  const nextOrFinalDisabledFunc = () => {
    if (activeStep >= 1) {
      if (formTitle) return false;
      else return true;
    } else return false;
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
      next: nextDisableds[activeStep] ? true : false,
    },
    finalAction: createForecastingParametersConfirmation,
    workflowProps,
    workflowProcess,
    workflowCategory,
    nextOrFinalDisabled: nextOrFinalDisabledFunc(),
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
        <WorkflowBanner {...workflowBannerProps} />
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <ApexFlexContainer>
          <EditOrCreateForecastParametersWorkflow {...createProps} />
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

export default EditOrCreateForecastingParametersWorkflowDialog;
