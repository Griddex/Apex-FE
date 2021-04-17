import { Theme } from "@material-ui/core/styles";
import { Styles } from "react-select";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";

const getRSStyles = (theme: Theme) => {
  const apexSelectStyles: Styles<ISelectOption, boolean> = {
    container: (styles) => ({
      ...styles,
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    valueContainer: (styles) => ({
      ...styles,
      display: "flex",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      alignSelf: "center",
    }),
    singleValue: (styles, { data }) => {
      let label = theme.palette.grey[900];

      switch (data.label) {
        case "Headers":
          label = theme.palette.primary.main;
          break;
        case "Units":
          label = theme.palette.secondary.main;
          break;
        case "Data":
          label = theme.palette.grey[900];
          break;
        default:
          label = theme.palette.grey[900];
          break;
      }

      return { ...styles, color: label, width: "100%", height: "100%" };
    },
    menu: (styles) => ({ ...styles, marginTop: 0 }),
    control: (styles, { getValue }) => {
      const currentValue = getValue()[0].label;

      let currentValueLabel = "";

      switch (currentValue) {
        case "Headers":
          currentValueLabel = theme.palette.primary.main;
          break;
        case "Units":
          currentValueLabel = theme.palette.secondary.main;
          break;
        case "Data":
          currentValueLabel = theme.palette.grey[900];
          break;
        default:
          currentValueLabel = theme.palette.grey[900];
          break;
      }
      return {
        ...styles,
        backgroundColor: "white",
        borderColor: currentValueLabel,
        borderWidth: 1,
        minHeight: 30,
        height: "95%",
        flex: 1,
      };
    },
    indicatorSeparator: (styles) => {
      return { ...styles, backgroundColor: "white" };
    },
    indicatorsContainer: (styles) => {
      return { ...styles, height: "100%" };
    },
    dropdownIndicator: (styles) => {
      return { ...styles, color: theme.palette.grey[900] };
    },
  };

  return apexSelectStyles;
};

export default getRSStyles;
