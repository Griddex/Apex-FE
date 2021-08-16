import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ChartSelector from "../../Visualytics/Common/ChartSelector";
import { TChartTypes } from "../../Visualytics/Components/Charts/ChartTypes";

const ForecastSelectChart = () => {
  const wc = "forecastChartWorkflows";

  const { selectedForecastChartOption } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const chartType = selectedForecastChartOption.value as TChartTypes;
  const forecastChartsObj = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );

  const { commonProperties } = forecastChartsObj["commonChart"];
  const { data, specificProperties } = forecastChartsObj[chartType];

  return (
    <ApexFlexContainer>
      <ChartSelector
        chartType={chartType}
        data={data}
        specificProperties={specificProperties}
        commonProperties={commonProperties}
      />
    </ApexFlexContainer>
  );
};

export default React.memo(ForecastSelectChart);
