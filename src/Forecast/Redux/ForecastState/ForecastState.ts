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
  selectedChartIndex: 0,
  selectedChartObjId: "",
  forecastChartObjects: [],
  structureObj: { xAxes: [], yAxes: [] },
  // forecastChartObjName: "None",
  formatObj: {
    forecastChartLayoutColor: "white",
    forecastChartSeriesSolidColors: [
      "#31BFCC",
      "#DA1B57",
      "#00C49F",
      "#F5B400",
      "#aaf9a7",
      "#7b51f7",
      "#e8d214",
      "#baf993",
      "#ffdd6d",
      "#c6c900",
      "#84ce23",
      "#aafc5d",
      "#fcfab8",
      "#63dd88",
      "#8c85e2",
      "#fcc2e0",
      "#fc4bd9",
      "#e560a2",
      "#30c1a4",
      "#bf67ef",
      "#296ff2",
      "#4ee5dd",
      "#d14ff2",
      "#c6ef4a",
      "#43d815",
      "#47c66b",
      "#3bef17",
      "#ffd400",
      "#ed814b",
      "#4af9e5",
      "#a6a7f4",
      "#b9e283",
      "#73f4c5",
      "#f7bcb9",
      "#86f9ea",
      "#102ccc",
      "#f6c7fc",
      "#ff7e7a",
      "#e975ef",
      "#fc0093",
      "#b3f4a1",
      "#db2e6d",
      "#c42623",
      "#aedd6c",
      "#4b2296",
      "#c3e27f",
      "#baea5b",
      "#ea98e5",
      "#f9967a",
      "#cc94ef",
      "#e800e4",
      "#cc474e",
      "#c258ef",
      "#686cd1",
      "#6a3ad1",
      "#b2ffb7",
      "#e07981",
      "#f2a7e3",
      "#e87fca",
      "#e20498",
      "#225896",
      "#1f5f7f",
      "#ff00f2",
      "#ea2096",
      "#71edd6",
      "#d624af",
      "#edb023",
      "#6a65ed",
      "#b1d5ed",
      "#344cba",
      "#13c161",
      "#8cc10f",
      "#5f48b5",
      "#f0ffaa",
      "#d659aa",
      "#29d895",
      "#fc8874",
      "#2560c6",
      "#ba6618",
      "#bfe579",
      "#12b51f",
      "#dd37b9",
      "#e28aa6",
      "#5858c9",
      "#aca3ff",
      "#957bfc",
      "#4ce86b",
      "#430f8c",
      "#9d8de0",
      "#57db97",
      "#9cf4c2",
      "#96dd58",
      "#ddae56",
      "#ffb291",
      "#3ed8a5",
      "#a371d6",
      "#66fc3c",
      "#72db95",
      "#2fd319",
      "#c9413a",
      "#5b27dd",
      "#ca15ea",
      "#850ef4",
      "#ba1833",
      "#d81cc2",
      "#f40919",
      "#d66d1d",
      "#4df230",
      "#bef293",
      "#194e7f",
      "#7452af",
      "#d16a10",
      "#f9e7c0",
      "#4acde8",
      "#d83836",
      "#5bf7d0",
      "#b177ef",
      "#f78fc1",
      "#62dbb7",
      "#91f2d3",
      "#0faa55",
      "#a0efef",
      "#cb96ea",
      "#f9acc6",
      "#80ed90",
      "#44ffe3",
      "#eff957",
      "#a824e5",
      "#12968f",
      "#48ce82",
      "#e8c0f9",
      "#db698b",
      "#ef40a6",
      "#64bee5",
      "#ed3910",
      "#e258d9",
      "#bdf9a9",
      "#c18a3c",
      "#d60883",
      "#f4a1c5",
      "#ef4c9e",
      "#923ef2",
      "#fcba6f",
      "#809610",
      "#8f6bea",
      "#f9783b",
      "#e89681",
      "#dfe569",
      "#01c61c",
      "#b22552",
      "#ffe6cc",
      "#2f0b82",
      "#fcbdcb",
      "#dee24f",
      "#31eff9",
      "#d3a61d",
      "#89e5c3",
      "#f20ce6",
      "#52ea87",
      "#7aed78",
      "#e56ea5",
      "#d3872a",
      "#b3e074",
      "#69a3ef",
      "#8961d3",
      "#caf7a0",
      "#08d1bd",
      "#bbb2f4",
      "#ffddcc",
      "#ef9023",
      "#f9b1d6",
      "#f49b53",
      "#0808d8",
      "#59db5c",
      "#9bfffa",
      "#168bce",
      "#4640ef",
      "#9ed30a",
      "#00873c",
      "#52e21d",
      "#e22d6f",
      "#dadd2a",
      "#e8c9ff",
      "#f29691",
      "#a9f9d9",
      "#86f4ba",
      "#ce39ba",
      "#e8c53a",
      "#867fe0",
      "#e89bbf",
      "#dbc732",
      "#e5b95b",
      "#c4f791",
      "#c7ed6f",
      "#9cf4cb",
      "#ed9ae2",
      "#edc812",
      "#e2465d",
      "#e00fe0",
      "#d84be5",
      "#5fd345",
      "#f9eb7a",
      "#a912e5",
      "#4cffd5",
      "#092eb7",
      "#7736a5",
      "#d8a252",
      "#8be2f9",
      "#6c54f2",
      "#cec812",
      "#3207bf",
      "#21c457",
      "#ef7d4c",
      "#db844a",
      "#707bc9",
      "#9ced76",
      "#f9cb6d",
      "#8d9bdd",
      "#efa1a0",
      "#f71d7c",
      "#61dd99",
      "#b872ff",
      "#e5dd44",
      "#45d393",
      "#63f2e8",
      "#bd43d8",
      "#3574b7",
      "#b57e38",
      "#4051b2",
      "#ea09b6",
      "#91e27a",
      "#9586d8",
      "#42ed09",
      "#d2f4a1",
      "#efe070",
      "#a979d1",
      "#5678ce",
      "#f4ed9f",
      "#0b7c0f",
      "#f7ed67",
      "#edbdaa",
      "#bc6fed",
      "#7ef733",
      "#6e74dd",
      "#e0732a",
      "#f7eaa0",
      "#bc46fc",
      "#0146bc",
      "#d38817",
      "#bc3203",
      "#0385c6",
      "#a966e8",
      "#a1ed1e",
      "#9364ba",
      "#d657ed",
      "#e544cd",
      "#ea9ff4",
      "#b54630",
      "#e1a9f2",
      "#cb25ed",
      "#3fffa5",
      "#a3ed71",
      "#88c3e0",
      "#f7bed8",
      "#f2d498",
      "#db2e39",
      "#81b1ef",
      "#afffd2",
      "#fcb5dc",
      "#e55b4b",
      "#efd892",
      "#f4a8e8",
      "#efb28f",
      "#a3e268",
      "#55d6a7",
      "#89e80d",
      "#8b27ba",
      "#9be534",
      "#ffd86d",
      "#a4ce48",
      "#fc5c2f",
      "#f2bf48",
      "#20d89e",
      "#33c433",
      "#93f9b9",
      "#4b3ea0",
      "#77d63b",
      "#79e026",
      "#83a814",
      "#f74d4a",
      "#fcedbd",
      "#099614",
      "#ccccff",
      "#dda22c",
      "#afd5ed",
      "#46d6c0",
      "#e2ef4f",
      "#7ebbd3",
      "#0906d6",
      "#73ef34",
      "#a1ea77",
      "#62e05e",
      "#81cdd1",
      "#db81b2",
    ],
  },
};

const forcastResultState: IForecastResultState = {
  forecastResult: [],
  forecastTree: { id: "", name: "", children: [] },
};

const forcastState = { ...forecastChartState, ...forcastResultState };

export default forcastState;