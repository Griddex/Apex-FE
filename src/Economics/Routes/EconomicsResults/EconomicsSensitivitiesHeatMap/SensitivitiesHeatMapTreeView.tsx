import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { ITreeViewProps } from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import ApexTreeView from "../../../../Visualytics/Components/TreeView/ApexTreeView";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";

const heatMapTreeByScenarioSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapTreeByScenario,
  (reducer) => reducer
);

export default function SensitivitiesHeatMapTreeView({
  height,
}: ITreeViewProps) {
  const heatMapTreeByScenario = useSelector(heatMapTreeByScenarioSelector);

  const rootTree = heatMapTreeByScenario as RenderTree;

  //TODO: Ability to handle multiple analyses
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [selectedPathsUnfiltered, setSelectedPathsUnfiltered] = React.useState<
    string[]
  >([]);

  return (
    <ApexTreeView
      rootTree={rootTree}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      selectedNames={selectedNames}
      setSelectedNames={setSelectedNames}
      selectedPathsUnfiltered={selectedPathsUnfiltered}
      setSelectedPathsUnfiltered={setSelectedPathsUnfiltered}
      dragDropTypes={itemTypes.ECONOMICS_HEATMAP}
      height={height}
    />
  );
}
