import React from "react";
import ExistingFacilitiesDecks from "../../Import/Routes/FacilitiesInputDeck/ExistingFacilitiesDecks";
import ExistingForecastDecks from "../../Import/Routes/ForecastInputDeck/ExistingForecastDecks";

const GenerateNetworkWorkflow = ({ activeStep }: { activeStep: number }) => {
  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <ExistingFacilitiesDecks finalAction={() => {}} />;
      case 1:
        return <ExistingForecastDecks finalAction={() => {}} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return <>{renderImportStep()}</>;
};

export default GenerateNetworkWorkflow;
