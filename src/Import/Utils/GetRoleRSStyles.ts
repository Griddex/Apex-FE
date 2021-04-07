import { Theme } from "@material-ui/core/styles";
import { Styles } from "react-select";
import { ISelectOptions } from "../../Application/Components/Selects/SelectItemsType";

const getColors = (name: string, theme: Theme) => {
  switch (name) {
    case "Headers":
      return [theme.palette.primary.light, theme.palette.primary.main];
    case "Units":
      return [theme.palette.secondary.light, theme.palette.secondary.main];
    case "Data":
      return [theme.palette.grey[200], theme.palette.grey[900]];
    default:
      return [theme.palette.grey[200], theme.palette.grey[900]];
  }
};

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
      height: "100%",
      width: "100%",
      alignSelf: "center",
      // fontWeight: 900,
    }),
    input: (styles) => ({
      ...styles,
      display: "none",
      height: "100%",
    }),
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
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? theme.palette.text.disabled
          : isSelected
          ? getColors(data.label, theme)[1]
          : isFocused
          ? getColors(data.label, theme)[1]
          : "white",
        color: isSelected || isFocused ? "white" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    placeholder: (styles) => ({ ...styles }),
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

      return { ...styles, color: label };
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
