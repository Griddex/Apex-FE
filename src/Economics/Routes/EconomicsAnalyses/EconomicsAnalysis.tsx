import {
  Button,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@material-ui/core";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import ViewDayTwoToneIcon from "@material-ui/icons/ViewDayTwoTone";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles, ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";
import { ApexGrid } from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IApplicationExistingDataRow } from "../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../Application/Utils/GetRSTheme";
import {
  IEconomicsParametersSensitivites,
  TEconomicsAnalysesTitles,
} from "./EconomicsAnalysesTypes";
import EconomicsParametersSensitivities from "./EconomicsParametersSensitivities/EconomicsParametersSensitivities";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";

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
  } = useSelector((state: RootState) => state.economicsReducer[wc]);

  const {
    selectedCostsRevenuesInputDeckTitle,
    selectedEconomicsParametersInputDeckTitle,
  } = useSelector((state: RootState) => state.economicsReducer);

  //TODO: Candidate for memoization
  const economicsCostsRevenuesDeckTitles = economicsCostsRevenuesDeckExisting.map(
    (t: IApplicationExistingDataRow) => t.title
  );
  const economicsParametersDeckTitles = economicsParametersDeckExisting.map(
    (t: IApplicationExistingDataRow) => t.title
  );
  const costRevDeckTitle = selectedCostsRevenuesInputDeckTitle
    ? selectedCostsRevenuesInputDeckTitle
    : economicsCostsRevenuesDeckTitles;
  const ecoParDeckTitle = selectedEconomicsParametersInputDeckTitle
    ? selectedEconomicsParametersInputDeckTitle
    : economicsParametersDeckTitles[0];

  type obj = {
    analysisIcon: JSX.Element;
    analysisTitle: string;
    targetVariables: TEconomicsAnalysesTitles | TEconomicsAnalysesTitles[];
  };

  const valueOptionCR = generateSelectOptions([costRevDeckTitle])[0];
  const economicsCostsRevenuesOptions = generateSelectOptions(
    economicsCostsRevenuesDeckTitles
  );
  const valueOptionEP = generateSelectOptions([ecoParDeckTitle])[0];
  const economicsParametersOptions = generateSelectOptions(
    economicsParametersDeckTitles
  );
  const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

  const [analysisPerspective, setAnalysisPerspective] = React.useState(
    "noSensitivity"
  );

  return (
    <CenteredStyle
      flexDirection="column"
      justifyContent="space-around"
      height={"95%"}
    >
      <CenteredStyle justifyContent="space-between" width={"80%"} height={50}>
        <AnalyticsComp
          title="Select Costs and Revenue Deck"
          direction="Vertical"
          content={
            <Select<ISelectOption, false>
              value={valueOptionCR}
              options={economicsCostsRevenuesOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, false>) => {
                const selectedeCR = economicsCostsRevenuesDeckExisting.filter(
                  (row: IApplicationExistingDataRow) =>
                    row.title === value?.label
                );
                const { id, title } = selectedeCR;

                persistSelectedIdTitleAction &&
                  dispatch(
                    persistSelectedIdTitleAction("economicsReducer", {
                      selectedCostsRevenuesInputDeckId: id,
                      selectedCostsRevenuesInputDeckTitle: title,
                    })
                  );
              }}
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
            />
          }
        />
        <AnalyticsComp
          title="Select Economics Parameters Deck"
          direction="Vertical"
          content={
            <Select<ISelectOption, false>
              value={valueOptionEP}
              options={economicsParametersOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, false>) => {
                const selectedeP = economicsParametersDeckExisting.filter(
                  (row: IApplicationExistingDataRow) =>
                    row.title === value?.label
                );
                const { id, title } = selectedeP;

                persistSelectedIdTitleAction &&
                  dispatch(
                    persistSelectedIdTitleAction("economicsReducer", {
                      selectedEconomicsParametersInputDeckId: id,
                      selectedEconomicsParametersInputDeckTitle: title,
                    })
                  );
              }}
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
            />
          }
        />
      </CenteredStyle>

      <RadioGroup
        value={analysisPerspective}
        onChange={(event: React.ChangeEvent<any>) => {
          const { value } = event.target;

          setAnalysisPerspective(value);
        }}
        style={{ flexDirection: "row" }}
      >
        <FormControlLabel
          value="noSensitivity"
          control={<Radio />}
          label="No Sensitivity Analysis"
        />
        <FormControlLabel
          value="sensitivity"
          control={<Radio />}
          label="Sensitivity Analysis"
        />
      </RadioGroup>
      {analysisPerspective === "sensitivity" && (
        <EconomicsParametersSensitivities
          economicsAnalyses={economicsAnalyses}
        />
      )}

      <CenteredStyle width={400} height={40} justifyContent="space-between">
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
    </CenteredStyle>
  );
};

export default EconomicsAnalysis;
