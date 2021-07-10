import React from "react";
import { ITitleAndDescriptionFormProps } from "../../../../Application/Components/Forms/FormTypes";
import TitleAndDescriptionForm from "../../../../Application/Components/Forms/TitleAndDescriptionForm";
import StoredFacilitiesDecks from "../../FacilitiesInputDeck/StoredFacilitiesDecks";
import { IStoredInputDeck } from "../../InputDeckTypes";

const SaveInputDeckGenerateNetworkWorkflow = ({
  reducer,
  activeStep,
  finalAction,

  title,
  setTitle,
  description,
  setDescription,
  storedTitles,
}: IStoredInputDeck & ITitleAndDescriptionFormProps) => {
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

  return <div style={{ width: "100%", height: 525 }}>{renderImportStep()}</div>;
};

export default SaveInputDeckGenerateNetworkWorkflow;
