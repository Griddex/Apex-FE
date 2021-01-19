import { fade, makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnitSettings from "../../Settings/UnitSettings/UnitSettings";
import {
  workflowBackAction,
  workflowInitAction,
  workflowNextAction,
  workflowResetAction,
  workflowSkipAction,
} from "../../Application/Redux/Actions/WorkflowActions";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import ProjectNavigationButtons from "../Components/Buttons/ProjectNavigationButtons";
import NewProjectDialog from "../../Application/Components/Dialogs/NewProjectDialog";
import NewProjectForm from "../Components/Forms/NewProjectForm";
import NewProjectNameDescription from "../NewProjectNameDescription";
import { createNewProjectAction } from "../Redux/Actions/ProjectActions";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { INewProjectWorkflowProps } from "../Redux/State/ProjectStateTypes";
import { INavigationButtonsProp } from "../../Application/Components/NavigationButtons/NavigationButtonTypes";

const steps = ["New Project Details", "Choose Unit Settings"];

const NewProjectDialogWorkflow = (props: DialogStuff) => {
  const dispatch = useDispatch();
  const workflowProcess = "newProjectDialogWorkflow";

  const skipped = new Set<number>();
  const { activeStep } = useSelector(
    (state: RootState) => state.workflowReducer[workflowProcess]
  );
  console.log(
    "Logged output --> ~ file: NewProjectDialogWorkflow.tsx ~ line 32 ~ NewProjectDialogWorkflow ~ activeStep",
    activeStep
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
        return <NewProjectNameDescription {...props} />;
      case 1:
        return <UnitSettings {...props} />;
      default:
        return <h1>No view</h1>;
    }
  };

  const navigationButtonProps: INavigationButtonsProp = {
    showReset: true,
    showBack: true,
    showSkip: true,
    showNext: true,
    workflowResetAction: workflowResetAction,
    workflowBackAction: workflowBackAction,
    workflowSkipAction: workflowSkipAction,
    workflowNextAction: workflowNextAction,
    finalAction: createNewProjectAction,
    activeStep: activeStep,
    steps: steps,
    isStepOptional: isStepOptional,
    skipped: skipped,
    isStepSkipped: isStepSkipped,
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
      <ProjectNavigationButtons {...navigationButtonProps} />
    </NewProjectDialog>
  );
};

export default NewProjectDialogWorkflow;
