import React from "react";
import { ITitleAndDescriptionFormProps } from "../../Application/Components/Forms/FormTypes";
import TitleAndDescriptionForm from "../../Application/Components/Forms/TitleAndDescriptionForm";
import UnitSettings from "../../Settings/UnitSettings/UnitSettings";

const NewProjectWorkflow = (props: ITitleAndDescriptionFormProps) => {
  const { activeStep } = props;

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <UnitSettings {...props} />;
      case 1:
        return <TitleAndDescriptionForm {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return <>{renderImportStep()}</>;
};

export default NewProjectWorkflow;
