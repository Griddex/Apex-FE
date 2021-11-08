import { format } from "d3-format";
import {
  visualyticsDataToStackedChartData,
  visualyticsDataToLineOrScatterChartData,
  visualyticsDataToBarOrHeatmapChartData,
  visualyticsDataToDoughnutChartData,
} from "../../Application/Utils/TransformOneVisualyticsDataToAnother";
import { IChart } from "../Redux/State/VisualyticsStateTypes";
import {
  stackedChartToBarChartData,
  stackedChartToDoughnutChartData,
  stackedChartToLineOrScatterChartData,
  stackedChartTostackedChartData,
} from "../Utils/TransformOneChartDataToAnother";
import { ISelectOption } from "./../../Application/Components/Selects/SelectItemsType";

export const forecastChartDataTransformersObj = {
  stackedAreaChart: stackedChartTostackedChartData,
  lineChart: stackedChartToLineOrScatterChartData,
  scatterChart: stackedChartToLineOrScatterChartData,
  barChart: stackedChartToBarChartData,
  doughnutChart: stackedChartToDoughnutChartData,
  radarChart: stackedChartToDoughnutChartData, //TODO do for radar transform
  heatMapChart: stackedChartToBarChartData, //Same data as bar
};

export const visualyticsChartDataTransformersObj = {
  stackedAreaChart: visualyticsDataToStackedChartData,
  lineChart: visualyticsDataToLineOrScatterChartData,
  scatterChart: visualyticsDataToLineOrScatterChartData,
  barChart: visualyticsDataToBarOrHeatmapChartData,
  doughnutChart: visualyticsDataToDoughnutChartData,
  radarChart: () => {}, //TODO do for radar transform
  heatMapChart: visualyticsDataToBarOrHeatmapChartData, //Same data as bar
};

export const axisNameTitlesObj = {
  axisLeft: "Left Axis",
  axisBottom: "Bottom Axis",
  axisTop: "Top Axis",
  axisRight: "Right Axis",
};

export const legendSymbolShapeOptions = [
  {
    value: "circle",
    label: "Circle",
  },
  { value: "diamond", label: "Diamond" },
  { value: "square", label: "Square" },
  { value: "triangle", label: "Triangle" },
];

export const legendItemsDirectionOptions = [
  {
    value: "left-to-right",
    label: "Left-to-Right",
  },
  { value: "right-to-left", label: "Right-to-Left" },
  { value: "top-to-bottom", label: "Top-to-Bottom" },
  { value: "bottom-to-top", label: "Bottom-to-Top" },
];

export const legendAnchorPositions = [
  [
    { value: "top-left", label: "TL", action: () => {} },
    { value: "top", label: "T", action: () => {} },
    { value: "top-right", label: "TR", action: () => {} },
  ],
  [
    { value: "left", label: "L", action: () => {} },
    { value: "center", label: "C", action: () => {} },
    { value: "right", label: "R", action: () => {} },
  ],
  [
    { value: "bottom-left", label: "BL", action: () => {} },
    { value: "bottom", label: "B", action: () => {} },
    { value: "bottom-right", label: "BR", action: () => {} },
  ],
];

// export const pointLabelOptions = [
//   { value: "x", label: "X" },
//   { value: "xFormatted", label: "XFormatted" },
//   { value: "yFormatted", label: "YFormatted" },
//   { value: "yStacked", label: "YStacked" },
// ];

export const offsetTypeOptions = [
  { value: "expand", label: "Expand" },
  { value: "diverging", label: "Diverging" },
  { value: "none", label: "None" },
  { value: "silhouette", label: "Silhouette" },
  { value: "wiggle", label: "Wiggle" },
];

export const orderOptions = [
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
  { value: "insideOut", label: "InsideOut" },
  { value: "none", label: "None" },
  { value: "reverse", label: "Reverse" },
];

export const curveOptions = [
  { value: "basis", label: "Basis" },
  { value: "cardinal", label: "Cardinal" },
  { value: "catmullRom", label: "CatmullRom" },
  { value: "linear", label: "Linear" },
  { value: "monotoneX", label: "MonotoneX" },
  { value: "monotoneY", label: "MonotoneY" },
  { value: "natural", label: "Natural" },
  { value: "step", label: "Step" },
  { value: "stepAfter", label: "StepAfter" },
  { value: "stepBefore", label: "StepBefore" },
] as ISelectOption[];

