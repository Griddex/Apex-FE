import React from "react";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import ForecastTitleAndDescriptionForm from "../../../Components/Forms/ForecastTitleAndDescriptionForm";
import ExistingFacilitiesDecks from "../../FacilitiesInputDeck/ExistingFacilitiesDecks";
import { IExistingInputDeck } from "../../InputDeckTypes";

const SaveInputDeckGenerateNetworkWorkflow = ({
  reducer,
  activeStep,
  finalAction,
}: IExistingInputDeck) => {
  const props = {
    reducer,
    containerStyle: { boxShadow: "none" },
    showChart: false,
    finalAction,
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <ExistingFacilitiesDecks {...props} />;
      case 1:
        return <ForecastTitleAndDescriptionForm />;
      default:
        return <h1>No view</h1>;
    }
  };

  return <div style={{ width: "100%", height: 525 }}>{renderImportStep()}</div>;
};

export default SaveInputDeckGenerateNetworkWorkflow;
