import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import SelectChart from "./SelectChart";
import SelectChartDataPanel from "./SelectChartDataPanel";
import FormatAggregator from "../Components/FormatAggregator";
import { contextDrawerShowAction } from "./../../Application/Redux/Actions/LayoutActions";

const useStyles = makeStyles(() => ({
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
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  chartPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: "15%",
    // border: "1px solid #A8A8A8",
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    marginLeft: 5,
    height: "100%",
    width: "85%",
    backgroundColor: "#FFF",
  },
}));

const Visualytics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showContextDrawer } = useSelector((state) => state.layoutReducer);
  const data = [];

  useEffect(() => {
    dispatch(contextDrawerShowAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SelectChartDataPanel />
        </div>
        <div className={classes.chartContent}>
          <SelectChart />
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer data={data}>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default Visualytics;
