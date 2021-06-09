import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import BarChart from "../../../../Visualytics/Components/Charts/BarChart";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import LineChart from "../../../../Visualytics/Components/Charts/LineChart";
import StackedAreaChart from "../../../../Visualytics/Components/Charts/StackedAreaChart";
import { TChartTypeNames } from "../../../Data/EconomicsData";

const tempData = [
  { name: "Oil", value: 450 },
  { name: "Gas", value: 250 },
  { name: "Condensate", value: 90 },
];

const economicsPlotCharts = {
  stackedArea: <StackedAreaChart />,
  line: <LineChart />,
  doughnut: <DoughnutChart data={tempData} willUseThemeColor={true} />,
  bar: <BarChart />,
} as Record<TChartTypeNames, JSX.Element>;

const EconomicsPlotChartsSelectCharts = () => {
  const { selectedEconomicsPlotChartOption } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const chartValue = selectedEconomicsPlotChartOption.value as TChartTypeNames;

  return (
    <ApexFlexContainer>{economicsPlotCharts[chartValue]}</ApexFlexContainer>
  );
};

export default EconomicsPlotChartsSelectCharts;
