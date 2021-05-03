import {
  TEconomicsAnalysisWorkflows,
  IEconomicsAnalysis,
  TEconomicsAnalysesNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
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

  "economicsSensitivitiesExisting",

  "economicsResultsExisting",
];
const generateEconomicsState = () => {
  return inputWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {
        fileLastModified: "",
        filePath: "",
        fileType: "",
        fileName: "",
        fileSize: "",
        fileAuthor: "",
        fileCreated: "",

        fileAccepted: false,
        dnDDisabled: false,
        inputFile: null,

        workSheetNames: [],
        selectedWorksheetName: "",
        selectedWorksheetData: [],

        tableHeaders: [],
        fileHeaders: [],
        fileHeadersMatch: [],
        selectedHeaderRowIndex: 0,
        selectedHeaderOptionIndex: 0,
        chosenApplicationHeadersIndices: [],
        headerRowOptionsIndices: [],
        fileUnits: [],
        fileUniqueUnits: [],
        fileUnitsMatch: [],
        fileUnitsMatchUnique: [],
        selectedUnitRowIndex: 0,
        selectedUnitOptionIndex: 0,
        unitRowOptionsIndices: [],
        tableRoleNames: [],
        optionIndices: [],
        tableData: [],
        columnNameTableData: [],
        inputDeckData: [],
        selectedRow: null,

        chosenApplicationHeadersWithNone: [],
        chosenApplicationHeadersWithoutNone: [],

        chosenApplicationUnitsWithoutNone: [],
        fileUnitsWithoutNone: [],

        savedMatchObjectAll: {},
        variableUnits: {},

        inputDeckId: "",
        status: 0,
        message: "",
        errors: { message: "" },
        success: false,
      },
    };
  }, {});
};

const existingWorkflowProcesses = [
  "economicsCostsRevenuesDeckExisting",
  "economicsParametersDeckExisting",
  "economicsSensitivitiesExisting",
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

const analysesWorkflowProcesses = [
  "netcashFlow",
  "payout",
  "minimumCapitalRatio",
  "netpresentvalue",
  "presentValueRatio",
  "unitTechnicalCost",
  "internalRateOfReturn",
  "mulitpleAnalyses",
];
const generateAnalysesState = () => {
  return analysesWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {},
    };
  }, {}) as Record<TEconomicsAnalysesNames, IEconomicsAnalysis>;
};

const inputDataState = generateEconomicsState();
const existingDataState = generateExistingDataState();
const analysesDataState = generateAnalysesState();
const EconomicsState: EconomicsStateType = {
  //Remove from here
  forecastRun: "",
  currentWorkflowProcess: "economicsAnalyses",
  loadCostsRevenueWorkflow: false,
  loadEconomicsParametersWorkflow: false,

  costsRevenuesAppHeaders: [],
  costsRevenuesInputDeckId: "",
  costsRevenuesInputDeckTitle: "",
  costsRevenuesInputDeckDescription: "",

  selectedCostsRevenuesInputDeckId: "",
  selectedCostsRevenuesInputDeckTitle: "",

  economicsParametersAppHeaders: [],
  economicsParametersInputDeckId: "",
  economicsParametersInputDeckTitle: "",
  economicsParametersInputDeckDescription: "",

  selectedEconomicsParametersInputDeckId: "",
  selectedEconomicsParametersInputDeckTitle: "",

  selectedEconomicsResultsId: "",
  selectedEconomicsResultsTitle: "",

  economicsSensitivitiesId: "",
  economicsSensitivitiesTitle: "",
  economicsSensitivitiesDescription: "",
  selectedEconomicsSensitivitiesId: "",
  selectedEconomicsSensitivitiesTitle: "",

  noneColumnIndices: {},
  fileHeadersChosenAppHeadersWithNone: [],

  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,
  economicsAnalysisWorkflows: analysesDataState,
};

export default EconomicsState;
