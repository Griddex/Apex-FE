import { Box } from "@material-ui/core";
import { darken, useTheme } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IApexPickerExtruder {
  color: string;
  showPicker: boolean;
  setShowPicker: TUseState<boolean>;
  containerStyle?: CSSProperties;
}

export default function ApexPickerExtruder({
  color,
  showPicker,
  setShowPicker,
  containerStyle,
}: IApexPickerExtruder) {
  const theme = useTheme();

  return (
    <Box
      style={{
        width: "100%",
        height: 36,
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${darken(color, 0.5)}`,
        padding: 8,
        ...containerStyle,
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color,
          borderStyle: "dashed",
          border: `1px solid ${color}`,
          cursor: "pointer",
        }}
        onClick={() => setShowPicker(!showPicker)}
      />
    </Box>
  );
}
