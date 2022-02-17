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
const analysisOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.analysisOption,
  (reducer) => reducer
);

const SensitivitiesHeatMapTreeView = ({
  height,
  droppedIds,
}: ITreeViewProps) => {
  const heatMapTreeByScenario = useSelector(heatMapTreeByScenarioSelector);
  const analysisOption = useSelector(analysisOptionSelector);
  const analysisName = analysisOption?.value as string;

  const rootTree = heatMapTreeByScenario[analysisName] as RenderTree;

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [selectedPathsUnfiltered, setSelectedPathsUnfiltered] = React.useState<
    string[]
  >([]);

  const idsStr = selectedIds.join();
  const namesStr = selectedNames.join();
  const pathsStr = selectedPathsUnfiltered.join();
  const drpdidsStr = droppedIds?.join();

  return (
    <ApexTreeView
      rootTree={rootTree}
      selectedIds={React.useMemo(() => selectedIds, [idsStr])}
      setSelectedIds={React.useCallback(setSelectedIds, [])}
      selectedNames={React.useMemo(() => selectedNames, [namesStr])}
      setSelectedNames={React.useCallback(setSelectedNames, [])}
      selectedPathsUnfiltered={React.useMemo(
        () => selectedPathsUnfiltered,
        [pathsStr]
      )}
      setSelectedPathsUnfiltered={React.useCallback(
        setSelectedPathsUnfiltered,
        []
      )}
      dragDropTypes={itemTypes.ECONOMICS_HEATMAP}
      height={height as number}
      droppedIds={React.useMemo(() => droppedIds, [drpdidsStr])}
    />
  );
};

export default React.memo(SensitivitiesHeatMapTreeView);
