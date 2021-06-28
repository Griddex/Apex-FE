import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { Styles, ValueType } from "react-select";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import {
  IForecastSelectOption,
  ISelectOption,
} from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../Application/Utils/GetRSStyles";
import getRSTheme from "../../Application/Utils/GetRSTheme";
import ChartDataPanel from "../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import ForecastTreeView from "./ForecastTreeView";
import {
  fetchTreeviewKeysRequestAction,
  getForecastDataByIdRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import ForecastChartCategories from "./ForecastChartCategories";
import { IForecastRunOptions } from "../Routes/ForecastData";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  chartSelect: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    border: "1px solid #C4C4C4",
    width: "100%",
  },
  treeViewPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ForecastChartDataPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "storedDataWorkflows";
  const { forecastResultsStored } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );
  const { selectedForecastingResultsTitle } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const forecastRunTitleOptions = forecastResultsStored.map((row) => ({
    value: row.title,
    label: row.title,
    id: row.id,
  })) as IForecastSelectOption[];

  forecastRunTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
  });

  const selectedForecastTitleOption =
    selectedForecastingResultsTitle !== ""
      ? {
          value: selectedForecastingResultsTitle,
          label: selectedForecastingResultsTitle,
          id: (forecastRunTitleOptions as IForecastRunOptions[]).filter(
            (o) => o.label === selectedForecastingResultsTitle
          )[0].id,
        }
      : forecastRunTitleOptions[0];

  const [forecastRunOption, setForecastRunOption] =
    React.useState<IForecastSelectOption>(
      selectedForecastTitleOption as IForecastSelectOption
    );

  const handleSelectForecastResultsChange = (
    option: ValueType<IForecastSelectOption, false>
  ) => {
    setForecastRunOption(option as IForecastSelectOption);

    dispatch(
      updateForecastResultsParameterAction(
        "selectedForecastingResultsId",
        (option as IForecastSelectOption).id
      )
    );
    dispatch(getForecastDataByIdRequestAction());
  };

  return (
    <ChartDataPanel<IForecastSelectOption>
      selectLabel={"Forecast Results"}
      selectedOption={forecastRunOption}
      titleOptions={forecastRunTitleOptions}
      handleSelectChange={handleSelectForecastResultsChange}
      selectedTitle={selectedForecastingResultsTitle}
      treeViewComponent={ForecastTreeView}
    />
  );
};

export default ForecastChartDataPanel;
