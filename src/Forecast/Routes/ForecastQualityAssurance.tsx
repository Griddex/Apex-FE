import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch } from "react-redux";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";

const ForecastChartDataPanel = React.lazy(
  () => import("../Common/ForecastChartDataPanel")
);
const ForecastQualityAssuranceData = React.lazy(
  () => import("../Common/ForecastQualityAssuranceData")
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  chartBody: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chartPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: "#FFF",
    padding: 5,
  },
}));

const ForecastQualityAssurance = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <ForecastChartDataPanel />
        </div>

        <ForecastQualityAssuranceData
          showChart={false}
          showBaseButtons={true}
        />
      </div>
    </div>
  );
};

export default ForecastQualityAssurance;
