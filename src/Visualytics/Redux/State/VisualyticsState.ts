import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import { allChartsDataAndSpecificProperties } from "../../Data/VisualyticsData";
import { chartObjNameType, IVisualyticsState } from "./VisualyticsStateTypes";

export const chartObjectsNameTitleMap = {
  none: "",
  chartLayout: "Chart Layout",
  chartPlotArea: "Plot Area",
  legend: "Legend",
  yAxis: "Y Axis",
  xAxis: "X Axis",
  axisTitle: "Axis Title",
  chartTitle: "Chart Title",
  dataLabels: "Data Labels",
  dataPoint: "Data Point",
  dataSeries: "Data Series",
  gridLines: "Grid Lines",
};

export const initialColorGradient = {
  points: [
    {
      left: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    {
      left: 100,
      red: 255,
      green: 0,
      blue: 0,
      alpha: 1,
    },
  ],
  degree: 0,
  type: "linear",
};

export const initialVisualyticsWorkflowState = {
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
  "visualyticsDeckExcel",
  "visualyticsDeckDatabase",
];

const generateVisualyticsState = () => {
  return inputWorkflowProcesses.reduce((acc, workflowProcess) => {
    return {
      ...acc,
      [workflowProcess]: initialVisualyticsWorkflowState,
    };
  }, {});
};

const visualyticsDataState = generateVisualyticsState();

const visualyticsState: IVisualyticsState = {
  selectedChartIndex: 0,
  selectedChartObjId: "",
  chartObjects: [],
  structureObj: { xAxes: [], yAxes: [] },

  formatObj: {
    chartLayoutColor: "white",
    chartSeriesSolidColors: [],
  },

  visualyticsResults: [],
  visualyticsTree: [],
  xValueCategories: [],
  lineOrScatter: "line",
  isYear: true,
  transVisualyticsResult: [],
  visualyticsResultsId: "",
  showPlotChartsCategories: false,

  loadVisualyticsWorkflow: false,
  selectedVisualyticsOption: { label: "Select...", value: "Select..." },
  selectedVisualyticsId: "",
  selectedVisualyticsTitle: "",
  selectedVisualyticsDescription: "",
  isVisualyticsDeckSaved: false,
  visualyticsColumnNames: [],
  xValueCategoryPositions: [],

  visualyticsVariableXOption: null,
  visualyticsVariableYOption: null,
  visualyticsVariableZOption: null,

  storedDataWorkflows: {
    visualyticsDeckStored: [],
  },
  visualyticsDataWorkflows: visualyticsDataState,
  visualyticsChartsWorkflows: allChartsDataAndSpecificProperties,
};
export default visualyticsState;
