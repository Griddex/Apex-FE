import React from "react";
import Select from "react-select";
import { IApexSelectRS } from "./SelectItemsType";

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
