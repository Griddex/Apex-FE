import { IWorkflowState } from "./WorkflowStateTypes";

const projectWorkflowNames = ["newProjectDialogWorkflow"];
const generateProjectWorkflowState = () => {
  return projectWorkflowNames.reduce((acc, workflowName: string) => {
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

const inputWorkflowNames = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",
  "facilitiesInputDeckApproveddeck",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",
  "forecastInputDeckApproveddeck",

  "productionInputDataExcel",
  "productionInputDataDatabase",
  "productionInputDataApproved",

  "economicsInputDataExcel",
  "economicsInputDataDatabase",
  "economicsInputDataManual", //Manual is from approved table (+New)
  "economicsInputDataApproved",

  "networkGeneration",

  "economicsAnalyses",
  "economicsParameterImportWorkflow",
];
const generateInputWorkflowState = () => {
  return inputWorkflowNames.reduce((acc, workflowName: string) => {
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

const networkWorkflowNames = [
  "networkGeneration",
  "saveForecastParametersWorkflow",
];
const generateNetworkWorkflowState = () => {
  return networkWorkflowNames.reduce((acc, workflowName: string) => {
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

const economicsWorkflowNames = ["economicsGenerationWorkflow"];
const generateEconomicsWorkflowState = () => {
  return economicsWorkflowNames.reduce((acc, workflowName: string) => {
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

const projectState = generateProjectWorkflowState();
const inputState = generateInputWorkflowState();
const networkState = generateNetworkWorkflowState();
const economicsState = generateEconomicsWorkflowState();
const workflowState: IWorkflowState = {
  currentWorkflowProcess: "",
  projectDataWorkflows: { ...projectState },
  inputDataWorkflows: { ...inputState },
  networkDataWorkflows: { ...networkState },
  economicsDataWorkflows: { ...economicsState },
};

export default workflowState;
