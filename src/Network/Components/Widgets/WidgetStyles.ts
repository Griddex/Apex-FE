import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const handleStyle = {
  background: "#999",
  borderWidth: 0,
  height: 4,
  width: 4,
  borderRadius: 0,
} as CSSProperties;

export const widgetStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as CSSProperties;

export const drainagePointSummaryWidgetStyle = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  border: "1px solid #999",
  padding: 2,
} as CSSProperties;

export const drainagePointSummaryInnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  width: "50%",
} as CSSProperties;

export const drainagePointSummaryTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "50%",
} as CSSProperties;
