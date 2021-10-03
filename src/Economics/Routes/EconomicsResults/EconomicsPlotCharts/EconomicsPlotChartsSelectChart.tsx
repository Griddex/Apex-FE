import React from "react";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import SelectChart from "../../../../Visualytics/Common/SelectChart";
import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import BaseButtons from "../../../../Application/Components/BaseButtons/BaseButtons";
import { getEconomicsPlotChartDataRequestAction } from "../../../Redux/Actions/EconomicsActions";

const EconomicsPlotChartsSelectChart = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  const dispatch = useDispatch();

  const { visualyticsVariableXOptions } = useSelector(
    (state: RootState) => state.visualyticsReducer
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
