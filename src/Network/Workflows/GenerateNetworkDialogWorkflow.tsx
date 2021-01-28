import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { workflowInitAction } from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ExistingFacilitiesDecks from "../../Import/Routes/FacilitiesInputDeck/ExistingFacilitiesDecks";
import ExistingForecastDecks from "../../Import/Routes/ForecastInputDeck/ExistingForecastDecks";
import GenerateNetworkDialog from "../Components/Dialogs/GenerateNetworkDialog";
import { autoGenerateNetworkRequestAction } from "../Redux/Actions/NetworkActions";

const steps = ["New Project Details", "Choose Unit Settings"];

const GenerateNetworkDialogWorkflow = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const workflowCategory = "networkDataWorkflows";
  const workflowProcess = "networkGeneration";

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]
  );

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <ExistingFacilitiesDecks
            workflowProcess="facilitiesInputDeckExisting"
            finalAction={() => {}}
          />
        );
      case 1:
        return (
          <ExistingForecastDecks
            workflowProcess="forecastInputDeckExisting"
            finalAction={() => {}}
          />
        );
      default:
        return <h1>No view</h1>;
    }
  };

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: () => dispatch(autoGenerateNetworkRequestAction()),
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
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
    <GenerateNetworkDialog {...props} {...navigationButtonProps}>
      {renderImportStep()}
    </GenerateNetworkDialog>
  );
};

export default GenerateNetworkDialogWorkflow;
