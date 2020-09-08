import { fade, createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  background: "#EFEFEF",
  palette: {
    primary: { light: "#EEFAFB", main: "#2BB4C1", dark: "#165E64" },
    secondary: { light: "#FDEDF2", main: "#DA1B57", dark: "#6E0C2B" },
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
    disableRipple: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiTooltip: {
    arrow: true,
  },
};

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 5,
      textTransform: "none",
      height: 36,
    },
    containedPrimary: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        color: "#FFF",
        fontWeight: 700,
      },
    },
    outlinedPrimary: {
      borderWidth: 1.5,
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        color: "#FFF",
        fontWeight: 700,
      },
    },
    containedSecondary: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
        color: "#FFF",
        fontWeight: 700,
      },
    },
    outlinedSecondary: {
      borderWidth: 1.5,
      backgroundColor: theme.palette.secondary.light,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
        color: "#FFF",
        fontWeight: 700,
      },
    },
  },
  MuiInputLabel: {
    root: {
      // textTransform: "uppercase",
      fontSize: "1.0rem",
    },
  },
  MuiInputBase: {
    root: {
      height: 36,
      borderRadius: 2,
      "&:hover": { backgroundColor: theme.palette.primary.light },
    },
    input: {
      "&:hover": { backgroundColor: theme.palette.primary.light },
      "&:focus": { backgroundColor: theme.palette.primary.light },
    },
  },
  MuiInput: {
    root: {
      top: theme.spacing(0.5),
      border: `1px solid ${grey[500]}`,
      outline: `1px solid transparent`,
      padding: theme.spacing(1),
      "&$focused": {
        border: `1px solid ${theme.palette.primary.main}`,
        outline: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderRadius: 2,
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: "#0084A1",
      border: `2px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  },
  MuiDialogTitle: { root: { padding: theme.spacing(1) } },
  MuiDialogContent: { dividers: { borderWidth: 0 } },
  MuiSvgIcon: { root: { cursor: "pointer" } },
};

export default theme;
