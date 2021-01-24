import { IWorkflowState } from "./WorkflowStateTypes";

const workflowNames = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",
  "facilitiesInputDeckApproveddeck",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",
  "forecastInputDeckApproveddeck",

  "productionDataExcel",
  "productionDataDatabase",
  "productionDataApproved",

  "economicsDataExcel",
  "economicsDataDatabase",
  "economicsDataManual",
  "economicsDataApproved",

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
  allExistingWorkflows: { ...state },
};

export default workflowState;
