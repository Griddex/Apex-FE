import { EconomicsStateType, IEconomicsState } from "./EconomicsStateTypes";

const inputWorkflowProcesses = [
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
const generateImportState = () => {
  return inputWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {
        existingData: [], //change this

        status: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

// const analysesWorkflowProcesses = [
//   "economicsAnalyses",
//   "economicsParameterImportWorkflow",
//   "economicsParameters",
//   "netCashAnalysisWorkflow",
//   "saveForecastingParametersWorkflowDialog",
// ];
const analysesWorkflowProcesses = [
  "economicsAnalyses",
  "economicsParameterImportWorkflow",
  "economicsParameters",
  "netCashAnalysisWorkflow",
  "saveForecastingParametersWorkflowDialog",
];
const generateExistingDataState = () => {
  return analysesWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {
        existingData: [],

        existingDataId: "",
        status: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

const inputDataState = generateImportState();
const existingDataState = generateExistingDataState();
const EconomicsState: EconomicsStateType = {
  //Remove from here
  forecastRun: "",
  currentWorkflowProcess: "economicsAnalyses",
  loadCostsRevenueWorkflow: false,
  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,
};

export default EconomicsState;
