import React from "react";
import { IApexSelectRS } from "./SelectItemsType";
import Select from "react-select";

const ApexSelectRS = ({
  dataOptions,
  handleSelect,
  colorStyles,
}: IApexSelectRS) => {
  return (
    <Select
      options={dataOptions}
      styles={colorStyles}
      onChange={handleSelect}
    />
  );
};

export default ApexSelectRS;
