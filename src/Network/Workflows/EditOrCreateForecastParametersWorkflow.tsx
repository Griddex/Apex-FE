import React from "react";
import { ITitleAndDescriptionFormProps } from "../../Application/Components/Forms/FormTypes";
import TitleAndDescriptionForm from "../../Application/Components/Forms/TitleAndDescriptionForm";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../Application/Components/Workflows/WorkflowTypes";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import SaveForecastParametersForm from "../Components/Forms/SaveForecastParametersForm";
import { ICreateForecastParametersFormProps } from "../Redux/State/NetworkStateTypes";
import EditOrCreateForecastingParameters, {
  IEditOrCreateForecastingParameters,
} from "../Routes/EditOrCreateForecastingParameters";

const EditOrCreateForecastParametersWorkflow = ({
  setRows,
  rows,
  currentRow,
  shouldUpdate,
  workflowProcess,
  activeStep,
  forecastParametersIndex,

  title,
  setTitle,
  description,
  setDescription,
  storedTitles,
}: IEditOrCreateForecastingParameters & ITitleAndDescriptionFormProps) => {
  const reducer = "inputReducer" as ReducersType;

  const wc = "storedDataWorkflows";
  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const renderImportStep = (props: ICreateForecastParametersFormProps) => {
    const n = workflowProcess === "createForecastingParametersWorkflow" ? 0 : 1;
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
          <ApexFlexContainer>
            <EditOrCreateForecastingParameters
              currentRow={currentRow}
              rows={rows}
              setRows={setRows}
              shouldUpdate={shouldUpdate}
              workflowProcess={workflowProcessDefined}
              forecastParametersIndex={forecastParametersIndex}
            />
          </ApexFlexContainer>
        );
      case 2:
        return (
          <TitleAndDescriptionForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            storedTitles={storedTitles}
          />
        );
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <SaveForecastParametersForm>
      {({
        forecastParametersTitle,
        forecastParametersDescription,
        targetFluid,
        timeFrequency,
        defermentDecision,
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
          targetFluid,
          timeFrequency,
          defermentDecision,
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

export default EditOrCreateForecastParametersWorkflow;
