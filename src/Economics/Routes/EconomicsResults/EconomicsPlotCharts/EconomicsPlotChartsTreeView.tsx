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

const EconomicsPlotChartsTreeView = ({ height }: ITreeViewProps) => {
  console.log("EconomicsPlotChartsTreeViewwwwwwwwwwwwwwwwwwwwwwwwwwww");

  const economicsPlotChartsTree = useSelector(economicsPlotChartsTreeSelector);
  console.log(
    "🚀 ~ file: EconomicsPlotChartsTreeView.tsx ~ line 29 ~ EconomicsPlotChartsTreeView ~ economicsPlotChartsTree",
    economicsPlotChartsTree
  );
  const analysisOption = useSelector(
    (state: RootState) => state.economicsReducer.analysisOption
  );
  const analysisName = analysisOption?.value as string;
  console.log(
    "🚀 ~ file: EconomicsPlotChartsTreeView.tsx ~ line 32 ~ EconomicsPlotChartsTreeView ~ analysisName",
    analysisName
  );

  const rootTree = economicsPlotChartsTree[analysisName] as RenderTree;
  console.log(
    "🚀 ~ file: EconomicsPlotChartsTreeView.tsx ~ line 34 ~ EconomicsPlotChartsTreeView ~ rootTree",
    rootTree
  );

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
      dragDropTypes={itemTypes.ECONOMICS_PLOTCHARTS}
      height={height as number}
    />
  );
};

export default React.memo(EconomicsPlotChartsTreeView);
