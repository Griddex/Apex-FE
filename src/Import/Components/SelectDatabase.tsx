import React, { ChangeEvent } from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import makeStyles from '@mui/styles/makeStyles';
import TableChartIcon from "@mui/icons-material/TableChart";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #C4C4C4",
    backgroundColor: "#FFF",
    padding: 20,
  },
  topSection: {
    height: "40%",
    borderBottom: "1px solid #C4C4C4",
  },
  bottomSection: {
    height: "50%",
    paddingTop: 20,
  },
  connect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },
  button: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  connectButton: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 184,
  },
  checkBox: { margin: 0 },
  selectItem: {},
  listBorder: {
    height: 300,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
  dbTables: { marginTop: 50 },
}));

const databases = ["ForecastingDb", "MainDb"];
const databaseTables = ["ApplePie", "Lasagne", "Cake", "Carbonara"];

const SelectDatabase = () => {
  const classes = useStyles();
  const [databaseName, setDatabaseName] = React.useState(databases[0]);
  const [selectedListItem, setSelectedListItem] = React.useState("");

  const handleSelectChange = (event: ChangeEvent<any>) => {
    const item = event.target.value;
    setDatabaseName(item);
  };

  const SelectItem = () => {
    return (
      <TextField
        className={classes.selectItem}
        id="outlined-select-databaseName"
        select
        label=""
        value={databaseName}
        onChange={handleSelectChange}
        variant="outlined"
        fullWidth
      >
        {databases.map((databaseName) => (
          <MenuItem key={databaseName} value={databaseName}>
            {databaseName}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const DatabaseTables = () => {
    return (
      <List className={classes.listBorder}>
        {databaseTables &&
          databaseTables.map((tableName, i) => (
            <ListItem
              key={i}
              selected={tableName === selectedListItem}
              button
              onClick={() => {
                setSelectedListItem(tableName);
                //   dispatch(persistWorksheetAction(tableName, []));
              }}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText>{tableName}</ListItemText>
            </ListItem>
          ))}
      </List>
    );
  };

  return (
    <>
      <div>
        <AnalyticsComp
          title="Select Database"
          content={<SelectItem />}
          direction="Vertical"
        />
      </div>
      <div className={classes.dbTables}>
        <AnalyticsComp
          title="List of Tables"
          content={<DatabaseTables />}
          direction="Vertical"
        />
      </div>
    </>
  );
};

export default SelectDatabase;
