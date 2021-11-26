import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { ITreeViewProps } from "../Components/ChartDataPanel/ChartDataPanel";
import { RenderTree } from "../Components/TreeView/ApexTreeViewTypes";
import { itemTypesVisualytics } from "../Utils/DragAndDropItemTypes";

const ApexTreeView = React.lazy(
  () => import("../Components/TreeView/ApexTreeView")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const visualyticsTreeSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsTree,
  (tree) => tree
);

const VisualyticsTreeView = ({ height }: ITreeViewProps) => {
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
      selectedIds={React.useMemo(
        () => selectedIds,
        [JSON.stringify(selectedIds)]
      )}
      setSelectedIds={React.useCallback(setSelectedIds, [])}
      selectedNames={React.useMemo(
        () => selectedColumnNames,
        [JSON.stringify(selectedColumnNames)]
      )}
      setSelectedNames={React.useCallback(setSelectedColumnNames, [])}
      selectedPathsUnfiltered={React.useMemo(
        () => selectedColumnPathsUnfiltered,
        [JSON.stringify(selectedColumnPathsUnfiltered)]
      )}
      setSelectedPathsUnfiltered={React.useCallback(
        setSelectedColumnPathsUnfiltered,
        []
      )}
      dragDropTypes={itemTypesVisualytics.VISUALYTICS_PLOTCHARTS}
      height={height as number}
    />
  );
};

export default React.memo(VisualyticsTreeView);
