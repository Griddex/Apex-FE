import React from "react";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { ITreeViewProps } from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";

const ApexTreeView = React.lazy(
  () => import("../../../../Visualytics/Components/TreeView/ApexTreeView")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const heatMapTreeByScenarioSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapTreeByScenario,
  (reducer) => reducer
);

const SensitivitiesHeatMapTreeView = ({ height }: ITreeViewProps) => {
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
      selectedIds={React.useMemo(
        () => selectedIds,
        [JSON.stringify(selectedIds)]
      )}
      setSelectedIds={React.useCallback(setSelectedIds, [])}
      selectedNames={React.useMemo(
        () => selectedNames,
        [JSON.stringify(selectedNames)]
      )}
      setSelectedNames={React.useCallback(setSelectedNames, [])}
      selectedPathsUnfiltered={React.useMemo(
        () => selectedPathsUnfiltered,
        [JSON.stringify(selectedPathsUnfiltered)]
      )}
      setSelectedPathsUnfiltered={React.useCallback(
        setSelectedPathsUnfiltered,
        []
      )}
      dragDropTypes={itemTypes.ECONOMICS_HEATMAP}
      height={height}
    />
  );
};

export default React.memo(SensitivitiesHeatMapTreeView);
