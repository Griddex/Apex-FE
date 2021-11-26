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

const EconomicsPlotChartsTreeView = ({ height }: ITreeViewProps) => {
  console.log("EconomicsPlotChartsTreeViewwwwwwwwwwwwwwwwwwwwwwwwwwww");
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
