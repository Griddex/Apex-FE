import React from "react";

export type AxisValue = string | number | Date;
export interface AxisTickProps<Value extends AxisValue> {
  tickIndex: number;
  value: Value;
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
}

const renderTick =
  (bottomAxisValues: number[]) =>
  ({
    tickIndex,
    opacity,
    textAnchor,
    textBaseline,
    textX,
    textY,
    value,
    x,
    y,
  }: AxisTickProps<any>) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          alignmentBaseline={"central"}
          textAnchor={textAnchor}
          transform={`translate(${textX},${textY}) rotate(70)`}
          fontSize={11}
        >
          {tickIndex % 1 === 0 ? bottomAxisValues[tickIndex] : ""}
        </text>
      </g>
    );
  };

export default renderTick;
