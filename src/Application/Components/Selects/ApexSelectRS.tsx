import React from "react";
import Select from "react-select";
import { IApexSelectRS, ISelectOption } from "./SelectItemsType";
import getRSStyles from "../../Utils/GetRSStyles";
import { useTheme } from "@material-ui/core";
import generateSelectOptions from "../../Utils/GenerateSelectOptions";
import getRSTheme from "../../Utils/GetRSTheme";

const ApexSelectRS = ({
  valueOption,
  data,
  handleSelect,
  menuPortalTarget,
  isSelectOptionType,
  ...rest
}: IApexSelectRS) => {
  const theme = useTheme();
  const RSStyles = getRSStyles(theme);

  let dataOptions: ISelectOption[];

  if (isSelectOptionType) dataOptions = data as ISelectOption[];
  else dataOptions = generateSelectOptions(data);

  return (
    <Select
      value={valueOption}
      options={dataOptions}
      styles={RSStyles}
      onChange={handleSelect}
      menuPortalTarget={menuPortalTarget}
      theme={(thm) => getRSTheme(thm, theme)}
      {...rest}
    />
  );
};

export default ApexSelectRS;
