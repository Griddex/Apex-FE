import {
  IEconomicsAnalysis,
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

const chartsWorkflowProcesses = [
  "economicsTemplateResultsData",
  "economicsResultsPlotCharts",
  "economicsResultsSensitivitiesHeatmap",
];
const generateChartsState = () => {
  return chartsWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: {
        lineChart: {
          data: [],
          margin: { top: 50, right: 110, bottom: 50, left: 60 },
          xScale: { type: "point" },
          xFormat: "",
          yScale: {
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          },
          yFormat: "",

          //GRID
          enableGridX: true,
          enableGridY: true,
          gridXValues: [],
          gridYValues: [],

          //AXES
          axisTop: null,
          axisRight: null,
          axisBottom: {
            axisEnabled: true,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
            legendPosition: "middle",
          },
          axisLeft: {
            axisEnabled: true,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            legendPosition: "middle",
          },
          apexAxesEnabled: {
            axisLeft: true,
            axisBottom: true,
            axisTop: false,
            axisRight: false,
          },

          //POINTS
          pointSize: 10,
          pointColor: { from: "color", modifiers: [] },
          pointBorderWidth: 2,
          pointBorderColor: { from: "serieColor", modifiers: [] },
          pointLabelYOffset: -12,
          useMesh: true,

          //LEGENDS
          enableLegend: false,
          legends: [
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ],
        },
        stackedAreaChart: {},
        doughnutChart: {},
        barChart: {},
      },
    };
  }, {});
};

const inputDataState = generateEconomicsState();
const storedDataState = generateStoredDataState();
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
  fileAppHeaderExcludeWithNoneMap: {},
  selectedAnalysis: {},
  selectedAnalysesNames: [],

  selectedTableData: [],

  //HeatMap
  sensitivitiesHeatMapTree: { id: "", name: "" },
  sensitivitiesHeatMapData: {},
  sensitivitiesHeatMap1or2D: [],
  heatMapStylingData: {
    heatMapThresholdValue: 0,
    heatMapThresholdColor: "white",
    heatMapBackgroundColor: "#F8F9FA",
    relationalOperatorOption: { value: ">", label: ">" },
  },
  heatMapVariableXOption: null,
  heatMapVariableYOption: null,
  heatMapVariableZOption: null,

  //Plot Charts
  economicsPlotChartsTree: { id: "", name: "" },
  plotChartsData: null,
  plotChartsDataTrans: null,
  selectedEconomicsPlotChartOption: { value: "", label: "" },
  showPlotChartsCategories: false,
  plotChartsVariableXOption: null,
  plotChartsVariableYPriOption: null,
  plotChartsVariableYSecOption: null,

  //Template Results
  economicsTemplatesTree: { id: "", name: "" },

  inputDataWorkflows: inputDataState,
  storedDataWorkflows: storedDataState,
  economicsAnalysisWorkflows: analysesDataState,
  economicsChartsWorkflows: chartsDataState,
};

export default EconomicsState;
