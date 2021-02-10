import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";
import ForecastTreeView from "../Components/ForecastTreeView";

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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 200,
    border: "1px solid #C4C4C4",
    width: "100%",
  },
  list: { minHeight: 200, border: "1px solid #C4C4C4" },
  listItem: { padding: 0, cursor: "pointer" },
  itemIcon: {
    color: theme.palette.primary.main,
    minWidth: 30,
  },
  moreItems: {
    display: "flex",
    justifyContent: "flex-end",
    color: theme.palette.primary.main,
  },
}));

const ForecastStackedAreaChartPanel = () => {
  const classes = useStyles();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ForecastTreeView />
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="X Category"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="Y Category"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="Filter"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
      <div className={classes.chartProps}>
        <AnalyticsComp
          title="Color"
          content={<div>Chart</div>}
          direction="Vertical"
        />
      </div>
    </div>
  );
};

export default ForecastStackedAreaChartPanel;
