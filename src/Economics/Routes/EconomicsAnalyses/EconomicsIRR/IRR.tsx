import {
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import React, { useState } from "react";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../../../Application/Components/Basic/AnalyticsTitle";
import ParameterGrid from "../../../Components/ParameterGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  npvImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 150,
    height: 100,
    padding: 5,
    border: "1px solid #A8A8A8",
  },
  selectItem: { width: 150, height: 150 },
  button: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  parameterSensitivity: {
    display: "flex",
    flexDirection: "row",
    //   justifyContent: "flex-start",
    //   alignItems: "center",
  },
  parameterSensitivityList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& div:first-child": {
      height: "auto",
    },
    "& div:nth-child(2)": {
      height: "auto",
    },
    //   justifyContent: "flex-start",
    //   alignItems: "center",
  },
  parameterSensitivityContainer: {
    display: "flex",
    flexDirection: "column",
    "& > *": { margin: 10 },
    width: "70%",
    height: "60%",
    alignItems: "center",
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },

  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: "bold",
  },
}));

export interface IParameterGrid {
  rowCount: number;
}

const IRR = () => {
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [parameterSensitivityList, setParameterSensitivityList] = useState<
    string[]
  >([]);

  const handleSelectChange = (event: { target: { value: any } }) => {
    const item = event.target.value;
    setItemName(item);
  };

  const SelectItem = ({ itemData }: { itemData: string[] }) => {
    return (
      <TextField
        // className={classes.C}
        id="outlined-select-worksheet"
        select
        label=""
        value={itemName}
        onChange={handleSelectChange}
        variant="outlined"
        fullWidth
      >
        {itemData.map((itemName, i: number) => (
          <MenuItem key={i} value={itemName}>
            {itemName}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const ParameterSensitivity = () => {
    const classes = useStyles();
    const itemData = [
      "Reference Year for Discounting",
      "First Oil Date",
      "Oil price",
      "Gas price",
      "LPG Price",
      "Lean Gas/WH Gas Ratio",
      "LPG Prod/WH Gas Prod Ratio",
      "Farm-in Signature Bonus",
      "G&A Cost (Pre-Prod) ",
      "G&A Cost (Post-Prod) ",
      "Var Oil Opex (CHA)",
      "Var Oil Opex (Terminaling Fee)",
      "Gas Var Opex",
      "Operation Days/annum",
      "Self Utilized Gas Volume",
      "Inflation Rate",
      "Recoverable Reserves",
      "Abandonment Cost",
      "Abandonment Cost per bbl",
      "Production Terrain",
      "Gas Development Concept",
    ];
    return (
      <div className={classes.parameterSensitivity}>
        <SelectItem itemData={itemData} />
        <Button
          className={classes.button}
          startIcon={<AddOutlinedIcon />}
          onClick={() =>
            setParameterSensitivityList((list) => [itemName, ...list])
          }
        >
          Add
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className={classes.npvImage}>
        <AccountBalanceTwoToneIcon fontSize="large" />
        <Typography>IRR</Typography>
        <Typography>Net Present Value</Typography>
      </div>
      <AnalyticsComp
        title="Parameters Sensivity"
        content={<ParameterSensitivity />}
        direction="Vertical"
      />
      <div className={classes.parameterSensitivityContainer}>
        {parameterSensitivityList.map((parameter, i) => {
          return (
            <div key={i} className={classes.parameterSensitivityList}>
              <ParameterGrid parameter={parameter} />
            </div>
          );
        })}
      </div>
      <Button
        className={classes.secondaryButton}
        startIcon={<ViewDayTwoToneIcon />}
        onClick={() => console.log("Calculate")}
      >
        Calculate
      </Button>
    </>
  );
};

export default IRR;
