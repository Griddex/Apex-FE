import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import { ITitleAndDescriptionFormProps } from "../../Application/Components/Forms/FormTypes";
import TitleAndDescriptionForm from "../../Application/Components/Forms/TitleAndDescriptionForm";
import NavigationButtons from "../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import VerticalWorkflowStepper from "../../Application/Components/Workflows/VerticalWorkflowStepper";
import WorkflowBanner from "../../Application/Components/Workflows/WorkflowBanner";
import {
  TAllWorkflowProcesses,
  TReducer,
} from "../../Application/Components/Workflows/WorkflowTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import { IEditOrCreateProductionPrioritization } from "../Components/Dialogs/EditOrCreateProductionPrioritizationWorkflowDialog";
import { saveProductionPrioritizationRequestAction } from "../Redux/Actions/NetworkActions";
import EditOrCreateProductionPrioritization from "../Routes/EditOrCreateProductionPrioritization";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (reducer) => reducer
);

const EditOrCreateProductionPrioritizationWorkflow = ({
  workflowProcess,
  activeStep,
  title,
  setTitle,
  description,
  setDescription,
  storedTitles,
  steps,
}: IEditOrCreateProductionPrioritization & ITitleAndDescriptionFormProps) => {
  const reducer = "inputReducer" as TReducer;
  const workflowCategory = "networkDataWorkflows";
  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;
  const titleDesc = { title, description };

  const skipped = new Set<number>();

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const showContextDrawer = useSelector(showContextDrawerSelector);

  const activeStepDefined = activeStep as number;
  const isStepOptional = React.useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );

  const isStepSkipped = React.useCallback(
    (step: number) => skipped.has(step),
    [skipped]
  );

  const saveRequestConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Prioritization_Parameters_Dialog",
      title: "Save Prioritization Parameters Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current prioritization parameters?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveProductionPrioritizationRequestAction(
                titleDesc as Record<string, string>
              ),
          ],
          "Save",
          "saveOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const workflowProps = {
    activeStep: activeStep as number,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
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
    finalAction: saveRequestConfirmation,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  const moduleName = "";
  const subModuleName = "Create Prioritization Parameters";
  const workflowName = "";

  const WorkflowBannerProps = {
    activeStep: activeStepDefined,
    steps,
    moduleName,
    subModuleName,
    workflowName,
    showChip: true,
  };

  const VerticalWorkflowStepperProps = {
    activeStep: activeStepDefined,
    steps,
    skipped,
    isStepSkipped,
    moduleName,
    subModuleName,
    workflowName,
    errorSteps: [],
  };

  const renderImportStep = () => {
    const n =
      workflowProcessDefined === "productionPrioritizationCreate" ? 0 : 1;

    const activeStepMod = (activeStep as number) + n;

    switch (activeStepMod) {
      case 0:
        return (
          <StoredForecastDecks
            reducer={reducer}
            showChart={false}
            finalAction={() => {}}
            containerStyle={{ boxShadow: "none" }}
          />
        );
      case 1:
        return <EditOrCreateProductionPrioritization />;
      case 2:
        return (
          <TitleAndDescriptionForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            storedTitles={storedTitles}
            heightIsAuto={true}
          />
        );
      default:
        return <h1>No view</h1>;
    }
  };

  const titleDescWidth =
    activeStep === 2 ? theme.breakpoints.values.sm : "100%";

  return (
    <div className={classes.root}>
      <WorkflowBanner {...WorkflowBannerProps} />
      <div className={classes.workflowBody} style={{ width: titleDescWidth }}>
        {renderImportStep()}
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

export default EditOrCreateProductionPrioritizationWorkflow;
