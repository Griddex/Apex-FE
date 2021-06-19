import { useTheme } from "@material-ui/core";
import React from "react";
import Select from "react-select";
import generateSelectOptions from "../../Utils/GenerateSelectOptions";
import getRSStyles from "../../Utils/GetRSStyles";
import getRSTheme from "../../Utils/GetRSTheme";
import { IApexSelectRS, ISelectOption } from "./SelectItemsType";

const ApexSelectRS = <T extends ISelectOption>({
  valueOption,
  data,
  handleSelect,
  menuPortalTarget,
  isSelectOptionType,
  className,
  containerWidth,
  containerHeight,
  isDisabled,
  ...rest
}: IApexSelectRS<T>) => {
  const theme = useTheme();
  const RSStyles = getRSStyles<T>(
    theme,
    containerWidth as React.Key,
    containerHeight as React.Key,
    isDisabled as boolean
  );

  let dataOptions: T[];

  if (isSelectOptionType) dataOptions = data as T[];
  else dataOptions = generateSelectOptions(data) as any;

  return (
    <Select
      className={className}
      value={valueOption}
      options={dataOptions}
      styles={RSStyles}
      onChange={handleSelect}
      menuPortalTarget={menuPortalTarget}
      theme={(thm) => getRSTheme(thm, theme)}
      {...rest}
      isDisabled={isDisabled}
    />
  );
};

export default ApexSelectRS;