export const radarCurveOptions = [
  { value: "basisClosed", label: "BasisClosed" },
  { value: "cardinalClosed", label: "CardinalClosed" },
  { value: "catmullRomClosed", label: "CatmullRomClosed" },
  { value: "linearClosed", label: "LinearClosed" },
] as ISelectOption[];

export const colorsOptions = [
  { value: "nivo", label: "Nivo" },
  { value: "category10", label: "Category10" },
  { value: "accent", label: "Accent" },
  { value: "dark2", label: "Dark2" },
  { value: "paired", label: "Paired" },
  { value: "pastel1", label: "Pastel1" },
  { value: "pastel2", label: "Pastel2" },
  { value: "set1", label: "Set1" },
  { value: "set2", label: "Set2" },
  { value: "set3", label: "Set3" },
  { value: "brown_blueGreen", label: "Brown_Bluegreen" },
  { value: "purpleRed_green", label: "Purplered_Green" },
  { value: "pink_yellowGreen", label: "Pink_Yellowgreen" },
  { value: "purple_orange", label: "Purple_Orange" },
  { value: "red_blue", label: "Red_Blue" },
  { value: "red_grey", label: "Red_Grey" },
  { value: "red_yellow_blue", label: "Red_Yellow_Blue" },
  { value: "red_yellow_green", label: "Red_Yellow_Green" },
  { value: "spectral", label: "Spectral" },
  { value: "blues", label: "Blues" },
  { value: "greens", label: "Greens" },
  { value: "greys", label: "Greys" },
  { value: "oranges", label: "Oranges" },
  { value: "purples", label: "Purples" },
  { value: "reds", label: "Reds" },
  { value: "blue_green", label: "Blue_Green" },
  { value: "blue_purple", label: "Blue_Purple" },
  { value: "green_blue", label: "Green_Blue" },
  { value: "orange_red", label: "Orange_Red" },
  { value: "purple_blue_green", label: "Purple_Blue_Green" },
  { value: "purple_blue", label: "Purple_Blue" },
  { value: "purple_red", label: "Purple_Red" },
  { value: "red_purple", label: "Red_Purple" },
  { value: "yellow_green_blue", label: "Yellow_Green_Blue" },
  { value: "yellow_green", label: "Yellow_Green" },
  { value: "yellow_orange_brown", label: "Yellow_Orange_Brown" },
  { value: "yellow_orange_red", label: "Yellow_Orange_Red" },
  // { value: "turbo", label: "Turbo" },
  // { value: "viridis", label: "Viridis" },
  // { value: "inferno", label: "Inferno" },
  // { value: "magma", label: "Magma" },
  // { value: "plasma", label: "Plasma" },
  // { value: "cividis", label: "Cividis" },
  // { value: "warm", label: "Warm" },
  // { value: "cool", label: "Cool" },
  // { value: "cubehelixDefault", label: "Cubehelixdefault" },
];

export const blendModeOptions = [
  { value: "normal", label: "Normal" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "overlay", label: "Overlay" },
  { value: "darken", label: "Darken" },
  { value: "lighten", label: "Lighten" },
  { value: "color-dodge", label: "Color-Dodge" },
  { value: "color-burn", label: "Color-Burn" },
  { value: "hard-light", label: "Hard-Light" },
  { value: "soft-light", label: "Soft-Light" },
  { value: "difference", label: "Difference" },
  { value: "exclusion", label: "Exclusion" },
  { value: "hue", label: "Hue" },
  { value: "saturation", label: "Saturation" },
  { value: "color", label: "Color" },
  { value: "luminosity", label: "Luminosity" },
];

export const gridShapeOptions = [
  { value: "circular", label: "Circular" },
  { value: "linear", label: "Linear" },
];

export const axisTitlePositionOptions = [
  { value: "start", label: "Start" },
  { value: "middle", label: "Middle" },
  { value: "end", label: "End" },
];

