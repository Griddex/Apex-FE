import { WorkflowStateType } from "./WorkflowStateTypes";

const workflowNames = [
  "newProjectDialogWorkflow",
  "forecastInputDeckImport",
  "economicsWorkflow",
  "economicsParameterImportWorkflow",
];

const generateWorkflowState = (): WorkflowStateType => {
  return workflowNames.reduce((acc, workflowName: string) => {
    const initialSkipped = new Set<number>();
    initialSkipped.add(50);

    return {
      ...acc,
      [workflowName]: {
        steps: [],
        activeStep: 0,
        skipped: initialSkipped,
        errorSteps: [],
        optionalSteps: [],
        workflowProcess: "",

        isStepOptional: () => false,
        isStepFailed: () => false,
        isStepSkipped: () => false,
      },
    };
  }, {});
};

const workflowState = generateWorkflowState();

export default workflowState;
