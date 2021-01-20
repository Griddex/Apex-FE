import { IWorkflowState } from "./WorkflowStateTypes";

const workflowNames = [
  "newProjectDialogWorkflow",
  "forecastInputDeckImport",
  "economicsWorkflow",
  "economicsParameterImportWorkflow",
];

const generateWorkflowState = () => {
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

const state = generateWorkflowState();
const workflowState: IWorkflowState = {
  currentWorkflowProcess: "",
  allWorkflows: { ...state },
};

export default workflowState;
