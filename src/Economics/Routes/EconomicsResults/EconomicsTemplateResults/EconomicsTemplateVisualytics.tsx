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
import { SizeMe } from "react-sizeme";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const EconomicsTemplateChart = React.lazy(
  () => import("./EconomicsTemplateChart")
);
const EconomicsTemplateDataPanel = React.lazy(
  () => import("./EconomicsTemplateDataPanel")
);
const ContextDrawer = React.lazy(
  () => import("../../../../Application/Components/Drawers/ContextDrawer")
);

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
    minWidth: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    height: "100%",
    width: "90%",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
    overflow: "auto",
  },
  plotChart: {
    height: "100%",
    width: "100%",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (drawer) => drawer
);

const isForecastResultsLoadingSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.isForecastResultsLoading,
  (drawer) => drawer
);

const EconomicsTemplateVisualytics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const componentRef = React.useRef();

  const showContextDrawer = useSelector(showContextDrawerSelector);
  const isForecastResultsLoading = useSelector(
    isForecastResultsLoadingSelector
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
          <EconomicsTemplateDataPanel />
        </div>
        {isForecastResultsLoading ? (
          <div>Forecast results loading</div>
        ) : (
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
            <SizeMe monitorHeight refreshRate={32}>
              {({ size }) => {
                return classes.chartBody === "Select Chart..." ? (
                  <NoSelectionPlaceholder
                    icon={<ArrowUpwardOutlinedIcon color="primary" />}
                    text="Select chart.."
                  />
                ) : (
                  <div className={classes.plotChart}>
                    <EconomicsTemplateChart
                      width={size.width as number}
                      height={size.height as number}
                    />
                  </div>
                );
              }}
            </SizeMe>
          </div>
        )}
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <div>Format</div>}</ContextDrawer>
      )}
    </div>
  );
};

export default EconomicsTemplateVisualytics;
