import { OrdinalColorScaleConfig } from "@nivo/colors";
import { ComputedDatum } from "@nivo/pie";
import type { FluidValue } from "@react-spring/shared";
import type { Any, Lookup } from "@react-spring/types";
import {
  ScaleBand as D3ScaleBand,
  ScaleLinear as D3ScaleLinear,
  ScaleLogarithmic as D3ScaleLogarithmic,
  ScalePoint as D3ScalePoint,
  ScaleSymLog as D3ScaleSymLog,
  ScaleTime as D3ScaleTime,
} from "d3-scale";
import { SpringValue } from "react-spring";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../Application/Components/Workflows/WorkflowTypes";
import { axisNameTitlesObj } from "../Data/VisualyticsData";
import { TChartTypes } from "./Charts/ChartTypes";

export interface IChartProps {
  chartType?: TChartTypes;
  data?: any[];
  willUseThemeColor?: boolean;
  workflowCategory?: TAllWorkflowCategories;
  reducer?: ReducersType;
  selectedChartOptionTitle?: string;
  defs?: any;
  fill?: any;
  indexBy?: string;
  colors?: OrdinalColorScaleConfig<
    Omit<ComputedDatum<any>, "color" | "fill" | "arc">
  >;
}

export declare type TAxisName = keyof typeof axisNameTitlesObj;
export declare type AxisValue = string | number | Date;
export declare type DatumValue = string | number | Date;
export declare type GridValuesBuilder<T> = T extends number
  ? number[]
  : T extends string
  ? string[]
  : T extends Date
  ? Date[]
  : never;
export declare type GridValues<T extends AxisValue> =
  | number
  | GridValuesBuilder<T>;

export type DoughnutChartType = Record<string, React.Key>[];

export declare const timePrecisions: readonly [
  "millisecond",
  "second",
  "minute",
  "hour",
  "day",
  "month",
  "year"
];
export declare type TIME_PRECISION = typeof timePrecisions[number];

export declare type ScaleAxis = "x" | "y";
export declare type OtherScaleAxis<Axis extends ScaleAxis> = Axis extends "x"
  ? "y"
  : "x";
export declare type NumericValue = {
  valueOf(): number;
};
export declare type StringValue = {
  toString(): string;
};
export declare type ScaleValue = NumericValue | StringValue | Date;
export interface ScaleTypeToSpec {
  linear: ScaleLinearSpec;
  log: ScaleLogSpec;
  symlog: ScaleSymlogSpec;
  point: ScalePointSpec;
  band: ScaleBandSpec;
  time: ScaleTimeSpec;
}
export declare type ScaleType = keyof ScaleTypeToSpec;
export declare type ScaleSpec = ScaleTypeToSpec[keyof ScaleTypeToSpec];
export interface ScaleTypeToScale<Input, Output> {
  linear: ScaleLinear<Output>;
  log: ScaleLog;
  symlog: ScaleSymlog;
  point: ScalePoint<Input>;
  band: ScaleBand<Input>;
  time: ScaleTime<Input>;
}
export declare type Scale<Input, Output> = ScaleTypeToScale<
  Input,
  Output
>[keyof ScaleTypeToScale<Input, Output>];
export declare type ScaleLinearSpec = {
  type: "linear";
  min?: "auto" | number;
  max?: "auto" | number;
  stacked?: boolean;
  reverse?: boolean;
  clamp?: boolean;
  nice?: boolean | number;
};
export interface ScaleLinear<Output>
  extends D3ScaleLinear<number, Output, never> {
  type: "linear";
  stacked: boolean;
}
export interface ScaleLogSpec {
  type: "log";
  base?: number;
  min?: "auto" | number;
  max?: "auto" | number;
}
export interface ScaleLog extends D3ScaleLogarithmic<number, number> {
  type: "log";
}
export interface ScaleSymlogSpec {
  type: "symlog";
  constant?: number;
  min?: "auto" | number;
  max?: "auto" | number;
  reverse?: boolean;
}
export interface ScaleSymlog extends D3ScaleSymLog<number, number> {
  type: "symlog";
}
export declare type ScalePointSpec = {
  type: "point";
};
export interface ScalePoint<Input extends StringValue>
  extends D3ScalePoint<Input> {
  type: "point";
}
export declare type ScaleBandSpec = {
  type: "band";
  round?: boolean;
};
export interface ScaleBand<Input extends StringValue>
  extends D3ScaleBand<Input> {
  type: "band";
}
export declare type ScaleTimeSpec = {
  type: "time";
  format?: "native" | string;
  precision?: TIME_PRECISION;
  min?: "auto" | Date | string;
  max?: "auto" | Date | string;
  useUTC?: boolean;
  nice?: boolean;
};
export interface ScaleTime<Input> extends D3ScaleTime<Input, number> {
  type: "time";
  useUTC: boolean;
}
export declare type Series<
  XValue extends ScaleValue,
  YValue extends ScaleValue
> = {
  data: {
    data: {
      x: XValue | null;
      y: YValue | null;
    };
  }[];
}[];
export declare type SerieAxis<
  Axis extends ScaleAxis,
  Value extends ScaleValue
> = {
  data: {
    data: Record<Axis, Value | null>;
  }[];
}[];
export declare type ComputedSerieAxis<Value extends ScaleValue> = {
  all: Value[];
  min: Value;
  minStacked?: Value;
  max: Value;
  maxStacked?: Value;
};

export declare type TicksSpec<Value extends AxisValue> =
  | number
  | string
  | Value[];
export declare type AxisLegendPosition = "start" | "middle" | "end";
export declare type ValueFormatter<Value extends AxisValue> = (
  value: Value
) => Value | string;
export declare type SpringValues<T extends Lookup = any> = [T] extends [Any]
  ? Lookup<SpringValue<unknown> | undefined>
  : {
      [P in keyof T]: SpringWrap<T[P]>;
    };
declare type SpringWrap<T> = [
  Exclude<T, FluidValue>,
  Extract<T, readonly any[]>
] extends [object | void, never]
  ? never
  : SpringValue<Exclude<T, FluidValue | void>> | Extract<T, void>;

export interface AxisTickProps<Value extends AxisValue> {
  tickIndex: number;
  value: Value;
  format?: ValueFormatter<Value>;
  x: number;
  y: number;
  lineX: number;
  lineY: number;
  textX: number;
  textY: number;
  textBaseline: string;
  textAnchor: string;
  opacity?: number;
  rotate?: number;
  animatedProps: SpringValues<{
    opacity: number;
    textTransform: string;
    transform: string;
  }>;
  onClick?: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    value: Value | string
  ) => void;
}
export interface AxisProps<Value extends AxisValue = any> {
  ticksPosition?: "before" | "after";
  tickValues?: TicksSpec<Value>;
  tickSize?: number;
  tickPadding?: number;
  tickRotation?: number;
  format?: string | ValueFormatter<Value>;
  renderTick?: (props: AxisTickProps<Value>) => JSX.Element;
  legend?: React.ReactNode;
  legendPosition?: AxisLegendPosition;
  legendOffset?: number;
  ariaHidden?: boolean;
}

export declare type CrosshairType =
  | "x"
  | "y"
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "cross";
