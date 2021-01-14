import { TextField, MenuItem } from "@material-ui/core";
import React from "react";
import { IApexSelect, ISelectItem } from "./SelectItemsType";

const ApexSelect = ({
  currentItem,
  itemData,
  handleChange,
  selectItemStyle,
}: IApexSelect) => {
  return (
    <select
      style={selectItemStyle}
      id="outlined-select-worksheet"
      value={currentItem}
      onChange={handleChange}
    >
      {itemData.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </select>
  );
};

export default ApexSelect;
