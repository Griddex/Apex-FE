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

const economicsTemplatesTreeSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.economicsTemplatesTree,
  (data) => data
);
const analysisOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.analysisOption,
  (data) => data
);

const EconomicsTemplateTreeView = ({ height }: ITreeViewProps) => {
  const economicsTemplatesTree = useSelector(economicsTemplatesTreeSelector);
  const analysisOption = useSelector(analysisOptionSelector);
  const analysisName = analysisOption?.value as string;

  const rootTree = economicsTemplatesTree[analysisName] as RenderTree;

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
      dragDropTypes={itemTypes.ECONOMICS_TEMPLATECHARTS}
      height={height as number}
    />
  );
};

export default React.memo(EconomicsTemplateTreeView);
