import React from "react";
import { IApexSelect, IApexSelectRS } from "./SelectItemsType";

const ApexSelectRS = ({
  currentItem,
  dataOptions,
  handleChange,
  selectItemStyle,
}: IApexSelectRS) => {
  const options: { value: string; label: string }[] = dataOptions.map((v) => ({
    value: v,
    label: v,
  }));

  return (
    <select
      style={selectItemStyle}
      id="outlined-select-worksheet"
      value={currentItem}
      onChange={handleChange}
    >
      {options.map((option, i: number) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ApexSelectRS;
