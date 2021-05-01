import React from "react";
import Select from "react-select";
import { IApexSelectRS } from "./SelectItemsType";
import getRSStyles from "../../Utils/GetRSStyles";
import { useTheme } from "@material-ui/core";
import generateSelectOptions from "../../Utils/GenerateSelectOptions";
import getRSTheme from "../../Utils/GetRSTheme";

const ApexSelectRS = ({
  valueOption,
  data,
  handleSelect,
  menuPortalTarget,
}: IApexSelectRS) => {
  const theme = useTheme();
  const RSStyles = getRSStyles(theme);
  const dataOptions = generateSelectOptions(data);

  return (
    <Select
      value={valueOption}
      options={dataOptions}
      styles={RSStyles}
      onChange={handleSelect}
      menuPortalTarget={menuPortalTarget}
      theme={(thm) => getRSTheme(thm, theme)}
    />
  );
};

export default ApexSelectRS;
