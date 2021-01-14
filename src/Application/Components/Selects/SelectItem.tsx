import { TextField, MenuItem } from "@material-ui/core";
import React from "react";
import { ISelectItem } from "./SelectItemsType";

const SelectItem = ({
  currentItem,
  itemData,
  handleChange,
  label,
  selectItemStyle,
}: ISelectItem) => {
  return (
    <TextField
      style={selectItemStyle}
      id="outlined-select-worksheet"
      select
      label={label}
      value={currentItem}
      onChange={handleChange}
      variant="outlined"
      fullWidth
    >
      {itemData.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectItem;
