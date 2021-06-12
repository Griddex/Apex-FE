import React from "react";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import ForecastTitleAndDescriptionForm from "../../../Components/Forms/ForecastTitleAndDescriptionForm";
import StoredFacilitiesDecks from "../../FacilitiesInputDeck/StoredFacilitiesDecks";
import { IStoredInputDeck } from "../../InputDeckTypes";

const SaveInputDeckGenerateNetworkWorkflow = ({
  reducer,
  activeStep,
  finalAction,
}: IStoredInputDeck) => {
  const props = {
    reducer,
    containerStyle: { boxShadow: "none" },
    showChart: false,
    finalAction,
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <StoredFacilitiesDecks {...props} />;
      case 1:
        return <ForecastTitleAndDescriptionForm />;
      default:
        return <h1>No view</h1>;
    }
  };

  return <div style={{ width: "100%", height: 525 }}>{renderImportStep()}</div>;
};

export default SaveInputDeckGenerateNetworkWorkflow;
