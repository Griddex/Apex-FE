import React from "react";
import { useDispatch } from "react-redux";
import { IExistingDataProps } from "../../../../Application/Types/ApplicationTypes";
import ForecastTitleAndDescriptionForm from "../../../Components/Forms/ForecastTitleAndDescriptionForm";
import { INewForecastInputDeckWorkflowProps } from "../../../Redux/State/InputStateTypes";
import ExistingFacilitiesDecks from "../../FacilitiesInputDeck/ExistingFacilitiesDecks";
import ForecastInputDeckFinalization from "../../ForecastInputDeck/ForecastInputDeckFinalization";
import { IAllWorkflowProcesses } from "./../../../../Application/Components/Workflows/WorkflowTypes";

const SaveForecastInputDeckWorkflow = ({
  activeStep,
  workflowProcess,
  finalAction,
}: {
  activeStep: number;
  workflowProcess: NonNullable<IAllWorkflowProcesses["workflowProcess"]>;
  finalAction: () => void;
}) => {
  // const workflowProcess = wp
  const props = { finalAction };

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <ExistingFacilitiesDecks {...props} />;
      case 1:
        return <ForecastTitleAndDescriptionForm />;
      case 2:
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
