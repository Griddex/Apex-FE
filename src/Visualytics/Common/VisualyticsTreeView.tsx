import get from "lodash.get";
import pick from "lodash.pick";
import objectScan from "object-scan";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../Components/Charts/ChartTypes";
import ApexTreeView from "../Components/TreeView/ApexTreeView";
import { RenderTree } from "../Components/TreeView/ApexTreeViewTypes";
import { itemTypesVisualytics } from "../Utils/DragAndDropItemTypes";

export default function VisualyticsTreeView() {
  const wc = "visualyticsChartsWorkflows";
  const ch = "stackedAreaChart";

  const dispatch = useDispatch();

  const { selectedVisualyticsOption } = useSelector(
    (state: RootState) => state.visualyticsReducer
  );

  const chartType = selectedVisualyticsOption.value as TChartTypes;

  const { visualyticsTree } = useSelector(
    (state: RootState) => state.visualyticsReducer
  );
  console.log(
    "Logged output --> ~ file: VisualyticsTreeView.tsx ~ line 25 ~ VisualyticsTreeView ~ visualyticsTree",
    visualyticsTree
  );

  const { chartData } = useSelector(
    (state: RootState) => state.visualyticsReducer[wc][ch]
  );

  const rootTree = {
    id: "6e611ee3-4133-496b-a7cc-43cea89686bc",
    name: "visualyticsCases",
    title: "Visualytics Data",
    children: visualyticsTree?.children as RenderTree[],
  };

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedColumnNames, setSelectedColumnNames] = React.useState<
    string[]
  >([]);

  const [selectedColumnPathsUnfiltered, setSelectedColumnPathsUnfiltered] =
    React.useState<string[]>([]);

  const selectedColumnPaths = selectedColumnPathsUnfiltered.filter(
    (p) => p?.match(/@#\$%/g)?.length === 2
  );

  return (
    <ApexTreeView
      rootTree={rootTree}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      selectedNames={selectedColumnNames}
      setSelectedNames={setSelectedColumnNames}
      selectedPathsUnfiltered={selectedColumnPathsUnfiltered}
      setSelectedPathsUnfiltered={setSelectedColumnPathsUnfiltered}
      dragDropTypes={itemTypesVisualytics.VISUALYTICS_PLOTCHARTS}
    />
  );
}
