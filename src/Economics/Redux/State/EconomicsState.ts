import { allChartsDataAndSpecificProperties } from "../../../Visualytics/Data/VisualyticsData";
import {
  IEconomicsAnalysis,
  IEconomicsSensitivities,
  TEconomicsAnalysesNames,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IEconomicsState } from "./EconomicsStateTypes";

export const initialEconomicsWorkflowState = {
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

  chosenAppHeadersWithNone: [],
  chosenAppHeadersWithoutNone: [],

  chosenApplicationUnitsWithoutNone: [],
  fileUnitsWithoutNone: [],

  appHeaderNameUnitsMap: {},
  matchHeadersTable: [],
  matchUnitsTable: [],

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
};

const inputWorkflowProcesses = [
  "economicsCostsRevenuesDeckExcel",
  "economicsCostsRevenuesDeckDatabase",
  "economicsCostsRevenuesDeckManual",
  "economicsCostsRevenuesDeckApexForecast",
  "economicsCostsRevenuesDeckStored",

  "economicsParametersDeckExcel",
  "economicsParametersDeckDatabase",
  "economicsParametersDeckManual",
  "economicsParametersDeckStored",

  "economicsSensitivitiesStored",

  "economicsResultsStored",
];

const generateEconomicsState = () => {
  return inputWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: initialEconomicsWorkflowState,
    };
  }, {});
};

const storedWorkflowProcesses = [
  "economicsCostsRevenuesDeckStored",
  "economicsParametersDeckStored",
  "economicsSensitivitiesStored",
  "economicsResultsStored",
];
const generateStoredDataState = () => {
  return storedWorkflowProcesses.reduce((acc, workflowProcess) => {
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

const inputDataState = generateEconomicsState();
const storedDataState = generateStoredDataState();
const analysesDataState = generateAnalysesState();

export const sensitivitiesInfo = {
  sensitivitiesData: {
    analysisName: "payout",
    targetParameterOptions: [],
    selectedTargetParameterOption: {
      value: "Select Analysis...",
      label: "Select Analysis...",
    },
    sensitivityValues: [],
  },
  showSensitivitiesTable: false,
  sensitivitiesTable: [],
  sensitivitiesTableTitle: "",
} as IEconomicsSensitivities;

const EconomicsState: IEconomicsState = {
  currentWorkflowProcess: "economicsAnalyses",
  loadCostsRevenueWorkflow: false,
  loadEconomicsParametersWorkflow: false,
  loadEconomicsAnalysesWorkflow: false,
  loadEconomicsSensitivitiesWorkflow: false,
  loadEconomicsResultsWorkflow: false,

  currentAppHeaderOptions: [],

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
  cstRevAppHeadersNameMaps: {
    oilDevelopment: {},
    nagDevelopment: {},
    oilNAGDevelopment: {},
  },

  ecoParAppHeadersNameMap: {},

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

  createSensitivitiesIsDialog: true,

  economicsResultsId: "",
  economicsResultsTitle: "",
  economicsResultsDescription: "",
  selectedEconomicsResultsId: "",
  selectedEconomicsResultsTitle: "",
  isEconomicsResultsSaved: false,

  showSensitivitiesTable: false,

  noneColumnIndices: {},
  fileAppHeaderExcludeWithNoneMap: {},
  selectedAnalysis: {},
  selectedAnalysesNames: [],

  selectedTableData: [],

  //HeatMap
  heatMapTreeByScenario: { id: "", name: "" },
  sensitivitiesHeatMapTree: { id: "", name: "" },
  sensitivitiesHeatMapData: {},
  sensitivitiesHeatMap1or2D: [],
  heatMapStylingData: {
    heatMapThresholdValue: 0,
    heatMapThresholdColor: "white",
    heatMapBackgroundColor: "#F8F9FA",
    relationalOperatorOption: { value: ">", label: ">" },
  },
  heatMapVariableXOptions: {},
  heatMapVariableYOptions: {},
  heatMapVariableZOptions: {},

  showHeatMapCategoryMembersObj: {
    "X Category": false,
    "Y Category": false,
    "Z Category": false,
  },

  //Plot Charts
  economicsPlotChartsTree: { id: "", name: "" },
  plotChartsData: null,
  plotChartsDataTrans: null,
  selectedEconomicsPlotChartOption: {
    value: "Select Chart...",
    label: "Select Chart...",
  },
  showPlotChartsCategories: false,
  plotChartsVariableXOptions: {},
  plotChartsVariableYOptions: {},

  //Template Results
  economicsTemplatesTree: { id: "", name: "" },

  resultsAnalyisOptions: [],

  inputDataWorkflows: inputDataState,
  storedDataWorkflows: storedDataState,
  economicsAnalysisWorkflows: { ...analysesDataState, ...sensitivitiesInfo },
  economicsChartsWorkflows: allChartsDataAndSpecificProperties,
};

export default EconomicsState;
