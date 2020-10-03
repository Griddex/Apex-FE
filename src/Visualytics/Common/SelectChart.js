import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import AnalyticsComp from "./../../Application/Components/Basic/AnalyticsComp";

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
  chartProps: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    border: "1px solid #C4C4C4",
    width: "100%",
  },
}));

const charts = ["StackedAreaChart", "LineChart", "DoughnutChart"];

const SelectChart = () => {
  const classes = useStyles();
  const [chartName, setChartName] = React.useState(charts[0]);

  const handleSelectChange = (event) => {
    const item = event.target.value;
    setChartName(item);
  };

  const SelectItem = () => {
    return (
      <TextField
        id="outlined-select-chartName"
        select
        label=""
        value={chartName}
        onChange={handleSelectChange}
        variant="outlined"
        fullWidth
      >
        {charts.map((chartName) => (
          <MenuItem key={chartName} value={chartName}>
            {chartName}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const renderChartDataPanel = (chartName) => {
    switch (chartName) {
      case "StackedAreaChart":
        return <h1>{"StackedAreaChart"}</h1>;

      case "LineChart":
        return <h1>{"LineChart"}</h1>;

      case "DoughnutChart":
        return <h1>{"DoughnutChart"}</h1>;

      default:
        break;
    }
  };

  return (
    <>
      {/* <div className={classes.chartSelect}> */}
      <AnalyticsComp
        title="Select Chart"
        content={<SelectItem classes={classes} />}
      />
      {/* </div> */}
      <div className={classes.chartProps}>
        {renderChartDataPanel(chartName)}
      </div>
    </>
  );
};

export default SelectChart;
