import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IVisualyticsSelectChart } from "../../../../Visualytics/Common/VisualyticsSelectChart";
import {
  getEconomicsPlotChartDataRequestAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import omit from "lodash.omit";
import { confirmationDialogParameters } from "../../../../Application/Components/DialogParameters/ConfirmationDialogParameters";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { initialEconomicsPlotData } from "../../../Data/EconomicsData";

const SelectChart = React.lazy(
  () => import("../../../../Visualytics/Common/SelectChart")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const plotChartsVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.plotChartsVariableXOptions,
  (option) => option
);

const EconomicsPlotChartsSelectChart = ({
  width,
  height,
  chartStory,
}: IVisualyticsSelectChart) => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  const dispatch = useDispatch();

  const plotChartsVariableXOptions = useSelector(
    plotChartsVariableXOptionsSelector
  );

  const indexByKey = Object.keys(plotChartsVariableXOptions)[0];
  const indexBy = plotChartsVariableXOptions[indexByKey]?.name;

  const clearHeatMap = () =>
    dispatch(
      updateEconomicsParametersAction(
        omit(initialEconomicsPlotData, [
          "plotChartsResults",
          "plotChartsData",
          "plotChartsDataTrans",
        ])
      )
    );

  const resetHeatMap = () => {
    const dialogParameters = confirmationDialogParameters(
      "Reset_Confirmation",
      "Reset Confirmation",
      "textDialog",
      `Do you want to reset this workflow?. 
  You will lose all data up to current step.`,
      true,
      false,
      () => dispatch(updateEconomicsParametersAction(initialEconomicsPlotData)),
      "Reset",
      "reset"
    );

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: width,
        height: height,
      }}
    >
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedEconomicsPlotChartOption"
        selectedSecondaryChartOptionTitle="selectedEconomicsPlotSecondaryChartOption"
        indexBy={indexBy}
        chartStory={chartStory}
      />
      <ApexFlexContainer
        justifyContent="space-evenly"
        height={50}
        moreStyles={{ marginBottom: 4, width: 270, alignSelf: "center" }}
      >
        <BaseButtons
          buttonTexts={["Reset", "Clear", "Display"]}
          variants={["contained", "contained", "contained"]}
          colors={["secondary", "inherit", "primary"]}
          startIcons={[
            <RotateLeftIcon key={1} />,
            <ClearOutlinedIcon key={2} />,
            <AirplayOutlinedIcon key={3} />,
          ]}
          disableds={[false, false, plotChartsVariableXOptions === null]}
          shouldExecute={[true, true, true]}
          shouldDispatch={[false, false, false]}
          finalActions={[
            () => resetHeatMap(),
            () => clearHeatMap(),
            () => dispatch(getEconomicsPlotChartDataRequestAction(reducer, wc)),
          ]}
        />
      </ApexFlexContainer>
    </div>
  );
};

export default EconomicsPlotChartsSelectChart;
