import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import NavigationButtons from "../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { workflowInitAction } from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import RunForecastDialog from "../Components/Dialogs/RunForecastDialog";
import RunForecastForm from "../Components/Forms/RunForecastForm";
import { IRunForecastFormProps } from "../Redux/State/NetworkStateTypes";
import DeclineCurveParameters from "../Routes/DeclineCurveParameters";
import ForecastParametersNameAndDescription from "../Routes/ForecastParametersNameAndDescription";
import OtherForecastingParameters from "../Routes/OtherForecastingParameters";

const steps = ["New Project Details", "Choose Unit Settings"];

const RunForecastWorkflow = (props: DialogStuff) => {
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

  const data = { skipped, isStepSkipped, activeStep, steps, errorSteps: [] };
  // const isStepFailed = useCallback((step) => activeStep === 50, [steps]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(steps, isStepOptional, isStepSkipped, workflowProcess)
    );
  }, [dispatch]);

  const renderImportStep = (props: IRunForecastFormProps) => {
    switch (activeStep) {
      case 0:
        return (
          <DeclineCurveParameters workflowProcess="saveForecastParametersWorkflow" />
        );
      case 1:
        return <OtherForecastingParameters />;
      case 2:
        return <ForecastParametersNameAndDescription {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  const finalAction = () => {
    dispatch({ type: "HELLO" });
  };

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: finalAction,
    workflowProcess,
  };

  return (
    <RunForecastDialog {...props}>
      <RunForecastForm>
        {({
          forecastParametersName,
          forecastParametersDescription,
          hSPName,
          timeFrequency,
          realtimeResults,
          endForecastDate,
          errors,
          touched,
          handleChange,
          isValid,
        }) =>
          renderImportStep({
            forecastParametersName,
            forecastParametersDescription,
            hSPName,
            timeFrequency,
            realtimeResults,
            endForecastDate,
            errors,
            touched,
            handleChange,
            isValid,
          })
        }
      </RunForecastForm>
      <NavigationButtons {...navigationButtonProps} />
    </RunForecastDialog>
  );
};

export default RunForecastWorkflow;
