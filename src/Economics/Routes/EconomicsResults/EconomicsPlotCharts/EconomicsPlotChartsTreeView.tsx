import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { ITreeViewProps } from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const ApexTreeView = React.lazy(
  () => import("../../../../Visualytics/Components/TreeView/ApexTreeView")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

export default function EconomicsPlotChartsTreeView({
  height,
}: ITreeViewProps) {
  const dispatch = useDispatch();

  const { economicsPlotChartsTree, selectedAnalysesNames } =
    useSelector(economicsSelector);
  const rootTree = economicsPlotChartsTree as RenderTree;

  //TODO: Ability to handle multiple analyses
  const selectedAnalysisName = selectedAnalysesNames[0];

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [selectedPathsUnfiltered, setSelectedPathsUnfiltered] = React.useState<
    string[]
  >([]);

  React.useEffect(() => {
    const selectedPaths = selectedPathsUnfiltered.filter(
      (p) => p?.match(/@#\$%/g)?.length === 2
    );

    // if (selectedIds.length > 0) {
    //   dispatch(
    //     getForecastResultsChartDataRequestAction(
    //       selectedIds,
    //       selectedNames,
    //       selectedPaths,
    //       selectedAnalysisName
    //     )
    //   );
    // }
  }, [selectedIds, selectedAnalysisName]);

  return (
    <ApexTreeView
      rootTree={rootTree}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      selectedNames={selectedNames}
      setSelectedNames={setSelectedNames}
      selectedPathsUnfiltered={selectedPathsUnfiltered}
      setSelectedPathsUnfiltered={setSelectedPathsUnfiltered}
      dragDropTypes={itemTypes.ECONOMICS_PLOTCHARTS}
      height={height}
    />
  );
}
