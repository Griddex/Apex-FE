import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import SelectChart from "../../../../Visualytics/Common/SelectChart";
import { getEconomicsPlotChartDataRequestAction } from "../../../Redux/Actions/EconomicsActions";

const visualyticsVariableXOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsVariableXOptions,
  (option) => option
);

const EconomicsPlotChartsSelectChart = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  const dispatch = useDispatch();

  const visualyticsVariableXOptions = useSelector(
    visualyticsVariableXOptionsSelector
  );

  return (
    <ApexFlexContainer flexDirection="column">
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedEconomicsPlotChartOption"
      />
      <ApexFlexContainer
        justifyContent="space-evenly"
        height={50}
        moreStyles={{ marginBottom: 4, width: 270 }}
      >
        <BaseButtons
          buttonTexts={["Reset", "Display"]}
          variants={["contained", "contained"]}
          colors={["secondary", "primary"]}
          startIcons={[
            <RotateLeftIcon key={1} />,
            <AirplayOutlinedIcon key={2} />,
          ]}
          disableds={[false, visualyticsVariableXOptions === null]}
          shouldExecute={[true, true]}
          shouldDispatch={[false, false]}
          finalActions={[
            () => {},
            () => dispatch(getEconomicsPlotChartDataRequestAction(reducer, wc)),
          ]}
        />
      </ApexFlexContainer>
    </ApexFlexContainer>
  );
};

export default EconomicsPlotChartsSelectChart;
