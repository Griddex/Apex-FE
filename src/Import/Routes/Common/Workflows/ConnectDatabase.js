import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import React, { useState } from "react";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ServerLoginForm from "./../../../../Application/Components/Forms/ServerLoginForm";
import { useSelector, useDispatch } from "react-redux";
import { hideDialogAction } from "./../../../../Application/Redux/Actions/DialogsAction";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import Dialogs from "./../../../../Application/Components/Dialogs/Dialogs";

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
    height: "100%",
    width: "100%",
    paddingTop: 20,
  },
  connect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
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
}));

const ConnectDatabase = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dbSourcesItemData = ["MSSQL Server", "Oracle Server"];
  const serverNameItemData = ["SQLDBSQLExpress", "OracleExpress"];

  const [itemName, setItemName] = useState("");

  const handleSelectChange = (event) => {
    const item = event.target.value;
    setItemName(item);
  };

  const SelectItem = ({ itemData }) => {
    return (
      <TextField
        className={classes.selectItem}
        id="outlined-select-worksheet"
        select
        label=""
        value={itemName}
        onChange={handleSelectChange}
        variant="outlined"
        fullWidth
      >
        {itemData.map((itemName) => (
          <MenuItem key={itemName} value={itemName}>
            {itemName}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const connectDatabaseSuccessDialogActions = () => {
    const buttonsData = [
      {
        title: "Okay",
        variant: "outlined",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
    ];

    return buttonsData.map((button) => (
      <Button
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  const { dialogs } = useSelector((state) => state.dialogsReducer);
  const currentDialog = dialogs[dialogs.length - 1];
  const dialogsText = currentDialog && currentDialog.dialogsText;

  return (
    <Container className={classes.container} maxWidth="sm" fixed disableGutters>
      <Dialogs
        content={dialogsText}
        actions={() => connectDatabaseSuccessDialogActions()}
      />
      <Grid
        className={classes.topSection}
        container
        direction="column"
        wrap="wrap"
        justify="space-evenly"
      >
        <Grid item container spacing={2} direction="row" justify="flex-start">
          <Grid item xs={6}>
            <AnalyticsComp
              title="Database Source"
              content={<SelectItem itemData={dbSourcesItemData} />}
            />
          </Grid>
          <Grid item xs={3} container alignItems="flex-end">
            <Button
              className={classes.button}
              startIcon={<AddOutlinedIcon />}
              onClick={() => console.log("Add Server")}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          // xs={12}
          direction="row"
          justify="flex-start"
        >
          <Grid item container xs={6}>
            <AnalyticsComp
              title="Server Name"
              content={<SelectItem itemData={serverNameItemData} />}
            />
          </Grid>
          <Grid item xs={3} container alignItems="flex-end">
            <Button
              className={classes.button}
              startIcon={<RefreshOutlinedIcon />}
              onClick={() => console.log("Refresh")}
            >
              Refresh
            </Button>
          </Grid>
          <Grid item xs={3} container alignItems="flex-end">
            <Button
              className={classes.button}
              startIcon={<SearchOutlinedIcon />}
              onClick={() => console.log("Browse")}
            >
              Browse
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.bottomSection}>
        <ServerLoginForm />
      </div>
    </Container>
  );
};

export default ConnectDatabase;
