import { useTheme } from "@mui/material";
import { compile } from "mathjs";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const heatMapThresholdValueSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.heatMapStylingData.heatMapThresholdValue,
  (data) => data
);
const heatMapThresholdColorSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.heatMapStylingData.heatMapThresholdColor,
  (data) => data
);
const heatMapBackgroundColorSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.heatMapStylingData.heatMapBackgroundColor,
  (data) => data
);
const relationalOperatorOptionSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.heatMapStylingData.relationalOperatorOption,
  (data) => data
);

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

  const heatMapThresholdValue = useSelector(heatMapThresholdValueSelector);
  const heatMapThresholdColor = useSelector(heatMapThresholdColorSelector);
  const heatMapBackgroundColor = useSelector(heatMapBackgroundColorSelector);
  const relationalOperatorOption = useSelector(
    relationalOperatorOptionSelector
  );

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
