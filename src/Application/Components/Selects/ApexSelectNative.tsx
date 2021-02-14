import React from "react";
import { IApexSelect } from "./SelectItemsType";

const ApexSelectNative = ({
  name,
  currentItem,
  itemData,
  handleChange,
  handleBlur,
  selectItemStyle,
}: IApexSelect) => {
  const options: { value: string; label: string }[] = itemData.map((v) => ({
    value: v,
    label: v,
  }));

  return (
    <select
      name={name}
      style={selectItemStyle}
      id="outlined-select-worksheet"
      value={currentItem}
      onChange={handleChange}
      onBlur={handleBlur}
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
