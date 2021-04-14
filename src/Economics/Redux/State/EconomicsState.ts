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
const generateInputState = () => {
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

const analysesWorkflowProcesses = [
  "economicsAnalyses",
  "economicsParameterImportWorkflow",
  "economicsParameters",
  "netCashAnalysisWorkflow",
  "saveForecastingParametersWorkflowDialog",

  "economicsCostsRevenuesDeckExisting",
  "economicsParametersDeckExisting",
];
const generateExistingDataState = () => {
  return analysesWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: [],
    };
  }, {});
};

const inputDataState = generateInputState();
const existingDataState = generateExistingDataState();
const EconomicsState: EconomicsStateType = {
  //Remove from here
  forecastRun: "",
  currentWorkflowProcess: "economicsAnalyses",
  loadCostsRevenueWorkflow: false,
  loadParametersWorkflow: false,

  costsRevenuesInputDeckId: "",
  costsRevenuesInputHeaders: [],
  costsRevenuesInputDeckTitle: "",
  costsRevenuesInputDeckDescription: "",

  parametersInputDeckId: "",
  parametersInputHeaders: [],
  // parametersInputDeckTitle:"",
  // parametersInputDeckDescription:"",

  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,
};

export default EconomicsState;
