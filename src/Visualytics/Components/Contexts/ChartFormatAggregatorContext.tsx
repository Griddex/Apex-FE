import React, { Dispatch, SetStateAction } from "react";
import { allChartsDataAndSpecificProperties } from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";

interface IFormatAggregatorContext {
  chartProps: IChart;
  setChartProps: Dispatch<SetStateAction<IChart>>;
}

const ChartFormatAggregatorContext =
  React.createContext<IFormatAggregatorContext>({
    chartProps: allChartsDataAndSpecificProperties[
      "commonChartProps"
    ] as IChart,
    setChartProps: () => {},
  });

const ChartFormatAggregatorContextProvider: React.FC = ({ children }) => {
  const [chartProps, setChartProps] = React.useState({} as IChart);

  return (
    <ChartFormatAggregatorContext.Provider
      value={{ chartProps, setChartProps }}
    >
      {children}
    </ChartFormatAggregatorContext.Provider>
  );
};

export { ChartFormatAggregatorContext, ChartFormatAggregatorContextProvider };
