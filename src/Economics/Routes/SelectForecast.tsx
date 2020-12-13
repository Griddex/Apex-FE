import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/RootReducer";
import ForecastRunDetail from "../Components/ForecastRunDetail";
import ForecastTreeView from "../Components/ForecastTreeView";
import { contextDrawerShowAction } from "./../../Application/Redux/Actions/LayoutActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  forecastBody: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center", //around, between
    // justifyContent: "space-evenly", //around, between
  },
  forecastPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 250,
    // border: "1px solid #A8A8A8",
    backgroundColor: "#FFF",
    padding: 5,
  },
  forecastContent: {
    marginLeft: 5,
    height: "100%",
    minWidth: theme.breakpoints.values["sm"],
    backgroundColor: "#FFF",
  },
}));

const SelectForecast = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const data: Record<string, unknown>[] = [];

  useEffect(() => {
    dispatch(contextDrawerShowAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.forecastBody}>
        <div className={classes.forecastPanel}>
          <ForecastTreeView />
        </div>
        <div className={classes.forecastContent}>
          <ForecastRunDetail />
        </div>
      </div>
      {/* {showContextDrawer && (
        <ContextDrawer data={data}>{() => <FormatAggregator />}</ContextDrawer>
      )} */}
    </div>
  );
};

export default SelectForecast;
