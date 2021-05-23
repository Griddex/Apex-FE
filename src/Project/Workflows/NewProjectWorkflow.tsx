import React from "react";
import UnitSettings from "../../Settings/UnitSettings/UnitSettings";
import NewProjectForm from "../Components/Forms/NewProjectForm";
import NewProjectTitleAndDescription from "../NewProjectTitleAndDescription";
import { INewProjectWorkflowProps } from "../Redux/State/ProjectStateTypes";

const NewProjectWorkflow = ({ activeStep }: { activeStep: number }) => {
  const renderImportStep = (props: INewProjectWorkflowProps) => {
    switch (activeStep) {
      case 0: //prop filtering needed - pull out relevant props
        return <UnitSettings {...props} />;
      case 1:
        return <NewProjectTitleAndDescription {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  return (
    <NewProjectForm>
      {({
        projectTitle,
        projectDescription,
        pressureAddend,
        errors,
        touched,
        handleChange,
        isValid,
      }) =>
        renderImportStep({
          projectTitle,
          projectDescription,
          pressureAddend,
          errors,
          touched,
          handleChange,
          isValid,
        })
      }
    </NewProjectForm>
  );
};

export default NewProjectWorkflow;
