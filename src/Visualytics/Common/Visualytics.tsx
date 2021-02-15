import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import SelectChart from "./SelectChart";
import SelectChartDataPanel from "./SelectChartDataPanel";
import FormatAggregator from "../Components/FormatAggregator";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ChartButtons from "../Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../Components/Menus/ChartButtonsTypes";

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

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SelectChartDataPanel />
        </div>
        <div className={classes.chartContent}>
          <ChartButtons {...chartButtons} />
          <SelectChart />
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default Visualytics;
