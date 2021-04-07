import React from "react";
import Select from "react-select";
import { IApexSelectRS } from "./SelectItemsType";

const ApexSelectRS = ({
  dataOptions,
  handleSelect,
  RSStyles,
}: IApexSelectRS) => {
  return (
    <Select options={dataOptions} styles={RSStyles} onChange={handleSelect} />
  );
};

export default ApexSelectRS;
