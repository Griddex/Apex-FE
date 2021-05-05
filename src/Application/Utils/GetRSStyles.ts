import { Theme } from "@material-ui/core/styles";
import { Styles } from "react-select";
import { ISelectOption } from "../Components/Selects/SelectItemsType";

const getRSStyles = (theme: Theme, containerWidth?: number) => {
  const apexSelectStyles: Styles<ISelectOption, boolean> = {
    container: (styles) => ({
      ...styles,
      height: "100%",
      width: containerWidth ? containerWidth : "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
        backgroundColor: "white",
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
