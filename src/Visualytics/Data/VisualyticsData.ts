import { Theme } from "@material-ui/core";
import { IChart } from "../Redux/VisualyticsState/VisualyticsStateTypes";
import { ISelectOption } from "./../../Application/Components/Selects/SelectItemsType";
import { format } from "d3-format";

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
  { value: "blues", label: "Blues" },
  { value: "greens", label: "Greens" },
  { value: "greys", label: "Greys" },
  { value: "oranges", label: "Oranges" },
  { value: "purples", label: "Purples" },
  { value: "reds", label: "Reds" },
  { value: "turbo", label: "Turbo" },
  { value: "viridis", label: "Viridis" },
  { value: "inferno", label: "Inferno" },
  { value: "magma", label: "Magma" },
  { value: "plasma", label: "Plasma" },
  { value: "cividis", label: "Cividis" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "cubehelixDefault", label: "Cubehelixdefault" },
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
  { value: "yellow_orange_red", label: "Yellow_Orange_Red" },
];

export const areaBlendOptions = [
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

export const pointsInheritOptions = [{ value: "color", label: "Color" }];

export const pointsThemeOptions = [
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
  { value: "top-left", label: "Top-Left" },
  { value: "x", label: "X" },
  { value: "y", label: "Y" },
  { value: "top", label: "Top" },
  { value: "top-right", label: "Top-Right" },
  { value: "right", label: "Right" },
  { value: "bottom-right", label: "Bottom-Right" },
  { value: "bottom", label: "Bottom" },
  { value: "bottom-left", label: "Bottom-Left" },
  { value: "left", label: "Left" },
  { value: "cross", label: "Cross" },
];

export const motionConfigPresetOptions = [
  { value: "default", label: "Default" },
  { value: "gentle", label: "Gentle" },
  { value: "wobbly", label: "Wobbly" },
  { value: "stiff", label: "Stiff" },
  { value: "slow", label: "Slow" },
  { value: "molasses", label: "Molasses" },
];

export const commonChartProps = {
  //Statcked
  offsetType: "none",

  //Doughnut
  innerRadius: 0.5,
  padAngle: 0.7,
  cornerRadius: 3,
  activeOuterRadiusOffset: 8,
  arcLinkLabelsSkipAngle: 10,
  arcLinkLabelsTextColor: "#333333",
  arcLinkLabelsThickness: 2,
  arcLinkLabelsColor: { from: "color" },
  arcLabelsSkipAngle: 10,
  arcLabelsTextColor: { from: "color", modifiers: [["darker", 2]] },

  //Bar
  labelSkipWidth: 12,
  labelSkipHeight: 12,
  labelTextColor: { from: "color", modifiers: [["darker", 1.6]] },

  //Line
  lineWidth: 2,
  enableArea: false,
  areaBaselineValue: 0,
  areaOpacity: 0.2,
  areaBlendMode: "normal",

  //General
  keys: [],
  colors: { scheme: "category10" },
  margin: { top: 40, right: 100, bottom: 80, left: 80 },
  padding: 0.3,
  role: "", //what's this?
  indexBy: "Year", //TODO here for now
  minValue: "auto",
  maxValue: "auto",
  valueFormat: " >-.0f",
  valueScale: { type: "linear" },
  indexScale: { type: "band", round: true },
  // width: undefined,
  // height: undefined,
  // theme: pretty big object, implement later?

  //Series
  curve: "linear",
  blendMode: "normal",
  borderColor: { from: "color", modifiers: [["darker", 0.2]] },
  borderWidth: 1,
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
    legendOffset: -40,
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
  enableLegend: [false],
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
} as IChart;

export const allChartsDataAndSpecificProperties = {
  commonChartProps,

  stackedAreaChart: {
    data: [],
  },

  lineChart: {
    data: [],
  },

  scatterChart: {
    data: [],
  },

  doughnutChart: {
    data: [],
  },

  barChart: {
    data: [],
  },

  radarChart: {
    data: [],
  },
};
