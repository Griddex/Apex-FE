import { ComputedDatum as BarComputedDatum } from "@nivo/bar";
import { InheritedColorConfig, OrdinalColorScaleConfig } from "@nivo/colors";
import {
  Box,
  DatumValue,
  ModernMotionProps,
  PropertyAccessor,
  StackOffset,
  StackOrder,
  ValueFormat,
} from "@nivo/core";
import { Datum } from "@nivo/legends";
import { PointTooltip } from "@nivo/line";
import { PointData } from "@nivo/radar";
import { TooltipLabel } from "@nivo/stream";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import { IInputState } from "../../../Import/Redux/State/InputStateTypes";
import {
  AxisProps,
  CrosshairType,
  ScaleBandSpec,
  ScaleSpec,
} from "../../Components/ChartTypes";
import { RenderTree } from "../../Components/TreeView/ApexTreeViewTypes";
import { allChartsDataAndSpecificProperties } from "../../Data/VisualyticsData";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import {
  chartObjectsNameTitleMap,
  initialColorGradient,
} from "./VisualyticsState";

export type chartObjNameType = keyof typeof chartObjectsNameTitleMap;
export interface IChartObject {
  chartObjId: string;
  chartObjName: chartObjNameType;
  formatObj?: {
    colorScheme: "solid" | "gradient";
    color?: string;
    gradient?: colorGradient;
  };
}

export type TAllChartsDataAndSpecificProperties =
  typeof allChartsDataAndSpecificProperties;
export interface IVisualyticsState {
  selectedChartIndex: number;
  selectedChartObjId: string;

  chartObjects: IChartObject[];
  formatObj: {
    chartLayoutColor: "white";
    chartSeriesSolidColors: string[];
  };

  selectedTableData: any[];

  structureObj: {
    xAxes: { xAxisId: string }[];
    yAxes: { yAxisId: string }[];
  };

  visualyticsResults: any[];
  visualyticsTree: RenderTree;
  xValueCategories: string[];
  lineOrScatter: "line" | "scatter";
  isYear: boolean;
  transVisualyticsResult: any[];
  visualyticsResultsId: string;

  showPlotChartsCategories: boolean;

  loadVisualyticsWorkflow: boolean;
  selectedVisualyticsChartOption: ISelectOption;
  selectedVisualyticsId: string;
  selectedVisualyticsTitle: string;
  selectedVisualyticsDescription: string;
  isVisualyticsDeckSaved: boolean;
  visualyticsColumnNames: string[];

  visualyticsVariableXOption: ISelectOption | null;
  visualyticsVariableYOption: ISelectOption | null;
  visualyticsVariableZOption: ISelectOption | null;

  visualyticsDataWorkflows: Record<string, IInputState>;
  storedDataWorkflows: Record<"visualyticsDeckStored", IStoredDataRow[]>;
  visualyticsChartsWorkflows: TAllChartsDataAndSpecificProperties;

  errors: any[];
}

export interface ICharts {
  [index: number]: () => JSX.Element;
}
export interface IChartMetaData {
  activeIndex?: number;
  chartAreaBorder?: number;
  activeDataKey?: string;
}
export interface IChartLayoutProps {
  chartLayoutColor?: string;
  chartLayoutGradient?: string;
  chartMetaData?: IChartMetaData;
}

export type colorGradient = typeof initialColorGradient;
export interface StreamLayerDatum {
  index: number;
  x: number;
  value: number;
  y1: number;
  y2: number;
}

export interface StackedComputedDatum {
  id: number;
  layer: StreamLayerDatum[];
  path: string;
  color: string;
}

interface DotDatum extends StreamLayerDatum {
  id: string;
  color: string;
}

export interface ChartComputedDatum<RawDatum> {
  bar: BarComputedDatum<RawDatum>;
  stacked: StackedComputedDatum;
}

export interface ITooltipLabel<
  T = Datum,
  RawDatum = Record<string, string | number>
> {
  stackedArea: TooltipLabel<T> | undefined;
  // | string
  scatter: PointTooltip;
  bar: PropertyAccessor<BarComputedDatum<RawDatum>, string>;
}

export type TCurve =
  | "linear"
  | "basis"
  | "cardinal"
  | "catmullRom"
  | "monotoneX"
  | "monotoneY"
  | "natural"
  | "step"
  | "stepAfter"
  | "stepBefore"
  | undefined;

