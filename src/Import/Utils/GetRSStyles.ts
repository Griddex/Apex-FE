import { Theme } from "@material-ui/core/styles";
import { Styles } from "react-select";
import { ISelectOptions } from "../../Application/Components/Selects/SelectItemsType";

const getRSStyles = (theme: Theme) => {
  const apexSelectStyles: Styles<ISelectOptions, false> = {
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
