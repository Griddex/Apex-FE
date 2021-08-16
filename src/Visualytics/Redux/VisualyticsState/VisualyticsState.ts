import { allChartsDataAndOtherProperties } from "../../Data/VisualyticsData";
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

const visualyticsState: IVisualyticsState = {
  selectedChartIndex: 0,
  selectedChartObjId: "",
  chartObjects: [],
  structureObj: { xAxes: [], yAxes: [] },

  formatObj: {
    chartLayoutColor: "white",
    chartSeriesSolidColors: [],
  },

  selectedVisualyticsOption: { label: "Select...", value: "Select..." },

  visualyticsChartsWorkflows: allChartsDataAndOtherProperties,
};
export default visualyticsState;
