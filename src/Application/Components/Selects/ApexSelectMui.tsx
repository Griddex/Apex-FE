import { TextField, MenuItem, makeStyles } from "@material-ui/core";
import React from "react";
import { IApexSelect, ISelectItem } from "./SelectItemsType";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "space-evenly",
    border: "1px solid #707070",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
  },
  fileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "65%",
    width: "100%",
    // borderBottom: "1px solid #969498",
    // borderBottom: "1px solid #707070",
    padding: 20,
  },
  fileContent: {
    display: "flex",
    justifyContent: "space-between",
    height: "35%",
    width: "100%",
    padding: 20,
  },
  divider: {
    margin: 20,
  },
  selectWorksheet: {
    height: 55,
    width: 400,
  },
  fileImage: {
    width: 115,
    height: 139,
  },
  fileSizeProgress: {
    width: 145,
    height: 145,
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
