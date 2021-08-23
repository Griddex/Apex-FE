import {
  stackedChartToLineOrScatterChartData,
  barChartToStackedChartData,
  stackedChartToDoughnutChartData,
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
];

export const forecastResultsTransformersObj = {
  stackedAreaChart: stackedChartTostackedChartData,
  lineChart: stackedChartToLineOrScatterChartData,
  scatterChart: stackedChartToLineOrScatterChartData,
  barChart: barChartToStackedChartData,
  doughnutChart: stackedChartToDoughnutChartData,
  //TODO do for radar transform
  radarChart: stackedChartToDoughnutChartData,
};
