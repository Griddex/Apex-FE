import { makeStyles } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import FormatAggregator from "../../../../Visualytics/Components/FormatAggregator";
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
    marginRight: 45,
    height: "100%",
    width: "90%",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
  },
}));

const EconomicsPlotChartsVisualytics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { isForecastResultsLoading } = useSelector(
    (state: RootState) => state.forecastReducer
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

  const handleStop = (event: DraggableEvent, data: DraggableData) => {
    console.log(
      "Logged output --> ~ file: EconomicsPlotChartsVisualytics.tsx ~ line 94 ~ handleStop ~ data",
      data
    );
  };
  const handleStart = (event: DraggableEvent, data: DraggableData) => {
    console.log(
      "Logged output --> ~ file: EconomicsPlotChartsVisualytics.tsx ~ line 94 ~ handleStop ~ data",
      data
    );
  };
  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    console.log(
      "Logged output --> ~ file: EconomicsPlotChartsVisualytics.tsx ~ line 94 ~ handleStop ~ data",
      data
    );
  };

  const [MousePosition, setMousePosition] = React.useState<ControlPosition>({
    x: 0,
    y: 0,
  });
  const handleMouseDown = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const handleMouseUp = (event: MouseEvent) => {
    console.log(
      "Logged output --> ~ file: EconomicsPlotChartsVisualytics.tsx ~ line 114 ~ handleMouseMove ~ event",
      event
    );
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  React.useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <EconomicsPlotChartsDataPanel />
        </div>
        <div
          style={{
            width: 5,
            height: "100%",
            cursor: "ew-resize",
          }}
        ></div>
        {/* <Draggable
          axis="x"
          // handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={MousePosition}
          grid={[5, 5]}
          scale={1}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <div
            style={{
              width: 5,
              height: "100%",
              cursor: "ew-resize",
            }}
          ></div>
        </Draggable> */}
        {isForecastResultsLoading ? (
          <div>Forecast results loading</div>
        ) : (
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
            <EconomicsPlotChartsSelectCharts />
          </div>
        )}
      </div>
      {showContextDrawer && (
        <ContextDrawer>{() => <FormatAggregator />}</ContextDrawer>
      )}
    </div>
  );
};

export default EconomicsPlotChartsVisualytics;
