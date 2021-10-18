import { TextField, MenuItem } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { IApexSelect, ISelectItem } from "./SelectItemsType";

const useStyles = makeStyles((theme) => ({
  selectWorksheet: {
    height: 55,
    width: 400,
  },
}));

const ApexSelectMui = ({
  currentItem,
  itemData,
  handleChange,
  selectItemStyle,
}: IApexSelect) => {
  const classes = useStyles();
  const [item, setItem] = React.useState("");

  const handleSelectChange = (event: { target: { value: any } }) => {
    const selectedWorksheetName = event.target.value;

    setItem(selectedWorksheetName);
  };

  return (
    <TextField
      className={classes.selectWorksheet}
      style={selectItemStyle}
      id="outlined-select-worksheet"
      select
      label=""
      value={item}
      onChange={handleSelectChange}
      variant="outlined"
    >
      {itemData.map((item: string) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ApexSelectMui;
