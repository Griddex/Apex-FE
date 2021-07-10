import { useTheme } from "@material-ui/core";
import { compile } from "mathjs";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

interface IHeatMapCustomCell {
  data: any;
  label: React.Key;
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

const HeatMapCustomCell = (props: IHeatMapCustomCell) => {
  const theme = useTheme();

  const {
    data,
    label,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    textColor,
  } = props;

  const { heatMapStylingData } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const {
    heatMapThresholdValue,
    heatMapThresholdColor,
    heatMapBackgroundColor,
    relationalOperatorOption,
  } = heatMapStylingData;

  const equationExpr = `${label}${relationalOperatorOption.value}${heatMapThresholdValue}`;

  const thresholdEval = compile(equationExpr).evaluate();

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
      />
      <text
        dominantBaseline="central"
        textAnchor="middle"
        style={{
          fill: theme.palette.grey[700],
          fontSize: 16,
          fontWeight: theme.typography.fontWeightMedium,
          fontFamily: "inherit",
        }}
      >
        {label}
      </text>
    </g>
  );
};

export default HeatMapCustomCell;
