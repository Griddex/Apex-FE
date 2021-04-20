import React from "react";
import Select from "react-select";
import { IApexSelectRS } from "./SelectItemsType";
import getRSStyles from "./../../../Import/Utils/GetRSStyles";
import { useTheme } from "@material-ui/core";
import generateSelectOptions from "../../Utils/GenerateSelectOptions";

const ApexSelectRS = ({
  data,
  handleSelect,
  menuPortalTarget,
}: IApexSelectRS) => {
  const theme = useTheme();
  const RSStyles = getRSStyles(theme);
  const dataOptions = generateSelectOptions(data);

  return (
    <Select
      options={dataOptions}
      styles={RSStyles}
      onChange={handleSelect}
      menuPortalTarget={menuPortalTarget}
      theme={(thm) => ({
        ...thm,
        borderRadius: 0,
        colors: {
          ...thm.colors,
          primary50: theme.palette.primary.light,
          primary25: theme.palette.primary.main,
          primary: theme.palette.grey[700],
        },
      })}
    />
  );
};

export default ApexSelectRS;
