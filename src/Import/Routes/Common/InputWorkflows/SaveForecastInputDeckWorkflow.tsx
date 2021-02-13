import React from "react";
import ForecastTitleAndDescriptionForm from "../../../Components/Forms/ForecastTitleAndDescriptionForm";
import ExistingFacilitiesDecks from "../../FacilitiesInputDeck/ExistingFacilitiesDecks";
import ForecastInputDeckFinalization from "../../ForecastInputDeck/ForecastInputDeckFinalization";
import { IAllWorkflowProcesses } from "./../../../../Application/Components/Workflows/WorkflowTypes";

const SaveForecastInputDeckWorkflow = ({
  activeStep,
  workflowProcess,
  finalAction,
}: {
  activeStep: number;
  workflowProcess: NonNullable<IAllWorkflowProcesses["wrkflwPrcss"]>;
  finalAction: () => void;
}) => {
  // const workflowProcess = wp
  const props = {
    containerStyle: { boxShadow: "none" },
    showChart: false,
    finalAction,
  };

  const renderImportStep = () => {
    switch (activeStep) {
      case 5:
        return <ExistingFacilitiesDecks {...props} />;
      case 6:
        return <ForecastTitleAndDescriptionForm />;
      case 7:
        return (
          <ForecastInputDeckFinalization workflowProcess={workflowProcess} />
        );
      default:
        return <h1>No view</h1>;
    }
  };

  return <div style={{ width: "100%", height: 525 }}>{renderImportStep()}</div>;
};

export default SaveForecastInputDeckWorkflow;
