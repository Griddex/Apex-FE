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
import getRSStyles from "../../Import/Utils/GetRSStyles";
import ForecastTreeView from "../Components/ForecastTreeView";
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

const SelectForecastChartDataPanel = () => {
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

  const forecastRuns = forecastResultsExisting.map(
    (row) => row.title
  ) as string[];
  const forecastRunTitleOptions = generateSelectOptions(forecastRuns);
  const selectedForecastTitle =
    selectedForecastingResultsTitle !== ""
      ? selectedForecastingResultsTitle
      : forecastRuns[0];

  const [forecastRun, setForecastRun] = React.useState(selectedForecastTitle);
  const firstRender = React.useRef(true);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleSelectForecastRunChange = (
    row: ValueType<ISelectOption, false>
  ) => {
    const forecastRunName = row?.value as string;
    setForecastRun(forecastRunName);

    dispatch(fetchTreeviewKeysRequestAction());
  };

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<any>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const SelectForecastRun = () => {
    const valueOption = generateSelectOptions([forecastRun])[0];

    const RSStyles: Styles<ISelectOption, false> = getRSStyles(theme);

    return (
      <Select
        value={valueOption}
        options={forecastRunTitleOptions}
        styles={RSStyles}
        onChange={handleSelectForecastRunChange}
        menuPortalTarget={document.body}
        theme={(thm) => ({
          ...thm,
          borderRadius: 0,
          colors: {
            ...thm.colors,
            primary50: theme.palette.primary.light,
            primary25: theme.palette.primary.main,
            primary: theme.palette.grey[700],
          },
        })}
      />
    );
  };

  const expandedRender = () => {
    if (firstRender.current) return true;
    else return expanded === "panel1";
  };

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <>
      <AnalyticsComp
        title="Select Forecast Run"
        content={
          <div style={{ display: "flex", alignItems: "center" }}>
            <SelectForecastRun />
            <CallMadeOutlinedIcon />
          </div>
        }
        direction="Vertical"
      />
      <div style={{ width: "100%", height: "100%" }}>
        <Accordion
          expanded={expandedRender()}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Tree View</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              // height: expanded === "panel1" ? `calc(100% - 48px)` : 48,
              overflow: "auto",
              height: expanded === "panel1" ? 650 : 48,
            }}
          >
            <ForecastTreeView />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Chart Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              // height: expanded === "panel2" ? `calc(100% - 48px)` : 48,
              height: expanded === "panel2" ? 650 : 48,
            }}
          >
            <ForecastChartCategories />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default SelectForecastChartDataPanel;
