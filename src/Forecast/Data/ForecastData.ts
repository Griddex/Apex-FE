import {
  stackedChartToBarChartData,
  stackedChartToDoughnutChartData,
  stackedChartToLineOrScatterChartData,
  stackedChartTostackedChartData,
} from "../Utils/TransformOneChartDataToAnother";

export const forecastAggregationTypes = [
  {
    value: "yearly",
    label: "Yearly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
];

export const forecastAggregationLevels = [
  {
    value: "select",
    label: "Select...",
  },
  {
    value: "none",
    label: "None...",
  },
  {
    value: "station",
    label: "Station",
  },
  {
    value: "scenario",
    label: "Scenario",
  },
];

export const forecastPlotChartsOptions = [
  {
    value: "Select Chart...",
    label: "Select Chart...",
  },
  {
    value: "stackedAreaChart",
    label: "Stacked Area",
  },
  {
    value: "lineChart",
    label: "Line",
  },
  {
    value: "doughnutChart",
    label: "Doughnut",
  },
  {
    value: "barChart",
    label: "Bar",
  },
  {
    value: "scatterChart",
    label: "Scatter",
  },
];

export const forecastResultsTransformersObj = {
  stackedAreaChart: stackedChartTostackedChartData,
  lineChart: stackedChartToLineOrScatterChartData,
  scatterChart: stackedChartToLineOrScatterChartData,
  barChart: stackedChartToBarChartData,
  doughnutChart: stackedChartToDoughnutChartData,
  //TODO do for radar transform
  radarChart: stackedChartToDoughnutChartData,
};
