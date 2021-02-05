import React from "react";
import { IApexSelect } from "./SelectItemsType";

const ApexSelectNative = ({
  currentItem,
  itemData,
  handleChange,
  selectItemStyle,
}: IApexSelect) => {
  const options: { value: string; label: string }[] = itemData.map((v) => ({
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

export default ApexSelectNative;
