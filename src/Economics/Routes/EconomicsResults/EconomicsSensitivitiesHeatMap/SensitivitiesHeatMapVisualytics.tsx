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
  const dispatch = useDispatch();
  const workflowProcess = "economicsResultsSensitivitiesHeatmap";

  const componentRef = React.useRef();

  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const { heatMapTreeByScenario } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const classes = useStyles();

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <IconButtonWithTooltip
          toolTipKey="printToolTip"
          toolTipTitle="Print table"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
        />
        <IconButtonWithTooltip
          toolTipKey="printToolTip"
          toolTipTitle="Print table"
          toolTipPlacement="bottom-end"
          icon={() => <RemoveOutlinedIcon />}
        />
      </div>
    ),
    componentRef,
  };

  const chartCategoriesData = React.useRef([
    {
      categoryTitle: "X Category",
      persistAction: React.useCallback(
        (name: string, title: string) => {
          dispatch(
            updateEconomicsParameterAction("heatMapVariableXOption", {
              value: name,
              label: title,
            })
          );
        },
        [dispatch]
      ),
      removeAction: React.useCallback(() => {
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
      }, [dispatch]),
      disable: false,
    },
    {
      categoryTitle: "Y Category",
      persistAction: React.useCallback(
        (name: string, title: string) => {
          dispatch(
            updateEconomicsParameterAction("heatMapVariableYOption", {
              value: name,
              label: title,
            })
          );
        },
        [dispatch]
      ),
      removeAction: React.useCallback(() => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableYOption", null)
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMapData", {})
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMap1or2D", [])
        );
      }, [dispatch]),
      disable: false,
    },
    {
      categoryTitle: "Z Category",
      persistAction: React.useCallback((name: string, title: string) => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableZOption", {
            value: name,
            label: title,
          })
        );
      }, []),
      removeAction: React.useCallback(() => {
        dispatch(
          updateEconomicsParameterAction("heatMapVariableYOption", null)
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMapData", {})
        );
        dispatch(
          updateEconomicsParameterAction("sensitivitiesHeatMap1or2D", [])
        );
      }, [dispatch]),
      disable: false,
    },
  ]);

  let disableCollection = [] as boolean[];
  if (heatMapTreeByScenario.id === "") {
    disableCollection = [true, true, true];
  } else if (heatMapTreeByScenario["children"].length === 1) {
    disableCollection = [false, true, true];
  } else if (heatMapTreeByScenario["children"].length === 2) {
    disableCollection = [false, false, true];
  } else {
    disableCollection = [false, false, false];
  }

  const chartCategoriesDataUpdatedWithDisable = chartCategoriesData.current.map(
    (row, i) => ({ ...row, disable: disableCollection[i] })
  );

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SensitivitiesHeatMapDataPanel
            categoriesTitle="Heat Map"
            chartCategoriesData={chartCategoriesDataUpdatedWithDisable}
          />
        </div>

        <div className={classes.chartContent}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: 30,
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
                <MapStyleFormatters workflowProcess={workflowProcess} />
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
