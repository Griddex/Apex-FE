import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { ITreeViewProps } from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";

const ApexTreeView = React.lazy(
  () => import("../../../../Visualytics/Components/TreeView/ApexTreeView")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsPlotChartsTreeSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.economicsPlotChartsTree,
  (data) => data
);
const analysisOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.analysisOption,
  (data) => data
);

const EconomicsPlotChartsTreeView = ({
  height,
  droppedIds,
}: ITreeViewProps) => {
  console.log(
    "🚀 ~ file: EconomicsPlotChartsTreeView.tsx ~ line 26 ~ EconomicsPlotChartsTreeView ~ height",
    height
  );
  console.log("EconomicsPlotChartsTreeViewwwwwwwwwwwwwwwwwwwwwwwwwwww");

  const economicsPlotChartsTree = useSelector(economicsPlotChartsTreeSelector);
  const analysisOption = useSelector(analysisOptionSelector);

  const analysisName = analysisOption?.value as string;
  const rootTree = economicsPlotChartsTree[analysisName] as RenderTree;

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [selectedPathsUnfiltered, setSelectedPathsUnfiltered] = React.useState<
    string[]
  >([]);

  const idsStr = selectedIds.join();
  const namesStr = selectedNames.join();
  const pathsStr = selectedPathsUnfiltered.join();

  return (
    <ApexTreeView
      rootTree={React.useMemo(() => rootTree, [])}
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
      dragDropTypes={itemTypes.ECONOMICS_PLOTCHARTS}
      height={height as number}
      droppedIds={droppedIds}
    />
  );
};

export default React.memo(EconomicsPlotChartsTreeView);
