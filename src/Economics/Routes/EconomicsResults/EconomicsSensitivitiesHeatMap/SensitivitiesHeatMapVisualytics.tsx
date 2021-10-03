import makeStyles from '@mui/styles/makeStyles';
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import VisualyticsContext from "../../../../Visualytics/Components/ContextDrawers/VisualyticsContext";
import { ChartFormatAggregatorContextProvider } from "../../../../Visualytics/Components/Contexts/ChartFormatAggregatorContext";
import ChartFormatAggregator from "../../../../Visualytics/Components/FormatAggregators/ChartFormatAggregator";
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
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsSensitivitiesHeatmap";

  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const [selectedZ, setSelectedZ] = React.useState("");
  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const classes = useStyles();

  const basePath = `${wc}.commonChartProps`;

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

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <SensitivitiesHeatMapDataPanel
            selectedZ={selectedZ}
            setSelectedZ={setSelectedZ}
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
          <SensitivitiesHeatMapChart
            selectedZ={selectedZ}
            setSelectedZ={setSelectedZ}
          />
        </div>
        {/* {showContextDrawer && (
          <ContextDrawer>
            {() =>
              expandContextDrawer ? (
                <MapStyleFormatters workflowProcess={workflowProcess} />
              ) : (
                <div />
              )
            }
          </ContextDrawer>
        )} */}

        {showContextDrawer && (
          <VisualyticsContext
            reducer={reducer}
            chartType="heatMapChart"
            basePath={basePath}
            updateParameterAction={updateEconomicsParameterAction}
            openContextWindow={openContextWindow}
            setOpenContextWindow={setOpenContextWindow}
          />
        )}
      </div>
    </div>
  );
};

export default SensitivitiesHeatMapVisualytics;
