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
    marginLeft: (props: any) => (props.showHeatMapCategories ? -295 : 5),
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

  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const { showHeatMapCategories } = useSelector(
    (state: RootState) => state.economicsReducer
  );
  const [showCategories, setShowCategories] = React.useState(
    showHeatMapCategories
  );
  const classes = useStyles({ showHeatMapCategories });

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
          <ChartCategories
            categoriesTitle="Grid Map"
            ChartCategoriesData={ChartCategoriesData.current}
            showCategories={showHeatMapCategories}
            setShowCategories={setShowCategories}
          />
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
