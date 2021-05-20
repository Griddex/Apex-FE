import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import FormatAggregator from "../../../../Visualytics/Components/FormatAggregators/FormatAggregator";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import EconomicsPlotChartsDataPanel from "./EconomicsPlotChartsDataPanel";
import EconomicsPlotChartsSelectCharts from "./EconomicsPlotChartsSelectCharts";
import Draggable, {
  ControlPosition,
  DraggableData,
  DraggableEvent,
} from "react-draggable";
import { callbackify } from "util";
import EconomicsChartSelectionMenu from "../../../Components/Menus/EconomicsChartSelectionMenu";
import ChartCategories from "../../../../Visualytics/Components/ChartCategories/ChartCategories";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";

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

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { showPlotChartsCategories } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <EconomicsChartSelectionMenu />
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
      categoryTitle: "Y Category [Primary]",
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
      categoryTitle: "Y Category [Secondary]",
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

  const panelRef = React.useRef<HTMLDivElement>(null);
  const moveDivRef = React.useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = React.useState<ControlPosition>({
    // x: panelRef.current?.offsetWidth as number,
    x: 300,
    y: 0,
  });

  const classes = useStyles(mousePosition);

  useEffect(() => {
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
        {showPlotChartsCategories && (
          <ChartCategories ChartCategoriesData={ChartCategoriesData.current} />
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
          <EconomicsPlotChartsSelectCharts />
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default EconomicsPlotChartsVisualytics;
