import { makeStyles } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ChartCategories from "../../../../Visualytics/Components/ChartCategories/ChartCategories";
import FormatAggregator from "../../../../Visualytics/Components/FormatAggregators/FormatAggregator";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import MapStyleFormatters from "../../../Components/MapStyleFormatters/MapStyleFormatters";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { mapData3D } from "../../../Data/EconomicsData";
import SensitivitiesHeatMapChart from "./SensitivitiesHeatMapChart";
import SensitivitiesHeatMapDataPanel from "./SensitivitiesHeatMapDataPanel";

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
    width: "calc(100% - 300px)",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
  },
}));

const SensitivitiesHeatMapVisualytics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const workflowProcess = "economicsResultsSensitivitiesHeatmap";

  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { showHeatMapCategories } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
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
          <SensitivitiesHeatMapDataPanel />
        </div>

        {showHeatMapCategories && <ChartCategories />}

        <div className={classes.chartContent}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: 50,
              marginTop: 2,
              marginRight: 40,
            }}
          >
            <EconomicsChartTitlePlaque />
            <ChartButtons {...chartButtons} />
          </div>
          <SensitivitiesHeatMapChart />
        </div>
        {showContextDrawer && (
          <ContextDrawer>
            {() =>
              expandContextDrawer ? (
                <MapStyleFormatters
                  mapData={mapData3D}
                  workflowProcess={workflowProcess}
                />
              ) : (
                <div />
              )
            }
          </ContextDrawer>
        )}
      </div>
    </div>
  );
};

export default SensitivitiesHeatMapVisualytics;
