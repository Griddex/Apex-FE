import { curveOptions } from "./VisualyticsData";

export type TCurveOption = typeof curveOptions[number];
export type TCurveValue = TCurveOption["value"];
export type TCurveLabel = TCurveOption["label"];
