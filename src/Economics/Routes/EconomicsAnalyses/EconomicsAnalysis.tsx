import {
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import React, { useState } from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { ApexGrid } from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import getRSStyles from "../../../Application/Utils/GetRSStyles";
import EconomicsParametersSensitivities from "./EconomicsParametersSensitivities/EconomicsParametersSensitivities";
import { Styles, ValueType } from "react-select";
import Select from "react-select";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import getRSTheme from "../../../Application/Utils/GetRSTheme";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IApplicationExistingData } from "../../../Application/Types/ApplicationTypes";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import {
  IEconomicsParametersSensitivites,
  TEconomicsAnalysesTitles,
} from "./EconomicsAnalysesTypes";

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
    overflow: "auto",
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

const EconomicsAnalysis = ({
  economicsAnalyses,
}: IEconomicsParametersSensitivites) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "existingDataWorkflows";

  const {
    economicsCostsRevenuesDeckExisting,
    economicsParametersDeckExisting,
  } = useSelector((state: RootState) => state.economicsReducer);

  const {
    selectedCostsRevenuesInputDeckTitle,
    economicsParametersInputDeckTitle,
  } = useSelector((state: RootState) => state.economicsReducer[wc]);

  const economicsDeckTypesOptions = [
    { value: "economicsCostsRevenues", label: "Economics Costs & Revenues" },
    { value: "economicsParameters", label: "Economics Parameters" },
  ];
  const economicsDeckTypes = economicsDeckTypesOptions.map((e) => e.label);

  //TODO: Candidate for memoization
  const costRevDeckTitle = selectedCostsRevenuesInputDeckTitle
    ? selectedCostsRevenuesInputDeckTitle
    : economicsCostsRevenuesDeckExisting[0].title;
  const ecoParDeckTitle = economicsParametersInputDeckTitle
    ? economicsParametersInputDeckTitle
    : economicsParametersInputDeckTitle[0].title;
  const initialRows = economicsDeckTypes.map((type, i) => {
    return {
      sn: i + 1,
      type,
      deck: i === 0 ? costRevDeckTitle : ecoParDeckTitle,
    };
  });
  const [rows, setRows] = React.useState(initialRows);

  const generateColumns = () => {
    const handleEconomicsDeckTitleChange = (
      value: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const type = row.type as string;

      const selectedValue = value && value.label;
      const selectedTitle = selectedValue as string;

      if (type === "economicsCostsRevenues") {
        const selectedDeck = economicsCostsRevenuesDeckExisting.filter(
          (row: IApplicationExistingData) => row.title === selectedTitle
        )[0];

        if (selectedDeck) {
          const { id, title } = selectedDeck;

          persistSelectedIdTitleAction &&
            dispatch(
              persistSelectedIdTitleAction("economicsReducer", {
                selectedCostsRevenuesInputDeckId: id,
                selectedCostsRevenuesInputDeckTitle: title,
              })
            );
        }
      } else {
        const selectedDeck = economicsParametersDeckExisting.filter(
          (row: IApplicationExistingData) => row.title === selectedTitle
        )[0];

        if (selectedDeck) {
          const { id, title } = selectedDeck;

          persistSelectedIdTitleAction &&
            dispatch(
              persistSelectedIdTitleAction("economicsReducer", {
                selectedEconomicsParametersInputDeckId: id,
                selectedEconomicsParametersInputDeckTitle: title,
              })
            );
        }
      }
    };
    const columns: Column<IRawRow>[] = [
      {
        key: "sn",
        name: "SN",
        resizable: true,
        width: 70,
      },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
        width: 100,
      },
      {
        key: "type",
        name: "TYPE",
        resizable: true,
        width: 150,
      },
      {
        key: "deck",
        name: "SELECTED DECK",
        resizable: true,
        formatter: ({ row }) => {
          const deck = row.deck as string;
          const valueOption = generateSelectOptions([deck])[0];

          const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

          return (
            <Select
              value={valueOption}
              options={economicsDeckTypesOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, false>) =>
                handleEconomicsDeckTitleChange(value, row)
              }
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
            />
          );
        },
        width: 200,
      },
    ];

    return columns;
  };

  const columns = generateColumns();

  type obj = {
    analysisIcon: JSX.Element;
    analysisTitle: string;
    targetVariables: TEconomicsAnalysesTitles | TEconomicsAnalysesTitles[];
  };

  return (
    <CenteredStyle flexDirection="column">
      <div className={classes.npvImage}>
        <AccountBalanceTwoToneIcon fontSize="large" />
        <Typography>Net Cashflow</Typography>
      </div>
      <div style={{ width: 500, height: 80 }}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              newTableRowHeight={35}
              onRowsChange={setRows}
              size={size}
            />
          )}
        </SizeMe>
      </div>
      <EconomicsParametersSensitivities economicsAnalyses={economicsAnalyses} />
      <Button
        className={classes.primaryButton}
        startIcon={<ViewDayTwoToneIcon />}
        onClick={() => alert("sensitivities")}
      >
        Save Sensitivities
      </Button>
      <Button
        className={classes.primaryButton}
        startIcon={<ViewDayTwoToneIcon />}
        onClick={() => alert("calculate")}
      >
        Calculate
      </Button>
    </CenteredStyle>
  );
};

export default EconomicsAnalysis;
