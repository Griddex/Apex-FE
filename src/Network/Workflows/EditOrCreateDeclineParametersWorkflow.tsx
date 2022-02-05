import React from "react";
import { useDispatch } from "react-redux";
import { ITitleAndDescriptionFormProps } from "../../Application/Components/Forms/FormTypes";
import TitleAndDescriptionForm from "../../Application/Components/Forms/TitleAndDescriptionForm";
import {
  TReducer,
  TAllWorkflowProcesses,
} from "../../Application/Components/Workflows/WorkflowTypes";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import StoredForecastDecks from "../../Import/Routes/ForecastInputDeck/StoredForecastDecks";
import { IEditOrCreateDeclineParameters } from "../Components/Dialogs/EditOrCreateDeclineParametersWorkflowDialog";
import EditOrCreateDeclineParameters from "../Routes/EditOrCreateDeclineParameters";

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
  const reducer = "inputReducer" as TReducer;
  const currRowCopy = currRow == null ? {} : currRow;

  const wc = "storedDataWorkflows";
  const workflowProcessDefined =
    workflowProcess as NonNullable<TAllWorkflowProcesses>;

  const dispatch = useDispatch();

  const wp = workflowProcess as NonNullable<
    IStoredDataProps["workflowProcess"]
  >;

  const mainUrl = `${getBaseForecastUrl()}/well-decline-parameters`;
  const collectionName = "declineParameters";

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
            currentRow={currRowCopy}
            reducer={reducer}
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
