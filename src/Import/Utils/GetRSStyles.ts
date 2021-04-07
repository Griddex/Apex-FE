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
      height: "100%",
      width: "100%",
      alignSelf: "center",
    }),
    input: (styles) => ({
      ...styles,
      display: "none",
      height: "100%",
    }),
    menu: (styles) => ({ ...styles, marginTop: 0 }),
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
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
