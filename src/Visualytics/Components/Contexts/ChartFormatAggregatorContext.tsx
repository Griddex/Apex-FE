import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import {
  ReducersType,
  TAllWorkflowCategories,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { allChartsDataAndSpecificProperties } from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";

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

interface IChartFormatAggregatorContextProvider {
  children: React.ReactNode;
  reducer: ReducersType;
}

const ChartFormatAggregatorContextProvider = ({
  children,
  reducer,
}: IChartFormatAggregatorContextProvider) => {
  const { commonChartProps: visualyticsCommonChartProps } = useSelector(
    (state: RootState) => state.visualyticsReducer["visualyticsChartsWorkflows"]
  );
  const { commonChartProps: forecastCommonChartProps } = useSelector(
    (state: RootState) => state.forecastReducer["forecastChartsWorkflows"]
  );

  const { commonChartProps: economicsCommonChartProps } = useSelector(
    (state: RootState) => state.economicsReducer["economicsChartsWorkflows"]
  );

  const commonChartPropsMap = {
    visualyticsReducer: visualyticsCommonChartProps,
    forecastReducer: forecastCommonChartProps,
    economicsReducer: economicsCommonChartProps,
  } as Record<ReducersType, IChart>;

  const [chartProps, setChartProps] = React.useState(
    commonChartPropsMap[reducer] as IChart
  );

  return (
    <ChartFormatAggregatorContext.Provider
      value={{ chartProps, setChartProps }}
    >
      {children}
    </ChartFormatAggregatorContext.Provider>
  );
};

export { ChartFormatAggregatorContext, ChartFormatAggregatorContextProvider };
