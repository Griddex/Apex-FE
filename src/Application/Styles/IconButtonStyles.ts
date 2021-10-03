import { Theme } from "@mui/material";

export const getApexIconButtonStyle = (theme: Theme) => ({
  height: "28px",
  backgroundColor: theme.palette.primary.light,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 2,
  marginLeft: 4,
});
