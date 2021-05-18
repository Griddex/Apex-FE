import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ApexTreeView from "../../../../Visualytics/Components/TreeView/ApexTreeView";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { itemTypes } from "../../../Utils/DragAndDropItemTypes";

export default function EconomicsTemplateTreeView() {
  const dispatch = useDispatch();

  const { economicsTemplatesTree, selectedAnalysesNames } = useSelector(
    (state: RootState) => state.economicsReducer
  );
  const rootTree = economicsTemplatesTree as RenderTree;

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
      dragDropTypes={itemTypes.ECONOMICS_TEMPLATECHARTS}
    />
  );
}
