import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import SensitivitiesHeatMapChart from "./SensitivitiesHeatMapChart";
import SensitivitiesHeatMapDataPanel from "./SensitivitiesHeatMapDataPanel";
import VisualyticsContext from "../../../../Visualytics/Components/ContextDrawers/VisualyticsContext";
import generateVariableDataOptions from "../../../../Visualytics/Utils/GenerateVariableDataOptions";
import { Resizable } from "re-resizable";

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
    overflow: "auto",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (drawer) => drawer
);
const heatMapVariableZOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableZOptions,
  (data) => data
);

const SensitivitiesHeatMapVisualytics = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const basePath = `${wc}.commonChartProps`;

  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const showContextDrawer = useSelector(showContextDrawerSelector);
  const heatMapVariableZOptions = useSelector(heatMapVariableZOptionsSelector);

  const { variableZDataOptions, ZValuesTitle } = React.useMemo(
    () => generateVariableDataOptions(heatMapVariableZOptions),
    [heatMapVariableZOptions]
  );

  const firstZValue = variableZDataOptions[0]?.value as string;
  const [selectedZ, setSelectedZ] = React.useState(firstZValue);

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

  const selectedZValue = selectedZ ? selectedZ : firstZValue;

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <Resizable
          // style={style}
          defaultSize={{
            width: 300,
            height: "100%",
          }}
        >
          <SensitivitiesHeatMapDataPanel
            selectedZ={selectedZValue}
            setSelectedZ={React.useCallback(setSelectedZ, [])}
            variableZDataOptions={variableZDataOptions}
            ZValuesTitle={ZValuesTitle}
          />
        </Resizable>

        <div className={classes.chartContent}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: 2,
              marginRight: 40,
            }}
          >
            <EconomicsChartTitlePlaque />
            <ChartButtons {...chartButtons} />
          </div>
          <SensitivitiesHeatMapChart selectedZ={selectedZValue} />
        </div>

        {showContextDrawer && (
          <VisualyticsContext
            reducer={reducer}
            currentThresholdTitle={"sensitivitiesHeatMapThresholdData"}
            chartType="heatMapChart"
            basePath={basePath}
            updateParameterAction={React.useCallback(
              updateEconomicsParameterAction,
              []
            )}
            openContextWindow={openContextWindow}
            setOpenContextWindow={React.useCallback(setOpenContextWindow, [])}
          />
        )}
      </div>
    </div>
  );
};

export default SensitivitiesHeatMapVisualytics;
