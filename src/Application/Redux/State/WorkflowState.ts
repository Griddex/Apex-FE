import { IWorkflowState } from "./WorkflowStateTypes";

const projectWorkflowProcesses = ["newProjectWorkflow"];
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
  "economicsCostsRevenuesDeckStored",
  "economicsParametersDeckExcel",
  "economicsParametersDeckDatabase",
  "economicsParametersDeckManual",
  "economicsParametersDeckStored",
  "settings",
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

const visualyticsWorkflowProcesses = [
  "visualyticsDeckExcel",
  "visualyticsDeckDatabase",
];
const generateVisualyticsWorkflowState = () => {
  return visualyticsWorkflowProcesses.reduce((acc, workflowProcess) => {
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
  "forecastParametersCreate",
  "editForecastingParametersWorkflow",
  "productionPrioritizationCreate",
  "declineParametersCreate",
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
  "economicsSensitivitiesStored",
  "economicsResultsStored",
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

const economicsAnalysesWorkflowNames = ["economicsSensitivitiesStored"];
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
const visualyticsState = generateVisualyticsWorkflowState();
const workflowState: IWorkflowState = {
  currentWorkflowProcess: "",
  projectDataWorkflows: projectState,
  inputDataWorkflows: inputState,
  networkDataWorkflows: networkState,
  economicsDataWorkflows: economicsState,
  economicsAnalysisWorkflows: economicsAnalysesState,
  economicsChartsWorkflows: {},
  visualyticsDataWorkflows: visualyticsState,
  visualyticsChartsWorkflows: {},
};

export default workflowState;
