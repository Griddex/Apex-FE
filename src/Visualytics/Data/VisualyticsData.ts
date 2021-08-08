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

export const pointLabelOptions = [
  { value: "x", label: "X" },
  { value: "xFormatted", label: "XFormatted" },
  { value: "yFormatted", label: "YFormatted" },
  { value: "yStacked", label: "YStacked" },
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
];

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

export const plotMargins = [
  [
    { value: 50, label: "Top", action: () => {} },
    { value: 110, label: "Right", action: () => {} },
  ],
  [
    { value: 50, label: "Bottom", action: () => {} },
    { value: 60, label: "Left", action: () => {} },
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
