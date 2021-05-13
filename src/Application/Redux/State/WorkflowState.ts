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
        isNavButtonDisabled: {
          reset: false,
          skip: false,
          back: false,
          next: true,
        },
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

  "economicsCostsRevenuesDeckExcel",
  "economicsCostsRevenuesDeckDatabase",
  "economicsCostsRevenuesDeckManual",
  "economicsCostsRevenuesDeckApexForecast",
  "economicsCostsRevenuesDeckExisting",
  "economicsParametersDeckExcel",
  "economicsParametersDeckDatabase",
  "economicsParametersDeckManual",
  "economicsParametersDeckExisting",
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
        isNavButtonDisabled: {
          reset: false,
          skip: false,
          back: false,
          next: true,
        },

        isStepOptional: () => false,
        isStepFailed: () => false,
        isStepSkipped: () => false,
      },
    };
  }, {});
};

const networkWorkflowProcesses = [
  "networkGeneration",
  "saveForecastingParametersWorkflow",
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
        isNavButtonDisabled: {
          reset: false,
          skip: false,
          back: false,
          next: true,
        },

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
  "economicsSensitivitiesExisting",
  "economicsResultsExisting",
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
        isNavButtonDisabled: {
          reset: false,
          skip: false,
          back: false,
          next: true,
        },

        isStepOptional: () => false,
        isStepFailed: () => false,
        isStepSkipped: () => false,
      },
    };
  }, {});
};
const economicsAnalysesWorkflowNames = ["economicsSensitivitiesExisting"];
const generateEconomicsAnalysesWorkflowState = () => {
  return economicsAnalysesWorkflowNames.reduce((acc, workflowProcess) => {
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
        isNavButtonDisabled: {
          reset: false,
          skip: false,
          back: false,
          next: true,
        },

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
const economicsAnalysesState = generateEconomicsAnalysesWorkflowState();
const workflowState: IWorkflowState = {
  currentWorkflowProcess: "",
  projectDataWorkflows: projectState,
  inputDataWorkflows: inputState,
  networkDataWorkflows: networkState,
  economicsDataWorkflows: economicsState,
  economicsAnalysisWorkflows: economicsAnalysesState,
};

export default workflowState;
