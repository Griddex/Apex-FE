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

  "economicsResultsExisting",
];
const generateEconomicsState = () => {
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

const existingWorkflowProcesses = [
  "economicsAnalyses",
  "economicsParameterImportWorkflow",
  "economicsParameters",
  "netCashAnalysisWorkflow",
  "saveForecastingParametersWorkflowDialog",

  "economicsCostsRevenuesDeckExisting",
  "economicsParametersDeckExisting",
  "economicsResultsExisting",
];
const generateExistingDataState = () => {
  return existingWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: [],
    };
  }, {});
};

const inputDataState = generateEconomicsState();
const existingDataState = generateExistingDataState();
const EconomicsState: EconomicsStateType = {
  //Remove from here
  forecastRun: "",
  currentWorkflowProcess: "economicsAnalyses",
  loadCostsRevenueWorkflow: false,
  loadParametersWorkflow: false,

  costsRevenuesInputHeaders: [],

  costsRevenuesInputDeckId: "",
  costsRevenuesInputDeckTitle: "",
  costsRevenuesInputDeckDescription: "",

  selectedCostsRevenuesInputDeckId: "",
  selectedCostsRevenuesInputDeckTitle: "",

  parametersInputDeckId: "",
  parametersInputHeaders: [],
  selectedParametersInputDeckId: "",
  selectedParametersInputDeckTitle: "",

  selectedEconomicsResultsId: "",
  selectedEconomicsResultsTitle: "",

  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,
};

export default EconomicsState;
