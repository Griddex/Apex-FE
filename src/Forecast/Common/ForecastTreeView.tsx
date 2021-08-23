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
  getForecastResultsChartDataRequestAction,
  transformForecastResultsChartDataAction,
  updateForecastResultsParameterAction,
  getForecastResultsQualityAssuranceRequestAction,
} from "../Redux/Actions/ForecastActions";
import { itemTypes } from "../Utils/DragAndDropItemTypes";
import { transformModulePaths } from "../Utils/TransformForecastForChart";

export default function ForecastTreeView() {
  const wc = "forecastChartWorkflows";
  const ap = "stackedAreaChart";
  const dispatch = useDispatch();

  /* const { forecastTree, selectedForecastChartVariable, selectedForecastAggregationType,
    selectedForecastAggregationLevel, selectedView } = useSelector(
    (state: RootState) => state.forecastReducer
  ); 

  const updatedForecastTree = [
    { ...forecastTree?.[0], id: "5749dc74-4b81-4652-8a46-a58b6bea0157" },
    { ...forecastTree?.[1], id: "ac430726-1b97-45f6-8b09-0c2ac347cc6e" },
    { ...forecastTree?.[2], id: "3d515091-8d7e-4650-8345-9fa953a23418" },
  ]; */

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
  } = useSelector((state: RootState) => state.forecastReducer);

  console.log("selectedForecastChartVariable: ", selectedForecastChartVariable);
  console.log(
    "selectedForecastAggregationType: ",
    selectedForecastAggregationType
  );
  console.log("selectedView: ", selectedView);

  const { data } = useSelector(
    (state: RootState) => state.forecastReducer[wc][ap]
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

      dispatch({
        ...transformForecastResultsChartDataAction(),
        payload: {
          chartType,
          forecastResults: [],
          xValueCategories: [],
          lineOrScatter: chartType === "lineChart" ? "line" : "scatter",
          isYear: true,
        },
      });
    } else if (selectedModIds.length > 0) {
      if (selectedModIds.length > prevModuleIds.length) {
        switch (selectedView) {
          case "Plot Charts":
            console.log("Plot Charts");
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
            console.log("Forecast Quality Assurance");
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

        const filteredData = data.map((row) =>
          pick(row, transformedModulePaths)
        );

        dispatch({
          ...transformForecastResultsChartDataAction(),
          payload: {
            chartType,
            forecastResults: filteredData,
            xValueCategories: filteredData.map((_, i) => i + 2020),
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
  }, [selectedIds, selectedForecastChartVariable]);

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
