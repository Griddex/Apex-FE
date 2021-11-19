import { grey } from "@mui/material/colors";
import { alpha, createTheme } from "@mui/material/styles";

const ApexPalette = {
  primary: { light: "#EDFBFD", main: "#14A9C1", dark: "#0A515C" },
  secondary: { light: "#FFEBEC", main: "#FF0013", dark: "#660005" },
  success: { light: "#EEFCEF", main: "#22BE34", dark: "#15791C" },
  warning: { light: "#FFFAEB", main: "#F5B400", dark: "#A37800" },
};

const apexSpacing = 8;
const apexTooltipShadow =
  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)";

const theme = createTheme({
  palette: ApexPalette,
  typography: {
    fontFamily: ["Segoe UI", "system-ui", "-webkit-pictograph"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: "none",
          height: 36,
        },
        containedPrimary: {
          border: `1.5px solid ${ApexPalette.primary.main}`,
          backgroundColor: ApexPalette.primary.main,
          color: "#FFF",
          "&:hover": {
            backgroundColor: ApexPalette.primary.dark,
            borderColor: ApexPalette.primary.dark,
            fontWeight: 700,
          },
        },
        outlinedPrimary: {
          border: `1.5px solid ${ApexPalette.primary.main}`,
          backgroundColor: ApexPalette.primary.light,
          "&:hover": {
            backgroundColor: ApexPalette.primary.main,
            borderColor: ApexPalette.primary.main,
            color: "#FFF",
            fontWeight: 700,
          },
        },
        containedSecondary: {
          backgroundColor: ApexPalette.secondary.main,
          color: "#FFF",
          "&:hover": {
            backgroundColor: ApexPalette.secondary.dark,
            borderColor: ApexPalette.secondary.dark,
            fontWeight: 700,
          },
        },
        outlinedSecondary: {
          border: `1.5px solid ${ApexPalette.secondary.main}`,
          backgroundColor: ApexPalette.secondary.light,
          "&:hover": {
            backgroundColor: ApexPalette.secondary.main,
            borderColor: ApexPalette.secondary.main,
            color: "#FFF",
            fontWeight: 700,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          // textTransform: "uppercase",
          fontSize: "1.0rem",
        },
      },
      defaultProps: {
        shrink: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        input: {
          padding: 2,
        },
        notchedOutline: {
          display: "none",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 36,
          paddingLeft: 4,
          borderRadius: 1,
          outline: `1px solid ${grey[500]}`,
          "&:hover": {
            outline: `1px solid ${ApexPalette.primary.main}`,
            boxShadow: `${alpha(ApexPalette.primary.main, 0.25)} 0 0 0 2px`,
          },
          "&:active": {
            outline: `2px solid ${ApexPalette.primary.main}`,
            boxShadow: `${alpha(ApexPalette.primary.main, 0.25)} 0 0 0 2px`,
          },

          // "&:hover": { backgroundColor: "#F7F7F7" },
          //       input:-webkit-autofill,
          // input:-webkit-autofill:hover,
          // input:-webkit-autofill:focus,
          // textarea:-webkit-autofill,
          // textarea:-webkit-autofill:hover,
          // textarea:-webkit-autofill:focus,
          // select:-webkit-autofill,
          // select:-webkit-autofill:hover,
          // select:-webkit-autofill:focus {
          //   border: 1px solid green;
          //   -webkit-text-fill-color: green;
          //   -webkit-box-shadow: 0 0 0px 1000px #000 inset;
          //   transition: background-color 5000s ease-in-out 0s;
          // }
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #FFF inset",
            WebkitTextFillColor: `${grey[900]}`,
          },
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          outline: `1px solid ${grey[500]}`,
          "&:hover": {
            outline: `1px solid ${ApexPalette.primary.main}`,
            boxShadow: `${alpha(ApexPalette.primary.main, 0.25)} 0 0 0 2px`,
          },
          "&:active": {
            outline: `2px solid ${ApexPalette.primary.main}`,
            boxShadow: `${alpha(ApexPalette.primary.main, 0.25)} 0 0 0 2px`,
          },
          borderRadius: 1,
        },
      },
      defaultProps: {
        disableUnderline: true,
      },
    },

    MuiMenu: {
      styleOverrides: {
        list: {
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingLeft: 2,
          paddingRight: 2,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "white",
          color: "#333",
          boxShadow: apexTooltipShadow,
          fontSize: 14,
        },
        arrow: {
          color: "white",
        },
      },
      defaultProps: {
        arrow: true,
      },
    },

    MuiDialogTitle: { styleOverrides: { root: { padding: apexSpacing } } },

    MuiDialogContent: { styleOverrides: { dividers: { borderWidth: 0 } } },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#F7F7F7",
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#E0E0E0",
        },
      },
    },

    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: ApexPalette.primary.main,
        },
        root: {
          flex: "0 1 auto",
        },
      },
    },

    MuiCardActionArea: {
      styleOverrides: {
        root: {
          border: `1px solid #999`,
          boxShadow: `${alpha("#999", 0.25)} 0 0 0 2px`,
          "&:hover": {
            border: `1px solid ${ApexPalette.primary.main}`,
            outline: `1px solid ${ApexPalette.primary.main}`,
            boxShadow: `${alpha(ApexPalette.primary.main, 0.25)} 0 0 0 2px`,
            borderRadius: 2,
            backgroundColor: "#FFF",
            // boxShadow: `0 0 .5rem #fff, inset 0 0 .5rem #fff,  0 0 2rem ${ApexPalette.primary.main}, inset 0 0 2rem  ${ApexPalette.primary.main}, 0 0 4rem  ${ApexPalette.primary.main}, inset 0 0 4rem  ${ApexPalette.primary.main}`,
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&$checked": {
            transform: "translateX(12px)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});

export default theme;
