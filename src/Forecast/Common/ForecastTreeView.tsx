import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ApexTreeView from "../../Visualytics/Components/TreeView/ApexTreeView";
import { RenderTree } from "../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { getForecastResultsChartDataRequestAction } from "../Redux/Actions/ForecastActions";
import { itemTypes } from "../Utils/DragAndDropItemTypes";

export default function ForecastTreeView() {
  const dispatch = useDispatch();

  const { forecastTree, selectedForecastChartVariable } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  console.log("forecastTree: ", forecastTree);
  console.log("selectedForecastChartVariable: ", selectedForecastChartVariable);

  const updatedForecastTree = [
    { ...forecastTree?.[0], id: "5749dc74-4b81-4652-8a46-a58b6bea0157" },
    { ...forecastTree?.[1], id: "ac430726-1b97-45f6-8b09-0c2ac347cc6e" },
    { ...forecastTree?.[2], id: "3d515091-8d7e-4650-8345-9fa953a23418" },
  ];

  const rootTree = {
    id: "6e611ee3-4133-496b-a7cc-43cea89686bc",
    name: "forecastCases",
    title: "Forecast Cases",
    children: [...(updatedForecastTree as RenderTree[])],
  };

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedModuleNames, setSelectedModuleNames] = React.useState<
    string[]
  >([]);

  const [selectedModulePathsUnfiltered, setSelectedModulePathsUnfiltered] =
    React.useState<string[]>([]);

  React.useEffect(() => {
    const selectedModulePaths = selectedModulePathsUnfiltered.filter(
      (p) => p?.match(/@#\$%/g)?.length === 2
    );

    const selectedModuleNames = selectedModulePaths.map(
      (path) => path.split("@#$%")[2]
    );

    if (selectedIds.length > 0) {
      dispatch(
        getForecastResultsChartDataRequestAction(
          selectedIds,
          selectedModuleNames,
          selectedModulePaths,
          selectedForecastChartVariable
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