export const plotMargins = [
  [
    { value: 50, label: "top", width: 130, action: () => {} },
    { value: 110, label: "right", width: 130, action: () => {} },
  ],
  [
    { value: 50, label: "bottom", width: 130, action: () => {} },
    { value: 60, label: "left", width: 130, action: () => {} },
  ],
];

export const scaleOptions = [
  { value: "linear", label: "Linear" },
  { value: "point", label: "Point" },
];

export const valueScaleOptions = [
  { value: "linear", label: "Linear" },
  { value: "symlog", label: "SymLog" },
];

export const indexScaleOptions = [{ value: "band", label: "Band" }];

export type TAxisType = keyof typeof axisNameTitlesObj;

export const valueTypeOptions = [
  {
    value: undefined,
    label: "none",
    description: "none",
  },
  {
    value: "e",
    label: "e",
    description: "exponent notation.",
  },
  {
    value: "f",
    label: "f",
    description: "fixed point notation.",
  },
  {
    value: "g",
    label: "g",
    description:
      "either decimal or exponent notation, rounded to significant digits.",
  },
  {
    value: "r",
    label: "r",
    description: "decimal notation, rounded to significant digits.",
  },
  {
    value: "s",
    label: "s",
    description:
      "decimal notation with an SI prefix, rounded to significant digits.",
  },
  {
    value: "%",
    label: "%",
    description:
      "multiply by 100, and then decimal notation with a percent sign.",
  },
  {
    value: "p",
    label: "p",
    description:
      "multiply by 100, round to significant digits, and then decimal notation with a percent sign.",
  },
  {
    value: "b",
    label: "b",
    description: "binary notation, rounded to integer.",
  },
  {
    value: "o",
    label: "o",
    description: "octal notation, rounded to integer.",
  },
  {
    value: "d",
    label: "d",
    description: "decimal notation, rounded to integer.",
  },
  {
    value: "x",
    label: "x",
    description:
      "hexadecimal notation, using lower-case letters, rounded to integer.",
  },
  {
    value: "X",
    label: "X",
    description:
      "hexadecimal notation, using upper-case letters, rounded to integer.",
  },
  {
    value: "c",
    label: "c",
    description:
      "converts the integer to the corresponding unicode character before printing.",
  },
];

export const valueAlignOptions = [
  {
    value: ">",
    label: ">",
    description:
      "Force the field to be right-aligned within the available space.",
  },
  {
    value: "<",
    label: "<",
    description:
      "Force the field to be left-aligned within the available space.",
  },
  {
    value: "^",
    label: "^",
    description: "Force the field to be centered within the available space.",
  },
  {
    value: "=",
    label: "=",
    description:
      "like >, but with any sign and symbol to the left of any padding.",
  },
];

export const valueSignOptions = [
  {
    value: "-",
    label: "-",
    description: "nothing for zero or positive and a minus sign for negative.",
  },
  {
    value: "+",
    label: "+",
    description:
      "a plus sign for zero or positive and a minus sign for negative.",
  },
  {
    value: "(",
    label: "(",
    description: "nothing for zero or positive and parentheses for negative.",
  },
  {
    value: " ",
    label: "(space)",
    description: "a space for zero or positive and a minus sign for negative.",
  },
];

export const valueSymbolOptions = [
  {
    value: undefined,
    label: "none",
  },
  {
    value: "#",
    label: "#",
  },
  {
    value: "$",
    label: "$",
  },
];

export const pointLabelOptions = [
  {
    value: "y",
    label: "Y",
  },
  {
    value: "yFormatted",
    label: "YFormatted",
  },
  {
    value: "x",
    label: "X",
  },
  {
    value: "xFormatted",
    label: "XFormatted",
  },
  {
    value: "d => ${d.x}: ${d.y}",
    label: "d => ${d.x}: ${d.y}",
  },
];

export const visualyticsInheritOptions = [{ value: "color", label: "Color" }];

export const visualyticsThemeOptions = [
  { value: "background", label: "Background" },
  { value: "grid.line.stroke", label: "Grid.Line.Stroke" },
  { value: "labels.text.fill", label: "Labels.Text.Fill" },
];

export const enableSlicesOptions = [
  { value: "false", label: "false" },
  { value: "x", label: "X" },
  { value: "y", label: "Y" },
];

