import { grey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { light: "#EDFBFD", main: "#14A9C1", dark: "#0A515C" },
    secondary: { light: "#FFEBEC", main: "#FF0013", dark: "#660005" },
    success: { light: "#EEFCEF", main: "#22BE34", dark: "#15791C" },
    warning: { light: "#FFFAEB", main: "#F5B400", dark: "#A37800" },
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
  MuiCssBaseline: {
    "@global": {
      "@font-face": [{ fontFamily: "quicksand" }],
    },
  },
  MuiButton: {
    root: {
      borderRadius: 2,
      textTransform: "none",
      height: 36,
    },
    containedPrimary: {
      border: `1.5px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,
      color: "#FFF",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        fontWeight: 700,
        boxShadow: "5px 5px 12px 17px rgba(20,169,193,0.4)",
      },
    },
    outlinedPrimary: {
      border: `1.5px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#FFF",
        fontWeight: 700,
      },
    },
    containedSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: "#FFF",
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
        fontWeight: 700,
        boxShadow: "0px 0px 12px 17px rgba(255,0,19,0.4);",
      },
    },
    outlinedSecondary: {
      border: `1.5px solid ${theme.palette.secondary.main}`,
      backgroundColor: theme.palette.secondary.light,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
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
      // "&$focused": {
      //   border: `1px solid ${theme.palette.primary.main}`,
      //   outline: `1px solid ${theme.palette.primary.main}`,
      //   boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      //   borderRadius: 2,
      // },
    },
  },
  MuiTooltip: {
    tooltip: {
      // backgroundColor: "#0084A1",
      backgroundColor: "white",
      // border: `1px solid ${theme.palette.primary.main}`,
      color: "#333",
      boxShadow: theme.shadows[2],
      fontSize: 14,
      // width: 80,
    },
    arrow: {
      backgroundColor: "white",
      color: "white",
      boxShadow: theme.shadows[2],
    },
  },
  MuiDialogTitle: { root: { padding: theme.spacing(1) } },
  MuiDialogContent: { dividers: { borderWidth: 0 } },
  MuiSvgIcon: {
    root: {
      cursor: "pointer",
      "&:hover": {
        // color: theme.palette.primary.main,
      },
    },
  },
  MuiDialogActions: {
    root: {
      backgroundColor: "#F7F7F7",
    },
  },

  // MuiPaper: {
  //   elevation1: {
  //     boxShadow: "none",
  //   },
  // },
  MuiAccordionDetails: {
    root: {
      padding: 0,
    },
  },
};

export default theme;
