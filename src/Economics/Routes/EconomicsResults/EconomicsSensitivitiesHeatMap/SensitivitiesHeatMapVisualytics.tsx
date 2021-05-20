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
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import MapStyleFormatters from "../../../Components/MapStyleFormatters/MapStyleFormatters";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { mapData3D } from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
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

  const ChartCategoriesData = React.useRef([
    {
      categoryTitle: "X Category",
      persistAction: (name: string, title: string) =>
        dispatch(
          updateEconomicsParameterAction("heatMapVariableXOption", {
            value: name,
            label: title,
          })
        ),
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableXOption", null)
        );
        //TODO before dispatching, check if is empty
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMapData", {})
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMap1or2D", [])
        );
      },
    },
    {
      categoryTitle: "Y Category",
      persistAction: (name: string, title: string) =>
        dispatch(
          updateEconomicsParameterAction("heatMapVariableYOption", {
            value: name,
            label: title,
          })
        ),
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableYOption", null)
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMapData", {})
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMap1or2D", [])
        );
      },
    },
    {
      categoryTitle: "Z Category",
      persistAction: (name: string, title: string) => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableZOption", {
            value: name,
            label: title,
          })
        );
      },
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableYOption", null)
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMapData", {})
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMap1or2D", [])
        );
      },
    },
  ]);

  useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SensitivitiesHeatMapDataPanel />
        </div>

        {showHeatMapCategories && (
          <ChartCategories ChartCategoriesData={ChartCategoriesData.current} />
        )}

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
