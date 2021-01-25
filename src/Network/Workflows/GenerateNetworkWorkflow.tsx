import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import NavigationButtons from "../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { workflowInitAction } from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import GenerateNetworkDialog from "../Components/Dialogs/GenerateNetworkDialog";
import { autoGenerateNetworkRequestAction } from "../Redux/Actions/NetworkActions";
import ExistingFacilitiesDecks from "./../../Import/Routes/FacilitiesInputDeck/ExistingFacilitiesDecks";
import ExistingForecastDecks from "./../../Import/Routes/ForecastInputDeck/ExistingForecastDecks";

const steps = ["New Project Details", "Choose Unit Settings"];

const GenerateNetworkWorkflow = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const workflowProcess = "saveForecastParametersWorkflow";

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer["importDataWorkflows"][workflowProcess]
  );

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(steps, isStepOptional, isStepSkipped, workflowProcess)
    );
  }, [dispatch]);

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <ExistingFacilitiesDecks workflowProcess="facilitiesInputDeckApproveddeck" />
        );
      case 1:
        return (
          <ExistingForecastDecks workflowProcess="forecastInputDeckApproveddeck" />
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
    workflowProcess,
  };

  return (
    <GenerateNetworkDialog {...props}>
      {() => renderImportStep()}
      <NavigationButtons {...navigationButtonProps} />
    </GenerateNetworkDialog>
  );
};

export default GenerateNetworkWorkflow;
