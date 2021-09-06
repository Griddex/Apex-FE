import get from "lodash.get";
import pick from "lodash.pick";
import objectScan from "object-scan";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../../Visualytics/Components/Charts/ChartTypes";
import ApexTreeView from "../../Visualytics/Components/TreeView/ApexTreeView";
import { RenderTree } from "../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import {
  resetChartDataAction,
  transformChartDataAction,
} from "../../Visualytics/Redux/Actions/VisualyticsActions";
import {
  getForecastResultsChartDataRequestAction,
  getForecastResultsQualityAssuranceRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { itemTypes } from "../Utils/DragAndDropItemTypes";
import { transformModulePaths } from "../Utils/TransformForecastForChart";

export default function ForecastTreeView() {
  const wc = "forecastChartsWorkflows";
  const ch = "stackedAreaChart";
  const dispatch = useDispatch();

  const { selectedForecastChartOption } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const chartType = selectedForecastChartOption.value as TChartTypes;

  const {
    forecastTree,
    selectedForecastChartVariable,
    selectedModuleIds: prevModuleIds,
    selectedForecastAggregationType,
    selectedForecastAggregationLevel,
    selectedView,
    xValueCategories,
  } = useSelector((state: RootState) => state.forecastReducer);

  const { chartData } = useSelector(
    (state: RootState) => state.forecastReducer[wc][ch]
  );

  const rootTree = {
    id: "6e611ee3-4133-496b-a7cc-43cea89686bc",
    name: "forecastCases",
    title: "Forecast Cases",
    children: forecastTree as RenderTree[],
  };

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedModuleNames, setSelectedModuleNames] = React.useState<
    string[]
  >([]);

  const [selectedModulePathsUnfiltered, setSelectedModulePathsUnfiltered] =
    React.useState<string[]>([]);

  const selectedModulePaths = selectedModulePathsUnfiltered.filter(
    (p) => p?.match(/@#\$%/g)?.length === 2
  );

  React.useEffect(() => {
    if (selectedIds.length > 0) {
      switch (selectedView) {
        case "Forecast Charts":
          dispatch(
            getForecastResultsChartDataRequestAction(
              selectedIds,
              selectedModuleNames,
              selectedModulePaths,
              selectedForecastChartVariable,
              selectedForecastAggregationType
            )
          );
          break;
        case "Forecast Quality Assurance":
          dispatch(
            getForecastResultsQualityAssuranceRequestAction(
              selectedForecastAggregationType,
              selectedForecastAggregationLevel,
              selectedModulePaths,
              selectedForecastChartVariable
            )
          );
          break;
      }
    }
  }, [selectedForecastChartVariable]);

  React.useEffect(() => {
    const selectedModIds = selectedModulePaths.map((path) => {
      const pathPath = objectScan([`[*].children[*].children[*].path`], {
        joined: true,
        filterFn: ({ value }: any) => value === path,
      })(forecastTree);

      const lastIndex = pathPath[0].lastIndexOf(".");
      const objectPath = pathPath[0].substring(0, lastIndex);
      const idPath = `${objectPath}.id`;

      const id = get(forecastTree, idPath);

      return id;
    });

    const selectedModuleNames = selectedModulePaths.map(
      (path) => path.split("@#$%")[2]
    );

    if (selectedModIds.length === 0) {
      dispatch(updateForecastResultsParameterAction("selectedModuleIds", []));
      dispatch(resetChartDataAction("forecastReducer", wc));
      // dispatch({
      //   ...transformChartDataAction("forecastReducer"),
      //   payload: {
      //     reducer: "forecastReducer",
      //     workflowCategory: wc,
      //     defaultChart: ch,
      //     chartType,
      //     chartData: [],
      //     xValueCategories: [],
      //     lineOrScatter: chartType === "lineChart" ? "line" : "scatter",
      //     isYear: true,
      //   },
      // });
    } else if (selectedModIds.length > 0) {
      if (selectedModIds.length > prevModuleIds.length) {
        switch (selectedView) {
          case "Forecast Charts":
            dispatch(
              getForecastResultsChartDataRequestAction(
                selectedIds,
                selectedModuleNames,
                selectedModulePaths,
                selectedForecastChartVariable,
                selectedForecastAggregationType
              )
            );
            break;
          case "Forecast Quality Assurance":
            dispatch(
              getForecastResultsQualityAssuranceRequestAction(
                selectedForecastAggregationType,
                selectedForecastAggregationLevel,
                selectedModulePaths,
                selectedForecastChartVariable
              )
            );
            break;
        }
      } else {
        const transformedModulePaths =
          transformModulePaths(selectedModulePaths);

        const filteredData = chartData.map((row: any) =>
          pick(row, transformedModulePaths)
        );

        //filteredData.map((_, i) => i + 2020)
        dispatch({
          ...transformChartDataAction("forecastReducer"),
          payload: {
            reducer: "forecastReducer",
            workflowCategory: wc,
            defaultChart: ch,
            chartType,
            chartData: filteredData,
            xValueCategories,
            lineOrScatter: chartType === "lineChart" ? "line" : "scatter",
            isYear: true,
          },
        });
      }

      dispatch(
        updateForecastResultsParameterAction(
          "selectedModuleIds",
          selectedModIds
        )
      );
    }
  }, [selectedIds]);

  return (
    <ApexTreeView
      rootTree={rootTree}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      selectedNames={selectedModuleNames}
      setSelectedNames={setSelectedModuleNames}
      selectedPathsUnfiltered={selectedModulePathsUnfiltered}
      setSelectedPathsUnfiltered={setSelectedModulePathsUnfiltered}
      dragDropTypes={itemTypes.FORECAST_PLOTCHARTS}
    />
  );
}
