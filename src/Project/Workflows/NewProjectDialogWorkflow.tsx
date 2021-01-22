import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import NewProjectDialog from "../../Application/Components/Dialogs/NewProjectDialog";
import NavigationButtons from "../../Application/Components/NavigationButtons/NavigationButtons";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";
import { workflowInitAction } from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import UnitSettings from "../../Settings/UnitSettings/UnitSettings";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../Components/DialogParameters/ProjectSuccessFailureDialogsParameters";
import NewProjectForm from "../Components/Forms/NewProjectForm";
import NewProjectNameAndDescription from "../NewProjectNameAndDescription";
import { createNewProjectAction } from "../Redux/Actions/ProjectActions";
import { INewProjectWorkflowProps } from "../Redux/State/ProjectStateTypes";

const steps = ["New Project Details", "Choose Unit Settings"];

const NewProjectDialogWorkflow = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const workflowProcess = "newProjectDialogWorkflow";

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer["allWorkflows"][workflowProcess]
  );

  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  useEffect(() => {
    //Set optional steps here
    //Error steps can be set from any view in a workflow
    dispatch(
      workflowInitAction(steps, isStepOptional, isStepSkipped, workflowProcess)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const renderImportStep = (
    activeStep: number,
    props: INewProjectWorkflowProps
  ) => {
    switch (activeStep) {
      case 0:
        return <NewProjectNameAndDescription {...props} />;
      case 1:
        return <UnitSettings {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  const { projectName, projectDescription, pressureAddend } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer["unitSettingsData"]
  );
  const finalAction = () => {
    dispatch(
      createNewProjectAction(
        projectName,
        projectDescription,
        dayFormat,
        monthFormat,
        yearFormat,
        pressureAddend,
        successDialogParameters,
        failureDialogParameters
      )
    );
  };

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction: finalAction,
    workflowProcess,
  };

  return (
    <NewProjectDialog {...props}>
      <NewProjectForm>
        {({
          projectName,
          projectDescription,
          pressureAddend,
          errors,
          touched,
          handleChange,
          isValid,
        }) =>
          renderImportStep(activeStep, {
            projectName,
            projectDescription,
            pressureAddend,
            errors,
            touched,
            handleChange,
            isValid,
          })
        }
      </NewProjectForm>
      <NavigationButtons {...navigationButtonProps} />
    </NewProjectDialog>
  );
};

export default NewProjectDialogWorkflow;
