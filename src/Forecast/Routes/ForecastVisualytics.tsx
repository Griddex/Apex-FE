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
import ForecastSelectChart from "../Common/ForecastSelectChart";
import { IChartButtonsProps } from "../../Visualytics/Components/Menus/ChartButtonsTypes";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import IconButtonWithTooltip from "../../Application/Components/IconButtons/IconButtonWithTooltip";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

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
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    marginRight: 45,
    height: "100%",
    width: "90%",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
  },
}));

const ForecastVisualytics = ({ wrkflwCtgry, wrkflwPrcss }: IForecastRoutes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { isForecastResultsLoading } = useSelector(
    (state: RootState) => state.forecastReducer
  );
  console.log(
    "Logged output --> ~ file: ForecastVisualytics.tsx ~ line 68 ~ ForecastVisualytics ~ isForecastResultsLoading",
    isForecastResultsLoading
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ForecastVariableButtonsMenu />
        <IconButtonWithTooltip
          toolTipKey="printToolTip"
          toolTipTitle="Print table"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
          action={() => alert("Print")}
        />
        <IconButtonWithTooltip
          toolTipKey="printToolTip"
          toolTipTitle="Print table"
          toolTipPlacement="bottom-end"
          icon={() => <RemoveOutlinedIcon />}
          action={() => alert("Print")}
        />
      </div>
    ),
  };

  useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SelectForecastChartDataPanel />
        </div>
        {isForecastResultsLoading ? (
          <div>Forecast results loading</div>
        ) : (
          <div className={classes.chartContent}>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <ForecastChartTitlePlaque />
              <ChartButtons {...chartButtons} />
            </div>
            <ForecastSelectChart />
          </div>
        )}
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default ForecastVisualytics;
