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
import "react-data-griddex/dist/react-data-grid.css";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ParameterGrid from "../../Components/ParameterGrid";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import {
  hideDialogAction,
  showDialogAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { useDispatch } from "react-redux";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

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
  selectItem: { minWidth: 250, marginRight: 20 },
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
    marginTop: 20,
  },
  parameterSensitivityContainer: {
    display: "flex",
    flexDirection: "column",
    width: 600,
    height: "60%",
    alignItems: "center",
    overflow: "overlay",
    marginTop: 20,
    border: "1px solid #F7F7F7",
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  primaryButton: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 150,
    marginTop: 20,
  },
  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: "bold",
    width: 150,
    marginTop: 20,
    marginLeft: 20,
  },
}));

export interface IParameterGrid {
  rowCount: number;
}

const NCF = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
        className={classes.selectItem}
        id="outlined-select-worksheet"
        label=""
        value={itemName}
        onChange={handleSelectChange}
        variant="outlined"
        select
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

  const calculateNCFDialogActions = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
      {
        title: "View Results",
        variant: "contained",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => {
          console.log("View Results");
        },
      },
    ];

    return (
      <>
        {buttonsData.map((button, i) => (
          <Button
            key={i}
            variant={button.variant}
            color={button.color}
            onClick={button.handleAction}
            startIcon={button.startIcon}
          >
            {button.title}
          </Button>
        ))}
      </>
    );
  };

  const calculateNCF = () => {
    const dialogParameters: DialogStuff = {
      name: "Net_Cashflow_Results_Dialog",
      title: "Net Cashflow Results",
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "success",
      dialogText: "Net cash flow successfully calculated. View Results?",
      actionsList: () => calculateNCFDialogActions(),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };
    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className={classes.npvImage}>
        <AccountBalanceTwoToneIcon fontSize="large" />
        <Typography>NCF</Typography>
        <Typography>Net Cashflow</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "400px",
          marginTop: "20px",
        }}
      >
        <AnalyticsComp
          title="Parameters Sensivity"
          content={<ParameterSensitivity />}
          direction="Vertical"
        />
      </div>
      <div className={classes.parameterSensitivityContainer}>
        {parameterSensitivityList.map((parameter, i) => {
          if (i === 0) {
            return (
              <div key={i}>
                <ParameterGrid parameter={parameter} />
              </div>
            );
          } else {
            return (
              <div key={i} className={classes.parameterSensitivityList}>
                <ParameterGrid parameter={parameter} />
              </div>
            );
          }
        })}
      </div>
      <div>
        <Button
          className={classes.primaryButton}
          startIcon={<ViewDayTwoToneIcon />}
          onClick={() => calculateNCF()}
        >
          Calculate
        </Button>
      </div>
    </div>
  );
};

export default NCF;
