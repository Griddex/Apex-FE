import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import NewProjectDialog from "../../Application/Components/Dialogs/NewProjectDialog";
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
  const workflowCategory = "projectDataWorkflows";
  const workflowProcess = "newProjectDialogWorkflow";

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) =>
      state.workflowReducer[workflowCategory][workflowProcess]
  );
  const isStepOptional = useCallback(
    (activeStep: number) => activeStep === 50,
    [activeStep]
  );
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [
    skipped,
  ]);

  const workflowProps = {
    activeStep,
    steps,
    isStepOptional,
    skipped,
    isStepSkipped,
  };

  const renderImportStep = (
    activeStep: number,
    props: INewProjectWorkflowProps
  ) => {
    switch (activeStep) {
      case 0:
        return <UnitSettings {...props} />;
      case 1:
        return <NewProjectNameAndDescription {...props} />;
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
  const finalAction = React.useCallback(() => {
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
  }, [
    projectName,
    projectDescription,
    dayFormat,
    monthFormat,
    yearFormat,
    pressureAddend,
    successDialogParameters,
    failureDialogParameters,
  ]);

  const navigationButtonProps: INavigationButtonsProp = {
    mainNav: false,
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    finalAction,
    workflowProps,
    workflowProcess,
    workflowCategory,
  };

  useEffect(() => {
    dispatch(
      workflowInitAction(
        steps,
        isStepOptional,
        isStepSkipped,
        workflowProcess,
        workflowCategory
      )
    );
  }, [dispatch]);

  return (
    <NewProjectDialog {...props} {...navigationButtonProps}>
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
    </NewProjectDialog>
  );
};

export default NewProjectDialogWorkflow;
