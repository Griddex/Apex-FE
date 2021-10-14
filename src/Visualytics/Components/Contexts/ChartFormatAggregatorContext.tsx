import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
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

const visualyticsChartsWorkflowsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsChartsWorkflows,
  (workflow) => workflow
);

const forecastChartsWorkflowsSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.forecastChartsWorkflows,
  (workflow) => workflow
);

const economicsChartsWorkflowsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.economicsChartsWorkflows,
  (workflow) => workflow
);

const ChartFormatAggregatorContextProvider = ({
  children,
  reducer,
}: IChartFormatAggregatorContextProvider) => {
  const { commonChartProps: visualyticsCommonChartProps } = useSelector(
    visualyticsChartsWorkflowsSelector
  );

  const { commonChartProps: forecastCommonChartProps } = useSelector(
    forecastChartsWorkflowsSelector
  );

  const { commonChartProps: economicsCommonChartProps } = useSelector(
    economicsChartsWorkflowsSelector
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
