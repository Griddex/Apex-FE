import {
  TEconomicsAnalysisWorkflows,
  IEconomicsAnalysis,
  TEconomicsAnalysesNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IEconomicsState, IEconomicsImport } from "./EconomicsStateTypes";
import { mapData } from "./../../Data/EconomicsData";

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

        variableUnits: {},

        currentDevOption: {},
        developmentScenarios: [],
        developmentScenariosCompleted: [],
        costsRevenues: {},
        costRevenuesButtons: [],
        forecastScenario: "2P_2C",

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
  "netPresentValue",
  "presentValueRatio",
  "unitTechnicalCost",
  "internalRateOfReturn",
  "mulitpleAnalyses",
];
const generateAnalysesState = () => {
  return analysesWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: { forecastScenarioAnalysis: "2P_2C" },
    };
  }, {}) as Record<TEconomicsAnalysesNames, IEconomicsAnalysis>;
};

const chartsWorkflowProcesses = [
  "economicsTemplateResultsData",
  "economicsResultsChartsTables",
  "economicsResultsSensitivitiesHeatmap",
];
const generateChartsState = () => {
  return chartsWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {},
    };
  }, {});
};

const inputDataState = generateEconomicsState();
const existingDataState = generateExistingDataState();
const analysesDataState = generateAnalysesState();
const chartsDataState = generateChartsState();

const EconomicsState: IEconomicsState = {
  //TODO Remove from here
  forecastRun: "",
  currentWorkflowProcess: "economicsAnalyses",
  loadCostsRevenueWorkflow: false,
  loadEconomicsParametersWorkflow: false,
  loadEconomicsAnalysesWorkflow: false,
  loadEconomicsSensitivitiesWorkflow: false,
  loadEconomicsResultsWorkflow: false,

  costsRevenuesAppHeaders: {
    oilDevelopment: [],
    nagDevelopment: [],
    oilNAGDevelopment: [],
  },
  cstRevAppHeadersSelectOptions: {
    oilDevelopment: [],
    nagDevelopment: [],
    oilNAGDevelopment: [],
  },
  costsRevenuesInputDeckId: "",
  costsRevenuesInputDeckTitle: "",
  costsRevenuesInputDeckDescription: "",

  selectedCostsRevenuesInputDeckId: "",
  selectedCostsRevenuesInputDeckTitle: "",
  selectedDevScenarioNamesCostsRevenues: [],

  economicsParametersAppHeaders: [],
  ecoParAppHeadersSelectOptions: [],
  economicsParametersInputDeckId: "",
  economicsParametersInputDeckTitle: "",
  economicsParametersInputDeckDescription: "",

  selectedEconomicsParametersInputDeckId: "",
  selectedEconomicsParametersInputDeckTitle: "",

  economicsSensitivitiesId: "",
  economicsSensitivitiesTitle: "",
  economicsSensitivitiesDescription: "",
  selectedEconomicsSensitivitiesId: "",
  selectedEconomicsSensitivitiesTitle: "",

  selectedSensitivitiesTable: [],
  createSensitivitiesIsDialog: true,

  economicsResultsId: "",
  economicsResultsTitle: "",
  economicsResultsDescription: "",
  selectedEconomicsResultsId: "",
  selectedEconomicsResultsTitle: "",
  isEconomicsResultsSaved: false,

  showSensitivitiesTable: false,

  noneColumnIndices: {},
  fileHeadersChosenAppHeadersWithNone: [],
  selectedAnalysis: {},
  selectedAnalysesNames: [],

  //HeatMap
  sensitivitiesHeatMapData: {},
  sensitivitiesHeatMap1or2D: [],
  heatMapStylingData: {
    heatMapThresholdValue: 0,
    heatMapThresholdColor: "white",
    heatMapBackgroundColor: "#F8F9FA",
    relationalOperator: ">",
  },
  showHeatMapCategories: false,
  heatMapVariableXOption: null,
  heatMapVariableYOption: null,
  heatMapVariableZOption: null,
  sensitivitiesHeatMapTree: { id: "", name: "" },

  //Plot Charts
  economicsPlotChartsTree: { id: "", name: "" },
  selectedEconomicsPlotChartOption: { value: "", label: "" },
  showPlotChartsCategories: false,
  plotChartsVariableXOption: null,
  plotChartsVariableYPriOption: null,
  plotChartsVariableYSecOption: null,

  //Template Results
  economicsTemplatesTree: { id: "", name: "" },

  inputDataWorkflows: inputDataState,
  existingDataWorkflows: existingDataState,
  economicsAnalysisWorkflows: analysesDataState,
  economicsChartsWorkflows: chartsDataState,
};

export default EconomicsState;
