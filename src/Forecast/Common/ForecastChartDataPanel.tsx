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
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../Application/Utils/GetRSStyles";
import getRSTheme from "../../Application/Utils/GetRSTheme";
import ChartDataPanel from "../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import ForecastTreeView from "./ForecastTreeView";
import {
  fetchTreeviewKeysRequestAction,
  getForecastDataByIdRequestAction,
} from "../Redux/Actions/ForecastActions";
import ForecastChartCategories from "./ForecastChartCategories";

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

  const wc = "existingDataWorkflows";
  const { forecastResultsExisting } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );
  const { selectedForecastingResultsTitle } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const forecastResults = forecastResultsExisting.map(
    (row) => row.title
  ) as string[];
  const forecastResultsTitleOptions = generateSelectOptions(forecastResults);

  const initialForecastResultsTitleOption =
    selectedForecastingResultsTitle !== ""
      ? {
          value: selectedForecastingResultsTitle,
          label: selectedForecastingResultsTitle,
        }
      : forecastResultsTitleOptions[0];

  const [forecastResultTitleOption, setForecastResultTitleOption] =
    React.useState(initialForecastResultsTitleOption);

  const handleSelectForecastResultsChange = (
    option: ValueType<ISelectOption, false>
  ) => {
    setForecastResultTitleOption(option as ISelectOption);

    dispatch(fetchTreeviewKeysRequestAction());
  };

  return (
    <ChartDataPanel
      selectLabel={"Forecast Results"}
      selectedOption={forecastResultTitleOption}
      titleOptions={forecastResultsTitleOptions}
      handleSelectChange={handleSelectForecastResultsChange}
      selectedTitle={selectedForecastingResultsTitle}
      treeViewComponent={ForecastTreeView}
    />
  );
};

export default ForecastChartDataPanel;
