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
    value: "module",
    label: "Module...",
  },
  {
    value: "drainagePoint",
    label: "Drainage Point",
  },
  {
    value: "station",
    label: "Station",
  },
  {
    value: "scenario",
    label: "Scenario",
  },
  {
    value: "field",
    label: "Field",
  },
  {
    value: "reservoir",
    label: "Reservoir",
  },
  {
    value: "project",
    label: "Project",
  },
  {
    value: "hydrocarbonStream",
    label: "Hydrocarbon Stream",
  },
  {
    value: "hydrocarbonType",
    label: "Hydrocarbon Type",
  },
  {
    value: "resourceClass",
    label: "Resource Class",
  },
  {
    value: "developmentTranche",
    label: "Development Tranche",
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

export const newUserForecastParametersRow = {
  sn: 1,
  forecastingParametersId: "",
  forecastInputDeckId: "",
  forecastInputdeckTitle: "",
  title: "New Title",
  description: "New Description",
  type: "User",
  wellDeclineParameterId: "",
  wellPrioritizationId: "",
  wellDeclineParameterTitle: "",
  wellPrioritizationTitle: "",
  targetFluid: "Oil",
  timeFrequency: "Monthly",
  isDefered: "noDeferment",
  realtimeResults: "no",
  startForecast: "",
  endForecast: "",
  author: {
    avatarUrl: "",
    name: "None",
  },
  createdOn: "",
  modifiedOn: "",
};
