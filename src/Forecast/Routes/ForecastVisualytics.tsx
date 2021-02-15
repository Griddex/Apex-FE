import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import SelectChartDataPanel from "../Common/SelectForecastChartDataPanel";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import FormatAggregator from "../../Visualytics/Components/FormatAggregator";
import { IForecastRoutes } from "./ForecastRoutesTypes";
import SelectChart from "../../Visualytics/Common/SelectChart";
import SelectForecastChartDataPanel from "../Common/SelectForecastChartDataPanel";
import ChartButtons from "../../Visualytics/Components/Menus/ChartButtons";
import ForecastChartTitlePlaque from "../Components/TitlePlaques/ForecastChartTitlePlaque";

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
  },
  chartPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    // width: 300,
    width: "15%",
    border: "1px solid #A8A8A8",
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    marginRight: 45,
    height: "100%",
    width: "85%",
    backgroundColor: "#FFF",
    border: "1px solid #A8A8A8",
  },
}));

const ForecastVisualytics = ({
  wrkflwCtgry,
  wrkflwPrcss,
  chartButtons,
}: IForecastRoutes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SelectForecastChartDataPanel />
        </div>
        <div className={classes.chartContent}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <ForecastChartTitlePlaque />
            <ChartButtons {...chartButtons} />{" "}
          </div>
          <SelectChart />
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default ForecastVisualytics;
