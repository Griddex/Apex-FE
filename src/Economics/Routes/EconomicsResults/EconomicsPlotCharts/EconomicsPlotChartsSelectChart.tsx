import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ChartSelector from "../../../../Visualytics/Common/ChartSelector";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";

const EconomicsPlotChartsSelectChart = () => {
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  const { selectedEconomicsPlotChartOption } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const chartType = selectedEconomicsPlotChartOption.value as TChartTypes;
  const economicsChartsObj = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const { data, otherProperties } = economicsChartsObj[wp][chartType];

  return (
    <ApexFlexContainer>
      <ChartSelector
        chartType={chartType}
        data={data}
        otherProperties={otherProperties}
      />
    </ApexFlexContainer>
  );
};

export default EconomicsPlotChartsSelectChart;
