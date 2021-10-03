import { Theme } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import AnalyticsComp from "../../Application/Components/Basic/AnalyticsComp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartProps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: 200,
      border: "1px solid #C4C4C4",
      width: "100%",
    },
  })
);

const ForecastChartCategories = () => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
          title="Z Category"
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

export default ForecastChartCategories;
