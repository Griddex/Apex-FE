import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import CenteredStyle from "../../../Application/Components/Styles/CenteredStyle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartProps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: 150,
      border: "1px solid #C4C4C4",
      width: "100%",
    },
  })
);

const ChartCategories = () => {
  const classes = useStyles();

  return (
    <CenteredStyle flexDirection="column" width={300}>
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
    </CenteredStyle>
  );
};

export default ChartCategories;
