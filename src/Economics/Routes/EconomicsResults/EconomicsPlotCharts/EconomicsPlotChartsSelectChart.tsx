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
import { getEconomicsPlotChartDataRequestAction } from "../../../Redux/Actions/EconomicsActions";

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
          buttonTexts={["Reset", "Display"]}
          variants={["contained", "contained"]}
          colors={["secondary", "primary"]}
          startIcons={[
            <RotateLeftIcon key={1} />,
            <AirplayOutlinedIcon key={2} />,
          ]}
          disableds={[false, plotChartsVariableXOptions === null]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {},
            () => dispatch(getEconomicsPlotChartDataRequestAction(reducer, wc)),
          ]}
        />
      </ApexFlexContainer>
    </div>
  );
};

export default EconomicsPlotChartsSelectChart;
