import { IAllWorkflowProcesses } from "../../Components/Workflows/WorkflowTypes";
import { IWorkflowState } from "./WorkflowStateTypes";

const projectWorkflowProcesses = ["newProjectWorkflowDialog"];
const generateProjectWorkflowState = () => {
  return projectWorkflowProcesses.reduce((acc, workflowProcess) => {
    const initialSkipped = new Set<number>();
    initialSkipped.add(50);

    return {
      ...acc,
      [workflowProcess]: {
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

const inputWorkflowProcesses = [
  "facilitiesInputDeckExcel",
  "facilitiesInputDeckDatabase",

  "forecastInputDeckExcel",
  "forecastInputDeckDatabase",

  "productionInputDataExcel",
  "productionInputDataDatabase",

  "economicsInputDataExcel",
  "economicsInputDataDatabase",
  "economicsInputDataManual", //Manual is from approved table (+New)
];
const generateInputWorkflowState = () => {
  return inputWorkflowProcesses.reduce((acc, workflowProcess) => {
    const initialSkipped = new Set<number>();
    initialSkipped.add(50);

    return {
      ...acc,
      [workflowProcess]: {
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

const networkWorkflowProcesses = [
  "networkGeneration",
  "saveForecastingParametersWorkflowDialog",
];
const generateNetworkWorkflowState = () => {
  return networkWorkflowProcesses.reduce((acc, workflowProcess) => {
    const initialSkipped = new Set<number>();
    initialSkipped.add(50);

    return {
      ...acc,
      [workflowProcess]: {
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

const economicsWorkflowNames = [
  "economicsAnalyses",
  "economicsParameterImportWorkflow",
  "economicsGenerationWorkflow",
];
const generateEconomicsWorkflowState = () => {
  return economicsWorkflowNames.reduce((acc, workflowProcess) => {
    const initialSkipped = new Set<number>();
    initialSkipped.add(50);

    return {
      ...acc,
      [workflowProcess]: {
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
  projectDataWorkflows: projectState,
  importDataWorkflows: inputState,
  networkDataWorkflows: networkState,
  economicsDataWorkflows: economicsState,
};

export default workflowState;
