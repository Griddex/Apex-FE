import React from "react";
import { ITitleAndDescriptionFormProps } from "../../Application/Components/Forms/FormTypes";

const TitleAndDescriptionForm = React.lazy(
  () => import("../../Application/Components/Forms/TitleAndDescriptionForm")
);
const UnitSettings = React.lazy(
  () => import("../../Settings/UnitSettings/UnitSettings")
);

const NewProjectWorkflow = (props: ITitleAndDescriptionFormProps) => {
  const { activeStep, isDialog } = props;

  const renderImportStep = () => {
    switch (activeStep) {
      case 0:
        return <UnitSettings isDialog={isDialog as boolean} />;
      case 1:
        return <TitleAndDescriptionForm {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return <>{renderImportStep()}</>;
};

export default NewProjectWorkflow;
