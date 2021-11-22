import { Theme } from "@mui/material";

export const getDisabledStyle = (theme: Theme) =>
  ({
    pointerEvents: "none",
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.grey[400],
  } as React.CSSProperties);
