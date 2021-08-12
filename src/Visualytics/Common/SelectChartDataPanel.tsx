import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent } from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import { persistChartIndexAction } from "../Redux/VisualyticsActions/VisualyticsActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
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
  chartPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "auto",
    // border: "1px solid #C4C4C4",
    width: "100%",
    // overflow: "auto",
  },
}));

const charts = [
  "StackedAreaChartPanel",
  "LineChartPanel",
  "DoughnutChartPanel",
  "BarChartPanel",
];

const SelectChartDataPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [chartName, setChartName] = React.useState(charts[0]);

  const handleSelectChange = (event: ChangeEvent<any>) => {
    const chartPanelName = event.target.value;
    setChartName(chartPanelName);

    const chartIndex = charts.indexOf(chartPanelName);
    dispatch(persistChartIndexAction(chartIndex));
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

  const renderChartDataPanel = (chartName: string) => {
    switch (chartName) {
      case "StackedAreaChartPanel":
        return <h6>{"StackedAreaChartPanel"}</h6>;

      case "LineChartPanel":
        return <h6>{"LineChartPanel"}</h6>;

      case "DoughnutChartPanel":
        return <h6>{"DoughnutChartPanel"}</h6>;

      case "BarChartPanel":
        return <h6>{"BarChartPanel"}</h6>;

      default:
        break;
    }
  };

  return (
    <>
      <AnalyticsComp
        title="Select Chart"
        content={<SelectItem />}
        direction="Vertical"
      />
      <div className={classes.chartPanel}>
        {renderChartDataPanel(chartName)}
      </div>
    </>
  );
};

export default SelectChartDataPanel;
