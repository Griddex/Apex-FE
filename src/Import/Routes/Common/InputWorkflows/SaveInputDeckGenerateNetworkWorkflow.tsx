import React from "react";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import ForecastTitleAndDescriptionForm from "../../../Components/Forms/ForecastTitleAndDescriptionForm";
import ExistingFacilitiesDecks from "../../FacilitiesInputDeck/ExistingFacilitiesDecks";

const SaveInputDeckGenerateNetworkWorkflow = ({
  activeStep,
  workflowProcess,
  finalAction,
}: {
  activeStep: number;
  workflowProcess: NonNullable<IAllWorkflowProcesses["wrkflwPrcss"]>;
  finalAction: () => void;
}) => {
  const props = {
    containerStyle: { boxShadow: "none" },
    showChart: false,
    finalAction,
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 1:
        return <ExistingFacilitiesDecks {...props} />;
      case 2:
        return <ForecastTitleAndDescriptionForm />;
      default:
        return <h1>No view</h1>;
    }
  };

  return <div style={{ width: "100%", height: 525 }}>{renderImportStep()}</div>;
};

export default SaveInputDeckGenerateNetworkWorkflow;
