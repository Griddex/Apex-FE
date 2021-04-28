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

  noneColumnIndices: {},
  fileHeadersChosenAppHeadersWithNone: [],

  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,
};

export default EconomicsState;
