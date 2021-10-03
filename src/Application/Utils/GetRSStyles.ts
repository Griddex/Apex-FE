import { Theme } from "@mui/material/styles";
import { Styles } from "react-select";
import { ISelectOption } from "../Components/Selects/SelectItemsType";

const getRSStyles = <T extends ISelectOption>(
  theme: Theme,
  containerWidth?: React.Key,
  containerHeight?: React.Key,
  isDisabled?: boolean
) => {
  const apexSelectStyles: Styles<T, boolean> = {
    container: (styles) => ({
      ...styles,
      height: containerHeight ? containerHeight : "100%",
      width: containerWidth ? containerWidth : "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: isDisabled ? "not-allowed" : "pointer",
      pointerEvents: "auto",
    }),
    valueContainer: (styles) => ({
      ...styles,
      display: "flex",
      justifyContent: "flex-start",
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
        case "Date":
          label = theme.palette.primary.main;
          break;
        default:
          label = theme.palette.grey[900];
          break;
      }

      return {
        ...styles,
        color: label,
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
      };
    },
    menu: (styles) => ({ ...styles, marginTop: 0 }),
    control: (styles, { getValue }) => {
      const selectOptions = getValue();
      const currentValue = selectOptions ? selectOptions[0]?.label : "";

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
        // case "Date":
        //   currentValueLabel = theme.palette.primary.main;
        //   break;
        default:
          currentValueLabel = theme.palette.grey[400];
          break;
      }
      return {
        ...styles,
        backgroundColor: isDisabled ? theme.palette.grey["100"] : "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
        borderColor: currentValueLabel,
        borderWidth: 1,
        minHeight: 30,
        height: "95%",
        flex: 1,
      };
    },
    // indicatorSeparator: (styles) => {
    //   return { ...styles, backgroundColor: "white" };
    // },
    indicatorsContainer: (styles) => {
      return { ...styles, height: "100%" };
    },
    dropdownIndicator: (styles) => {
      return { ...styles, color: theme.palette.grey[900] };
    },
    // multiValue: (styles, { data }) => {
    //   const color = chroma(data.color);
    //   return {
    //     ...styles,
    //     backgroundColor: color.alpha(0.1).css(),
    //   };
    // },
    // multiValueLabel: (styles, { data }) => ({
    //   ...styles,
    //   color: data.color,
    // }),
    // multiValueRemove: (styles, { data }) => ({
    //   ...styles,
    //   color: data.color,
    //   ':hover': {
    //     backgroundColor: data.color,
    //     color: 'white',
    //   },
    // }),
  };

  return apexSelectStyles;
};

export default getRSStyles;
