import React from "react";
import { IAllWorkflowProcesses } from "../../Application/Components/Workflows/WorkflowTypes";
import SaveForecastParametersForm from "../Components/Forms/SaveForecastParametersForm";
import { ISaveForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";
import DeclineCurveParameters from "../Routes/DeclineCurveParameters";
import ForecastParametersTitleAndDescription from "../Routes/ForecastParametersTitleAndDescription";
import OtherForecastingParameters from "../Routes/OtherForecastingParameters";

const SaveForecastParametersWorkflow = ({
  activeStep,
}: {
  activeStep: number;
}) => {
  const renderImportStep = (props: ISaveForecastParametersFormProps) => {
    switch (activeStep) {
      case 0:
        return (
          <DeclineCurveParameters workflowProcess="saveForecastingParametersWorkflowDialog" />
        );
      case 1:
        return <OtherForecastingParameters />;
      case 2:
        return <ForecastParametersTitleAndDescription {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <SaveForecastParametersForm>
      {({
        forecastParametersTitle,
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
          forecastParametersTitle,
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
    </SaveForecastParametersForm>
  );
};

export default SaveForecastParametersWorkflow;