export const crosshairTypeOptions = [
  { value: "x", label: "X" },
  { value: "y", label: "Y" },
  { value: "cross", label: "Cross" },
  { value: "top-left", label: "Top-Left" },
  { value: "top", label: "Top" },
  { value: "top-right", label: "Top-Right" },
  { value: "right", label: "Right" },
  { value: "bottom-right", label: "Bottom-Right" },
  { value: "bottom", label: "Bottom" },
  { value: "bottom-left", label: "Bottom-Left" },
  { value: "left", label: "Left" },
];

export const motionConfigPresetOptions = [
  { value: "default", label: "Default" },
  { value: "gentle", label: "Gentle" },
  { value: "wobbly", label: "Wobbly" },
  { value: "stiff", label: "Stiff" },
  { value: "slow", label: "Slow" },
  { value: "molasses", label: "Molasses" },
];

export const hoverTargetOptions = [
  { value: "cell", label: "Cell" },
  { value: "row", label: "Row" },
  { value: "column", label: "Column" },
  { value: "rowColumn", label: "RowColumn" },
];

export const labelOptions = [
  {
    value: "id",
    label: "Id",
  },
  {
    value: "value",
    label: "Value",
  },
  {
    value: "formattedValue",
    label: "FormattedValue",
  },
  {
    value: "d => ${d.id}: ${d.value}",
    label: "d => ${d.id}: ${d.value}",
  },
];

export const arcLabelOptions = [
  {
    value: "id",
    label: "Id",
  },
  {
    value: "value",
    label: "Value",
  },
  {
    value: "formattedValue",
    label: "FormattedValue",
  },
  {
    value: "d => ${d.id}: ${d.value}",
    label: "d => ${d.id}: ${d.value}",
  },
];

export const arcLinkLabelOptions = [
  {
    value: "id",
    label: "Id",
  },
  {
    value: "value",
    label: "Value",
  },
  {
    value: "d => ${d.id}: ${d.value}",
    label: "d => ${d.id}: ${d.value}",
  },
];

export const dotLabelOptions = [
  {
    value: "index",
    label: "Index",
  },
  {
    value: "key",
    label: "Key",
  },
  {
    value: "d => ${d.index}: ${d.value}",
    label: "d => ${d.index}: ${d.value}",
  },
  {
    value: "d => ${d.key}: ${d.value}",
    label: "d => ${d.key}: ${d.value}",
  },
];

export const colorModifierOptions = [
  {
    value: "darker",
    label: "Darker",
  },
  {
    value: "brighter",
    label: "Brighter",
  },
  {
    value: "opacity",
    label: "Opacity",
  },
];

