import { allChartsDataAndSpecificProperties } from "../../../Visualytics/Data/VisualyticsData";
import {
  IForecastChartState,
  IForecastResultState,
} from "./ForecastStateTypes";

export const forecastChartObjectsNameTitleMap = {
  none: "",
  forecastChartLayout: "Chart Layout",
  forecastChartPlotArea: "Plot Area",
  legend: "Legend",
  yAxis: "Y Axis",
  xAxis: "X Axis",
  axisTitle: "Axis Title",
  forecastChartTitle: "Chart Title",
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

const forecastChartState: IForecastChartState = {
  selectedForecastChartVariable: "oilRate",
  selectedForecastAggregationLevel: "none",
  selectedForecastAggregationType: "yearly",
  selectedModuleIds: [],
  selectedChartIndex: 0,
  selectedChartObjId: "",
  forecastChartObjects: [],
  structureObj: { xAxes: [], yAxes: [] },

  formatObj: {
    forecastChartLayoutColor: "white",
    forecastChartSeriesSolidColors: ["#31BFCC", "#DA1B57", "#00C49F"],
  },

  selectedForecastChartOption: {
    value: "stackedAreaChart",
    label: "Stacked Area",
  },

  forecastChartsWorkflows: allChartsDataAndSpecificProperties,
};

const forcastResultState: IForecastResultState = {
  selectedView: "",
  selectedTableData: [],
  timeData: [],
  forecastResults: [],
  forecastDuration: 0,
  forecastTree: [],
  xValueCategories: [],
  lineOrScatter: "lineChart",
  isYear: true,
  transForecastResult: [],

  qualityAssuranceResults: [],
  qualityAssuranceTree: [],
  qualityAssuranceKeys: [],
  transQualityAssuranceResult: [],

  forecastResultsId: "",
  forecastResultsTitle: "",
  forecastResultsDescription: "",

  selectedForecastingResultsId: "",
  selectedForecastingResultsTitle: "",
  selectedForecastingResultsDescription: "",
  isForecastResultsLoading: false,
  isForecastResultsSaved: false,

  storedDataWorkflows: {
    forecastResultsStored: [],
  },

  forecastResultsAggregated: [],

  selectedForecastData: [],
  loadForecastResultsWorkflow: false,
};

const forecastState = { ...forecastChartState, ...forcastResultState };

export default forecastState;