export type TAreaBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "lighten"
  | "darken"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export interface IChart<RawDatum = Record<string, string | number>, T = Datum> {
  //Stacked
  offsetType: StackOffset;
  order: StackOrder;

  //Doughnut
  startAngle: number;
  endAngle: number;
  fit: boolean;
  innerRadius: number;
  padAngle: number;
  cornerRadius: number;
  sortByValue: boolean;
  enableArcLabels: boolean;
  arcLabel: PropertyAccessor<Datum, string>;
  arcLabelsRadiusOffset: number;
  arcLabelsSkipAngle: number;
  arcLabelsTextColor: InheritedColorConfig<Datum>;
  activeInnerRadiusOffset: number;
  activeOuterRadiusOffset: number;

  enableArcLinkLabels: boolean;
  arcLinkLabel: PropertyAccessor<Datum, string>;
  arcLinkLabelsOffset: number;
  arcLinkLabelsDiagonalLength: number;
  arcLinkLabelsStraightLength: number;
  arcLinkLabelsTextOffset: number;
  arcLinkLabelsSkipAngle: number;
  arcLinkLabelsTextColor: InheritedColorConfig<Datum>;
  arcLinkLabelsThickness: number;
  arcLinkLabelsColor: InheritedColorConfig<Datum>;

  //Bar
  groupMode: "grouped" | "stacked";
  layout: "horizontal" | "vertical";
  innerPadding: number;
  enableLabel: boolean;
  label: string;
  labelSkipWidth: number;
  labelSkipHeight: number;
  labelTextColor: any;
  reverse: boolean;
  valueFormatString: string;
  // labelTextColor: InheritedColorConfig<Datum>;

  //Line
  lineWidth: number;
  enableArea: boolean;
  areaBaselineValue: number;
  areaOpacity: number;
  areaBlendMode: string; //TODO provide real type?

  //Scatter
  nodeSize: number;

  //Radar
  gridLevels: number;
  gridShape: "circular" | "linear";
  gridLabelOffset: number;
  enableDotLabel: boolean;
  dotLabel: string;
  dotLabelYOffset: number;

  //HeatMap
  forceSquare: boolean;
  sizeVariation: number;
  cellOpacity: number;
  cellBorderWidth: number;
  cellBorderColor: InheritedColorConfig<Datum>;

  //Series
  keys: string[];
  colors: OrdinalColorScaleConfig;
  margin: Box;
  padding: number;
  role: string; //what's this?
  indexBy: PropertyAccessor<RawDatum, string>;
  minValue: "auto" | number;
  maxValue: "auto" | number;
  valueFormat: ValueFormat<DatumValue>;
  valueScale: ScaleSpec;
  indexScale: ScaleBandSpec;
  // width: number | undefined;
  // height: number | undefined;
  // theme: pretty big object, implement later?

  //Series
  curve: TCurve;
  blendMode: TAreaBlendMode;
  borderColor: any;
  // borderColor: InheritedColorConfig<
  //   StackedComputedDatum | Record<"color" | "key", string>
  // >;
  // | InheritedColorConfig<Record<"color" | "key", string>>;
  borderWidth: number;
  fillOpacity: number;

  //Dots
  enableDots: boolean;
  dotBorderColor: InheritedColorConfig<PointData | DotDatum>;
  dotBorderWidth: number;
  dotColor: InheritedColorConfig<PointData | DotDatum>;
  dotSize: number;
  //markers: "", can't find in linechart

  //POINTS
  enablePoints: boolean;
  pointSize: number;
  pointColor: InheritedColorConfig<Datum>;
  pointBorderWidth: number;
  pointBorderColor: InheritedColorConfig<Datum>;
  pointLabelYOffset: number;
  enablePointLabel: boolean;
  pointLabel: string;

  //Interactivity and Motion
  isInteractive: boolean;
  useMesh: boolean;
  enableSlices: false | "x" | "y";
  animate: ModernMotionProps["animate"];
  motionConfig: ModernMotionProps["motionConfig"];
  renderWrapper: boolean;
  enableCrosshair?: boolean;
  crosshairType?: CrosshairType;
  hoverTarget: "cell" | "row" | "column" | "rowColumn";
  cellHoverOpacity: number;
  cellHoverOthersOpacity: number;
  // motionDamping: "", confirm if still needed
  // motionStiffness: "",

  //Tooltip
  tooltip: any;
  // tooltip:
  //   | React.FC<PieTooltipProps<RawDatum>>
  //   | React.FC<BarTooltipProps<RawDatum>>
  //   | PointTooltip
  //   | CustomTooltip;
  tooltipFormat: any;
  // tooltipFormat: TooltipFormatter<T> | string | ValueFormat<DatumValue>;
  tooltipLabel: any;
  // tooltipLabel:
  //   | undefined
  //   | TooltipLabel<T>
  //   | PointTooltip
  //   | Exclude<PropertyAccessor<BarComputedDatum<RawDatum>, string>,string>;
  enableStackTooltip: boolean;

  //Axis
  axisTop: AxisProps | undefined;
  axisRight: AxisProps | undefined;
  axisBottom: AxisProps | undefined;
  axisLeft: AxisProps | undefined;
  // axisTop: AxisProps | null | undefined;
  // axisRight: AxisProps | null | undefined;
  // axisBottom: AxisProps | null | undefined;
  // axisLeft: AxisProps | null | undefined;
  enableApexAxes: {
    axisLeft: boolean;
    axisBottom: boolean;
    axisTop: boolean;
    axisRight: boolean;
  };

  //Grid
  enableGridX: boolean;
  enableGridY: boolean;
  gridXValues: any;
  // gridXValues: TicksSpec<DatumValue>;
  gridYValues: any;
  // gridYValues: TicksSpec<DatumValue>;

  //Handlers
  onClick: any;
  // onClick:
  //   | PointMouseHandler
  //   | MouseEventHandler<RawDatum, ElementType>
  //   | MouseHandler;
  onMouseEnter: any;
  // onMouseEnter:
  //   | PointMouseHandler
  //   | MouseEventHandler<RawDatum, ElementType>
  //   | MouseHandler;
  onMouseLeave: any;
  // onMouseLeave:
  //   | PointMouseHandler
  //   | MouseEventHandler<RawDatum, ElementType>
  //   | MouseHandler;
  onMouseMove: any;
  // onMouseMove:
  //   | PointMouseHandler
  //   | MouseEventHandler<RawDatum, ElementType>
  //   | MouseHandler;

  //Scales
  xScale: ScaleSpec;
  xFormat: ValueFormat<DatumValue>;
  yScale: ScaleSpec;
  yFormat: ValueFormat<DatumValue>;
  yFormatString: string;

  //Definitions
  defs: any;
  // defs: SvgDefsAndFill<Datum>["defs"];

  //Fill
  fill: any;
  // fill: SvgDefsAndFill<Datum>["fill"];

  //Legend
  enableLegend: boolean;
  legends: any[];
  // legends: LegendProps[] | BarLegendProps[];
}
