import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../Components/Charts/ChartTypes";
import ChartSelector from "./ChartSelector";

const SelectChart = () => {
  const wc = "visualyticsChartsWorkflows";

  const { selectedVisualyticsOption } = useSelector(
    (state: RootState) => state.visualyticsReducer
  );

  const chartType = selectedVisualyticsOption.value as TChartTypes;
  const visualyticsChartsObj = useSelector(
    (state: RootState) => state.visualyticsReducer[wc]
  );
  const { data, otherProperties } = visualyticsChartsObj[chartType];

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

export default SelectChart;
