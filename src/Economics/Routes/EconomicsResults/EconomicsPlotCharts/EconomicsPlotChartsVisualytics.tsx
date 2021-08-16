import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { ControlPosition } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoData from "../../../../Application/Components/Visuals/NoData";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ChartCategories from "../../../../Visualytics/Components/ChartCategories/ChartCategories";
import LineChartFormatAggregator from "../../../../Visualytics/Components/FormatAggregators/LineChartFormatAggregator";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../../../Visualytics/Components/Menus/ChartSelectionMenu";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import EconomicsPlotChartsDataPanel from "./EconomicsPlotChartsDataPanel";
import EconomicsPlotChartsSelectChart from "./EconomicsPlotChartsSelectChart";

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
    width: (props: ControlPosition) => {
      return props.x;
    },
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
    width: (props: ControlPosition) => {
      return `calc(100% - ${props.x}px)`;
    },
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
  },
}));

const EconomicsPlotChartsVisualytics = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  const componentRef = React.useRef();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const { showPlotChartsCategories, selectedEconomicsPlotChartOption } =
    useSelector((state: RootState) => state.economicsReducer);

  const [showCategories, setShowCategories] = React.useState(
    showPlotChartsCategories
  );

  const chartType = selectedEconomicsPlotChartOption.value;
  const economicsPlotCharts = [
    {
      value: "stackedAreaChart",
      label: "Stacked Area",
    },
    {
      value: "lineChart",
      label: "Line",
    },
    {
      value: "doughnutChart",
      label: "Doughnut",
    },
    {
      value: "barChart",
      label: "Bar",
    },
  ];

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={economicsPlotCharts}
          selectedChartType={selectedEconomicsPlotChartOption}
          updateAction={updateEconomicsParameterAction}
        />
        <IconButtonWithTooltip
          toolTipKey="saveToolTip"
          toolTipTitle="Save"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
        />
        <IconButtonWithTooltip
          toolTipKey="removeToolTip"
          toolTipTitle="Remove"
          toolTipPlacement="bottom-end"
          icon={() => <RemoveOutlinedIcon />}
        />
      </div>
    ),
    componentRef,
  };

  const ChartCategoriesData = React.useRef([
    {
      categoryTitle: "X Category",
      persistAction: (name: string, title: string) =>
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableXOption", {
            value: name,
            label: title,
          })
        ),
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableXOption", null)
        );
        //TODO before dispatching, check if is empty
        dispatch(updateEconomicsParameterAction("plotChartsData", {}));
        dispatch(updateEconomicsParameterAction("plotChartsDataTrans", []));
      },
    },
    {
      categoryTitle: "Y Category [Primary]",
      persistAction: (name: string, title: string) =>
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableYPriOption", {
            value: name,
            label: title,
          })
        ),
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableYPriOption", null)
        );
        dispatch(updateEconomicsParameterAction("plotChartsData", {}));
        dispatch(updateEconomicsParameterAction("plotChartsDataTrans", []));
      },
    },
    {
      categoryTitle: "Y Category [Secondary]",
      persistAction: (name: string, title: string) => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableZOption", {
            value: name,
            label: title,
          })
        );
      },
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableYOption", null)
        );
        dispatch(updateEconomicsParameterAction("plotChartsData", {}));
        dispatch(updateEconomicsParameterAction("plotChartsDataTrans", []));
      },
    },
  ]);

  const panelRef = React.useRef<HTMLDivElement>(null);
  const moveDivRef = React.useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = React.useState<ControlPosition>({
    // x: panelRef.current?.offsetWidth as number,
    x: 300,
    y: 0,
  });

  const classes = useStyles(mousePosition);

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
    setMousePosition({ x: panelRef.current?.offsetWidth as number, y: 0 });
  }, [dispatch]);

  const handler = React.useCallback(() => {
    function onMouseMove(e: MouseEvent) {
      console.log(
        "Logged output --> ~ file: EconomicsPlotChartsVisualytics.tsx ~ line 120 ~ onMouseMove ~ e",
        e
      );
      setMousePosition((currentSize) => {
        return {
          x: currentSize.x + e.movementX,
          y: currentSize.y,
        };
      });
    }

    function onMouseUp() {
      moveDivRef?.current?.removeEventListener("mousemove", onMouseMove);
      moveDivRef?.current?.removeEventListener("mouseup", onMouseUp);
    }

    moveDivRef?.current?.addEventListener("mousemove", onMouseMove);
    moveDivRef?.current?.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div
          className={classes.chartPanel}
          // style={{ width: mousePosition.x, left: mousePosition.x }}
          ref={panelRef}
        >
          <EconomicsPlotChartsDataPanel />
        </div>
        {showCategories && (
          <ChartCategories
            categoriesTitle={selectedEconomicsPlotChartOption.label}
            ChartCategoriesData={ChartCategoriesData.current}
            showCategories={showCategories}
            setShowCategories={setShowCategories}
          />
        )}

        <div
          ref={moveDivRef}
          style={{
            width: 5,
            height: "100%",
            cursor: "ew-resize",
            backgroundColor: theme.palette.grey[200],
          }}
          onMouseDown={handler}
          draggable={true}
        />

        <div className={classes.chartContent}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: 50,
              marginTop: 2,
              marginRight: 40,
            }}
          >
            <EconomicsChartTitlePlaque />
            <ChartButtons {...chartButtons} />
          </div>
          {chartType === "Select Chart..." ? (
            <NoData />
          ) : (
            <EconomicsPlotChartsSelectChart />
          )}
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => {
            if (chartType === "stackedAreaChart") {
              return <div>StackedArea</div>;
            } else if (chartType === "lineChart") {
              return (
                <LineChartFormatAggregator
                  workflowCategory={wc}
                  workflowProcess={wp}
                  updateParameterAction={updateEconomicsParameterAction}
                  chartType="lineChart"
                />
              );
            } else {
              return <div>No Format</div>;
            }
          }}
        </ContextDrawer>
      )}
    </div>
  );
};

export default EconomicsPlotChartsVisualytics;
