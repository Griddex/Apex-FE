import { grey } from "@material-ui/core/colors";
import { createMuiTheme, PaletteColorOptions } from "@material-ui/core/styles";

// tertiary: { light: "#EBFFFB"; main: "#00C49F"; dark: "#008F72" };
// quaternary: { light: "#FFFAEB"; main: "#F5B400"; dark: "#CC9900" };

declare module "@material-ui/core/styles/createMuiTheme" {
  // export interface SimplePaletteColorOptions {
  //   light?: string;
  //   main: string;
  //   dark?: string;
  //   contrastText?: string;
  // }
  // export type PaletteColorOptions = SimplePaletteColorOptions;

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    quaternary?: PaletteColorOptions;
    // palette?: PaletteOptions | undefined;
  }
  interface Palette {
    tertiary?: PaletteColorOptions;
    quaternary?: PaletteColorOptions;
    // palette?: PaletteOptions | undefined;
  }
}

// const theme = createMuiTheme({
//   palette: {
//     primary: { light: "#EEFAFB", main: "#2BB4C1", dark: "#165E64" },
//     secondary: { light: "#FDEDF2", main: "#DA1B57", dark: "#6E0C2B" },
//     tertiary: { light: "#EBFFFB"; main: "#00C49F"; dark: "#008F72" };
// quaternary: { light: "#FFFAEB"; main: "#F5B400"; dark: "#CC9900" };
//   },
//   typography: {
//     fontFamily: ['"Quicksand"', "sans-serif"].join(","),
//   },
// });

// function createApexTheme(options: ThemeOptions) {
//   return createMuiTheme({
//     palette: {
// primary: { light: "#EEFAFB", main: "#2BB4C1", dark: "#165E64" },
// secondary: { light: "#FDEDF2", main: "#DA1B57", dark: "#6E0C2B" },
//       tertiary: { light: "#EBFFFB", main: "#00C49F", dark: "#008F72" },
//       quaternary: { light: "#FFFAEB", main: "#F5B400", dark: "#CC9900" },
//     },
//     typography: {
//       fontFamily: ['"Quicksand"', "sans-serif"].join(","),
//     },
//     ...options,
//   });
// }

const theme = createMuiTheme({
  palette: {
    primary: { light: "#EEFAFB", main: "#2BB4C1", dark: "#165E64" },
    secondary: { light: "#FDEDF2", main: "#DA1B57", dark: "#6E0C2B" },
    tertiary: { light: "#EBFFFB", main: "#00C49F", dark: "#008F72" },
    quaternary: { light: "#FFFAEB", main: "#F5B400", dark: "#CC9900" },
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
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      fontSize: 14,
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
