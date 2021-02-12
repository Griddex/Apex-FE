import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ForecastTreeView from "../Components/ForecastTreeView";
import ForecastChartCategories from "./ForecastChartCategories";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
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

  const forecastRuns = [
    "ARPR Forecast Run 1",
    "ARPR Forecast Run 2",
    "ARPR Forecast Run 3",
    "ARPR Forecast Run 4",
  ];
  const [forecastRun, setForecastRun] = React.useState(forecastRuns[0]);
  const firstRender = React.useRef(true);

  const handleSelectChange = (event: ChangeEvent<any>) => {
    const forcastRunName = event.target.value;
    setForecastRun(forcastRunName);

    const chartIndex = forecastRuns.indexOf(forcastRunName);
    // dispatch(persistForecastChartIndexAction(chartIndex));
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<any>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const SelectItem = () => {
    return (
      <TextField
        id="outlined-select-forecastRun"
        select
        label=""
        value={forecastRun}
        onChange={handleSelectChange}
        variant="outlined"
        fullWidth
      >
        {forecastRuns.map((forecastRun) => (
          <MenuItem key={forecastRun} value={forecastRun}>
            {forecastRun}
          </MenuItem>
        ))}
      </TextField>
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
            <SelectItem />
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
