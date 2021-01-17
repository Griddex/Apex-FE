import { WorkflowStateType } from "./WorkflowStateTypes";

const workflowNames = [
  "forecastInputDeckImport",
  "economicsWorkflow",
  "economicsParameterImportWorkflow",
];

const generateWorkflowState = (): WorkflowStateType => {
  return workflowNames.reduce((acc, workflowName: string) => {
    return {
      ...acc,
      [workflowName]: {
        steps: [],
        activeStep: 0,
        skipped: new Set<number>(),
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

export default generateWorkflowState();
