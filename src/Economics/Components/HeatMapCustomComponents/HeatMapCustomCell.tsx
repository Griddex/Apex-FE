import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { compile } from "mathjs";

interface IHeatMapCustomCell {
  data: any;
  value: number | string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  borderWidth: number;
  borderColor: string;
  textColor: string;
}
const index = 0;
const HeatMapCustomCell = ({
  data,
  value,
  x,
  y,
  width,
  height,
  color,
  opacity,
  borderWidth,
  borderColor,
  textColor,
}: IHeatMapCustomCell) => {
  const indexRef = React.useRef<number>(index);
  const { heatMapStylingData } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const {
    heatMapThresholdValue,
    heatMapThresholdColor,
    heatMapBackgroundColor,
    relationalOperator,
  } = heatMapStylingData;

  const thresholdEval = compile(
    `${value}${relationalOperator.label}${heatMapThresholdValue}`
  ).evaluate();

  const appliedColor = thresholdEval
    ? heatMapThresholdColor
    : heatMapBackgroundColor;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={(-1 * width) / 2}
        y={(-1 * height) / 2}
        width={width}
        height={height}
        fill={appliedColor}
        fillOpacity={opacity}
        strokeWidth={borderWidth}
        stroke={appliedColor}
        strokeOpacity={opacity}
      ></rect>

      <text
        dominantBaseline="central"
        textAnchor="middle"
        style={{
          fill: textColor,
          fontSize: 16,
          fontWeight: "bold",
          fontFamily: "inherit",
        }}
      >
        {value}
      </text>
    </g>
  );
};

export default HeatMapCustomCell;
