import React from "react";
import { ITitleAndDescriptionFormProps } from "../../Application/Components/Forms/FormTypes";
import TitleAndDescriptionForm from "../../Application/Components/Forms/TitleAndDescriptionForm";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../Application/Components/Workflows/WorkflowTypes";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import EditOrCreateDeclineParameters from "../Routes/EditOrCreateDeclineParameters";
import { IEditOrCreateDeclineParameters } from  "../Components/Dialogs/EditOrCreateDeclineParametersWorkflowDialog"

const EditOrCreateDeclineParametersWorkflow = ({
  currRow,
  setCurrRow,
  shouldUpdate,
  workflowProcess,
  activeStep,
  forecastParametersIndex,

  title,
  setTitle,
  description,
  setDescription,
  storedTitles,
}: IEditOrCreateDeclineParameters & ITitleAndDescriptionFormProps) => {
  const reducer = "inputReducer" as ReducersType;

  const wc = "storedDataWorkflows";
  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const renderImportStep = () => {
    const n =
      workflowProcessDefined === "createForecastingParametersWorkflow" ? 0 : 1;

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
          <EditOrCreateDeclineParameters
            currentRow={currRow}
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
          />
        );
      default:
        return <h1>No view</h1>;
    }
  };

  return <>{renderImportStep()}</>;
};

export default EditOrCreateDeclineParametersWorkflow;
