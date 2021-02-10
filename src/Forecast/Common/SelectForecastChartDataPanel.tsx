import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { persistForecastChartIndexAction } from "../Redux/ForecastActions/ForecastActions";
import ForecastStackedAreaChartPanel from "./ForecastStackedAreaChartPanel";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";

const useStyles = makeStyles(() => ({
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
  chartPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 500,
    // border: "1px solid #C4C4C4",
    width: "100%",
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

  const handleSelectChange = (event: ChangeEvent<any>) => {
    const forcastRunName = event.target.value;
    setForecastRun(forcastRunName);

    const chartIndex = forecastRuns.indexOf(forcastRunName);
    // dispatch(persistForecastChartIndexAction(chartIndex));
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
      <div className={classes.chartPanel}>
        <ForecastStackedAreaChartPanel />
      </div>
    </>
  );
};

export default SelectForecastChartDataPanel;
