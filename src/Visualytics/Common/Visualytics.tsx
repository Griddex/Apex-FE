import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ChartButtons from "../Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../Components/Menus/ChartButtonsTypes";
import SelectChart from "./SelectChart";
import VisualyticsChartDataPanel from "./VisualyticsChartDataPanel";

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
    width: 300,
    // border: "1px solid #A8A8A8",
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    marginLeft: 5,
    height: "100%",
    width: "90%",
    backgroundColor: "#FFF",
    maxWidth: "90%",
  },
}));

const Visualytics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const componentRef = React.useRef();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
    componentRef,
  };

  useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <VisualyticsChartDataPanel />
        </div>
        <div className={classes.chartContent}>
          <ChartButtons {...chartButtons} />
          <SelectChart />
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <div>Format</div>}</ContextDrawer>
      )}
    </div>
  );
};

export default Visualytics;
