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
  unloadDialogsAction,
  showDialogAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import { saveForecastParametersRequestAction } from "../Redux/Actions/NetworkActions";
import EditOrCreateForecastingParameters, {
  IEditOrCreateForecastingParameters,
} from "../Routes/EditOrCreateForecastingParameters";

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
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
    padding: 10,
    height: "100%",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (reducer) => reducer
);

const EditOrCreateForecastParametersWorkflow = ({
  currRow,
  setCurrRow,
  workflowProcess,
  activeStep,
  forecastParametersIndex,
  setNextDisableds,

  title,
  setTitle,
  description,
  setDescription,
  storedTitles,
  steps,
  isDialog,
}: IEditOrCreateForecastingParameters & ITitleAndDescriptionFormProps) => {
  const reducer = "inputReducer" as TReducer;
  const workflowCategory = "networkDataWorkflows";
  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;
  console.log(
    "🚀 ~ file: EditOrCreateForecastParametersWorkflow.tsx ~ line 75 ~ workflowProcessDefined",
    workflowProcessDefined
  );
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
      name: "Save_Forecast_Parameters_Dialog",
      title: "Save Forecast Parameters Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current forecast parameters?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              saveForecastParametersRequestAction(
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
    }, //
    finalAction: saveRequestConfirmation,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  const moduleName = "";
  const subModuleName = "Create Forecast Parameters";
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

  const isCreate = workflowProcessDefined === "forecastParametersCreate";

  const renderImportStep = () => {
    const n = isCreate ? 0 : 1;
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
        return (
          <EditOrCreateForecastingParameters
            currentRow={currRow}
            setCurrentRow={setCurrRow}
            workflowProcess={workflowProcessDefined}
            forecastParametersIndex={forecastParametersIndex}
            activeStep={activeStep}
            setNextDisableds={setNextDisableds}
            steps={steps}
          />
        );
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
      {isCreate && <WorkflowBanner {...WorkflowBannerProps} />}
      <div className={classes.workflowBody} style={{ width: titleDescWidth }}>
        {renderImportStep()}
      </div>
      {!isDialog && showContextDrawer && (
        <ContextDrawer>
          {() => <VerticalWorkflowStepper {...VerticalWorkflowStepperProps} />}
        </ContextDrawer>
      )}
      {isCreate && <NavigationButtons {...navigationButtonProps} />}
    </div>
  );
};

export default EditOrCreateForecastParametersWorkflow;
