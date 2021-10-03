import { Theme as MuiTheme } from "@mui/material/styles";
import { Theme } from "react-select";

const getRSTheme = (thm: Theme, theme: MuiTheme) => ({
  ...thm,
  borderRadius: 0,
  colors: {
    ...thm.colors,
    primary50: theme.palette.primary.light,
    primary25: theme.palette.primary.main,
    primary: theme.palette.grey[700],
  },
});

export default getRSTheme;