export const commonChartProps = {
  //Stacked
  offsetType: "none",
  order: "none",

  //Doughnut
  startAngle: 0,
  endAngle: 360,
  fit: true,
  innerRadius: 0.5,
  padAngle: 0.7,
  cornerRadius: 3,
  sortByValue: false,
  enableArcLabels: true,
  arcLabel: "formattedValue",
  arcLabelsRadiusOffset: 0.5,
  activeInnerRadiusOffset: 0,
  activeOuterRadiusOffset: 8,

  enableArcLinkLabels: true,
  arcLinkLabel: "id",
  arcLinkLabelsOffset: 0,
  arcLinkLabelsDiagonalLength: 16,
  arcLinkLabelsStraightLength: 24,
  arcLinkLabelsTextOffset: 6,
  arcLinkLabelsSkipAngle: 10,
  arcLinkLabelsTextColor: "#333333",
  arcLinkLabelsThickness: 2,
  arcLinkLabelsColor: { from: "color" },
  arcLabelsSkipAngle: 10,
  arcLabelsTextColor: { from: "color", modifiers: [["darker", 2]] },

  //Bar
  groupMode: "stacked",
  layout: "vertical",
  innerPadding: 0,
  enableLabel: true,
  label: "formattedValue",
  labelSkipWidth: 12,
  labelSkipHeight: 12,
  labelTextColor: { from: "color", modifiers: [["darker", 1.6]] },
  reverse: false,
  valueFormatString: " >-.0f",

  //Line
  lineWidth: 2,
  enableArea: false,
  areaBaselineValue: 0,
  areaOpacity: 0.2,
  areaBlendMode: "normal",

  //Scatter
  nodeSize: 9,

  //Radar
  gridLevels: 5,
  gridShape: "circular",
  gridLabelOffset: 36,
  enableDotLabel: true,
  dotLabel: "value",
  dotLabelYOffset: -12,

  //HeatMap
  forceSquare: true,
  sizeVariation: 0,
  cellOpacity: 1,
  cellBorderWidth: 0,
  cellBorderColor: { from: "color", modifiers: [["darker", 0.4]] },

  //Series
  keys: [],
  colors: { scheme: "category10" },
  margin: { top: 40, right: 250, bottom: 80, left: 80 },
  padding: 0.3,
  role: "", //what's this?
  indexBy: "Year", //TODO here for now
  minValue: "auto",
  maxValue: "auto",
  valueFormat: (v) =>
    `${Number(v).toLocaleString("en-US", { maximumFractionDigits: 1 })}`,
  // valueFormat: " >-.0f",
  valueScale: { type: "linear" },
  indexScale: { type: "band", round: true },
  // theme: pretty big object, implement later?

  //Series
  curve: "linear",
  blendMode: "normal",
  borderColor: { from: "color", modifiers: [["darker", 0.2]] },
  borderWidth: 0,
  fillOpacity: 1,

  //Dots
  enableDots: false,
  dotBorderColor: { from: "color", modifiers: [["darker", 0.2]] },
  dotBorderWidth: 1,
  dotColor: { from: "color", modifiers: [["darker", 0.2]] },
  dotSize: 8,
  //markers: "", can't find in linechart

  //POINTS;
  enablePoints: true,
  pointSize: 10,
  pointColor: { from: "color", modifiers: [] },
  pointBorderWidth: 2,
  pointBorderColor: { from: "serieColor", modifiers: [] },
  pointLabelYOffset: -12,
  enablePointLabel: false,
  pointLabel: "yFormatted",

  //Motion
  isInteractive: true,
  animate: true,
  motionConfig: "default",
  renderWrapper: true,
  useMesh: true,
  enableSlices: false,
  enableCrosshair: true,
  crosshairType: "cross",
  hoverTarget: "cell",
  cellHoverOpacity: 1,
  cellHoverOthersOpacity: 0.25,
  // motionDamping: "", confirm if still needed
  // motionStiffness: "",

  //Tooltip
  tooltip: undefined,
  // tooltip: () => {},
  tooltipFormat: undefined,
  // tooltipFormat: " >-.0f",
  tooltipLabel: undefined,
  enableStackTooltip: true,

  //Axis
  axisTop: undefined,
  axisRight: undefined,
  axisBottom: {
    axisEnabled: true,
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    format: (v) => format(" >-.0f")(v),
    legend: "",
    legendOffset: 36,
    legendPosition: "middle",
  },
  axisLeft: {
    axisEnabled: true,
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    format: (v) => format(" >-.0f")(v),
    legend: "",
    legendOffset: -70,
    legendPosition: "middle",
  },
  enableApexAxes: {
    axisLeft: true,
    axisBottom: true,
    axisTop: false,
    axisRight: false,
  },

  //Grid
  enableGridX: true,
  enableGridY: true,
  gridXValues: undefined,
  gridYValues: undefined,

  //Handlers
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseMove: () => {},

  //Scales
  xScale: { type: "point" },
  xFormat: " >-.0f",
  yScale: {
    type: "linear",
    min: "auto",
    max: "auto",
    stacked: false,
    reverse: false,
  },
  yFormat: (v) => format(" >-.0f")(v as number),
  yFormatString: " >-.0f",

  //Definitions
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

  //Fill
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

  //Legend
  enableLegend: true,
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
      symbolShape: "square",
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
} as IChart;

export const allChartsDataAndSpecificProperties = {
  commonChartProps,

  stackedAreaChart: {
    chartData: [],
  },

  lineChart: {
    chartData: [],
  },

  scatterChart: {
    chartData: [],
  },

  doughnutChart: {
    chartData: [],
  },

  barChart: {
    chartData: [],
  },

  radarChart: {
    chartData: [],
  },

  heatMapChart: {
    chartData: [],
  },
};
