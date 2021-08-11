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
          otherProperties: {
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
        },

        stackedAreaChart: {
          data: [],
          otherProperties: {
            keys: ["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"],
            margin: { top: 50, right: 110, bottom: 50, left: 60 },
            axisTop: null,
            axisRight: null,
            axisBottom: {
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
            },
            axisLeft: {
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: -40,
            },
            offsetType: "silhouette",
            colors: { scheme: "nivo" },
            fillOpacity: 0.85,
            borderColor: { theme: "background" },
            defs: [
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#2c998f",
                size: 4,
                padding: 2,
                stagger: true,
              },
              {
                id: "squares",
                type: "patternSquares",
                background: "inherit",
                color: "#e4c912",
                size: 6,
                padding: 2,
                stagger: true,
              },
            ],
            fill: [
              {
                match: {
                  id: "Paul",
                },
                id: "dots",
              },
              {
                match: {
                  id: "Marcel",
                },
                id: "squares",
              },
            ],
            dotSize: 8,
            dotColor: { from: "color" },
            dotBorderWidth: 2,
            dotBorderColor: { from: "color", modifiers: [["darker", 0.7]] },
            legends: [
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000000",
                    },
                  },
                ],
              },
            ],
          },
        },
        doughnutChart: {
          data: [],
          otherProperties: {
            margin: { top: 40, right: 80, bottom: 80, left: 80 },
            innerRadius: 0.5,
            padAngle: 0.7,
            cornerRadius: 3,
            activeOuterRadiusOffset: 8,
            borderWidth: 1,
            borderColor: { from: "color", modifiers: [["darker", 0.2]] },
            arcLinkLabelsSkipAngle: 10,
            arcLinkLabelsTextColor: "#333333",
            arcLinkLabelsThickness: 2,
            arcLinkLabelsColor: { from: "color" },
            arcLabelsSkipAngle: 10,
            arcLabelsTextColor: { from: "color", modifiers: [["darker", 2]] },
            defs: [
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ],
            fill: [
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ],
            legends: [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ],
          },
        },
        barChart: {
          data: [],
          otherProperties: {
            keys: ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"],
            indexBy: "country",
            margin: { top: 50, right: 130, bottom: 50, left: 60 },
            padding: 0.3,
            valueScale: { type: "linear" },
            indexScale: { type: "band", round: true },
            valueFormat: { format: "", enabled: false },
            colors: { scheme: "nivo" },
            defs: [
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ],
            fill: [
              {
                match: {
                  id: "fries",
                },
                id: "dots",
              },
              {
                match: {
                  id: "sandwich",
                },
                id: "lines",
              },
            ],
            borderColor: { from: "color", modifiers: [["darker", 1.6]] },
            axisTop: null,
            axisRight: null,
            axisBottom: {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "country",
              legendPosition: "middle",
              legendOffset: 32,
            },
            axisLeft: {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "food",
              legendPosition: "middle",
              legendOffset: -40,
            },
            labelSkipWidth: 12,
            labelSkipHeight: 12,
            labelTextColor: { from: "color", modifiers: [["darker", 1.6]] },
            legends: [
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    };
  }, {});
};

const inputDataState = generateEconomicsState();
const storedDataState = generateStoredDataState();
const analysesDataState = generateAnalysesState();
const chartsDataState = generateChartsState();

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
  plotChartsCommonProperties: {
    stackedAreaChart: {},
    lineChart: {},
    doughnutChart: {},
    barChart: {},
  },

  //Template Results
  economicsTemplatesTree: { id: "", name: "" },

  inputDataWorkflows: inputDataState,
  storedDataWorkflows: storedDataState,
  economicsAnalysisWorkflows: analysesDataState,
  economicsChartsWorkflows: chartsDataState,
};

export default EconomicsState;
