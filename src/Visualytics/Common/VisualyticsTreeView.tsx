import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ITreeViewProps } from "../Components/ChartDataPanel/ChartDataPanel";
import ApexTreeView from "../Components/TreeView/ApexTreeView";
import { RenderTree } from "../Components/TreeView/ApexTreeViewTypes";
import { itemTypesVisualytics } from "../Utils/DragAndDropItemTypes";

const visualyticsTreeSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsTree,
  (tree) => tree
);

export default function VisualyticsTreeView({ height }: ITreeViewProps) {
  const visualyticsTree = useSelector(visualyticsTreeSelector);

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
      height={height}
    />
  );
}
