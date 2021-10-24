import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IExtendedSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  removeEconomicsChartCategoryAction,
  resetPlotChartsWorkflowsAction,
  updateEconomicsChartCategoryAction,
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
  updateEconomicsPlotChartsDragItemsAction,
  updateEconomicsPlotChartsHasDroppedAction,
} from "../../../Redux/Actions/EconomicsActions";
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import EconomicsPlotChartsTreeView from "./EconomicsPlotChartsTreeView";
import XYYZRChartCategories from "../../../../Visualytics/Components/ChartCategories/XYYZRChartCategories";
import CategoryPanelComponent from "../../../../Visualytics/Components/ChartCategoryPanel/ChartCategoryPanel";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const wc = "storedDataWorkflows";

const economicsResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc]["economicsResultsStored"],
  (data) => data
);
const selectedEconomicsResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsResultsTitle,
  (data) => data
);
const selectedEconomicsResultsDescriptionSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.selectedEconomicsResultsDescription,
  (data) => data
);
const selectedEconomicsPlotChartOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsPlotChartOption,
  (data) => data
);
const economicsPlotChartsTreeSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.economicsPlotChartsTree,
  (data) => data
);
const plotChartsVariableZOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.plotChartsVariableZOptions,
  (data) => data
);
const showPlotChartsCategoryMembersObjSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.showPlotChartsCategoryMembersObj,
  (data) => data
);
const plotChartsCategoryDragItemsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.plotChartsCategoryDragItems,
  (data) => data
);
const plotChartsCategoryHasDroppedSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.plotChartsCategoryHasDropped,
  (data) => data
);

const EconomicsPlotChartsDataPanel = ({
  setSelectedZ,
}: IEconomicsResultsVisualytics) => {
  const dispatch = useDispatch();

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const economicsResultsStored = useSelector(economicsResultsStoredSelector);
  const selectedEconomicsResultsTitle = useSelector(
    selectedEconomicsResultsTitleSelector
  );
  const selectedEconomicsResultsDescription = useSelector(
    selectedEconomicsResultsDescriptionSelector
  );
  const selectedEconomicsPlotChartOption = useSelector(
    selectedEconomicsPlotChartOptionSelector
  );
  const economicsPlotChartsTree = useSelector(economicsPlotChartsTreeSelector);
  const plotChartsVariableZOptions = useSelector(
    plotChartsVariableZOptionsSelector
  );
  const showPlotChartsCategoryMembersObj = useSelector(
    showPlotChartsCategoryMembersObjSelector
  );
  const plotChartsCategoryDragItems = useSelector(
    plotChartsCategoryDragItemsSelector
  );
  const plotChartsCategoryHasDropped = useSelector(
    plotChartsCategoryHasDroppedSelector
  );

  const chartType = selectedEconomicsPlotChartOption.value;
  console.log(
    "🚀 ~ file: EconomicsPlotChartsDataPanel.tsx ~ line 100 ~ selectedEconomicsPlotChartOption",
    selectedEconomicsPlotChartOption
  );

  const economicsResultsTitleOptions = economicsResultsStored.map(
    (row: any) => ({
      value: row.title,
      label: row.title,
      id: row.id,
      title: row.title,
      description: row.description,
    })
  ) as IExtendedSelectOption[];

  economicsResultsTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
    title: "Select...",
    description: "Select...",
  });

  const selectedEconomicsResultsTitleOption =
    selectedEconomicsResultsTitle !== ""
      ? {
          value: selectedEconomicsResultsTitle,
          label: selectedEconomicsResultsTitle,
          id: (economicsResultsTitleOptions as IExtendedSelectOption[]).filter(
            (o) => o.label === selectedEconomicsResultsTitle
          )[0].id,
          title: selectedEconomicsResultsTitle,
          description: selectedEconomicsResultsDescription,
        }
      : economicsResultsTitleOptions[0];

  const [economicsResultOption, setEconomicsResultOption] =
    React.useState<IExtendedSelectOption>(
      selectedEconomicsResultsTitleOption as IExtendedSelectOption
    );

  const handleSelectEconomicsResultsChange = (
    option: ValueType<IExtendedSelectOption, false>
  ) => {
    const optionDefined = option as IExtendedSelectOption;
    setEconomicsResultOption(optionDefined);

    const { id, title, description } = optionDefined;

    if (title === "Select...") {
      dispatch(
        updateEconomicsParametersAction({
          selectedEconomicsResultsId: "",
          selectedEconomicsResultsTitle: "",
          selectedEconomicsResultsDescription: "",
          isEconomicsResultsSaved: false,
        })
      );
    } else {
      const idTitleDescIsSaved = {
        selectedEconomicsResultsId: id,
        selectedEconomicsResultsTitle: title,
        selectedEconomicsResultsDescription: description,
        isEconomicsResultsSaved: true,
      };

      dispatch(
        fetchEconomicsTreeviewKeysRequestAction(
          true,
          "plotChartsTree",
          idTitleDescIsSaved
        )
      );
    }

    dispatch(resetPlotChartsWorkflowsAction());
  };

  const categoryPanelWidth = 250;
  const chartTypeDefined = chartType as TChartTypes;
  const categoriesComponent = (
    <XYYZRChartCategories
      chartType={chartTypeDefined}
      xCategoryOptionTitle="plotChartsVariableXOptions"
      yCategoryOptionTitle="plotChartsVariableYOptions"
      ySecondaryCategoryOptionTitle="plotChartsSecondaryVariableYOptions"
      zCategoryOptionTitle="plotChartsVariableZOptions"
      rCategoryOptionTitle="plotChartsVariableROptions"
      disableX={false}
      disableY={false}
      disableSecondaryY={false}
      disableZ={false}
      disableR={false}
      updateAction={React.useCallback(updateEconomicsChartCategoryAction, [])}
      removeAction={React.useCallback(removeEconomicsChartCategoryAction, [])}
      showXCategoryMembersSwitch={false}
      showYCategoryMembersSwitch={false}
      showYSecondaryCategoryMembersSwitch={false}
      showZCategoryMembersSwitch={true}
      showRCategoryMembersSwitch={true}
      showCategoryMembersObj={React.useMemo(
        () => showPlotChartsCategoryMembersObj,
        [JSON.stringify(showPlotChartsCategoryMembersObj)]
      )}
      path="showPlotChartsCategoryMembersObj"
      updateParameterAction={React.useCallback(
        updateEconomicsParameterAction,
        []
      )}
      categoryDragItemsTitle="plotChartsCategoryDragItems"
      categoryDragItems={React.useMemo(
        () => plotChartsCategoryDragItems,
        [JSON.stringify(plotChartsCategoryDragItems)]
      )}
      categoryHasDroppedTitle="plotChartsCategoryHasDropped"
      categoryHasDropped={React.useMemo(
        () => plotChartsCategoryHasDropped,
        [JSON.stringify(plotChartsCategoryHasDropped)]
      )}
      updateDragItemsAction={React.useCallback(
        updateEconomicsPlotChartsDragItemsAction,
        []
      )}
      updateHasDroppedAction={React.useCallback(
        updateEconomicsPlotChartsHasDroppedAction,
        []
      )}
      categoryPanelWidth={categoryPanelWidth}
      categoryPanelComponent={
        <CategoryPanelComponent
          variableOptions={React.useMemo(
            () => plotChartsVariableZOptions,
            [JSON.stringify(plotChartsVariableZOptions)]
          )}
          setSelectedZ={React.useCallback(setSelectedZ, [])}
        />
      }
      resultsTitle={selectedEconomicsResultsTitle}
    />
  );

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={React.useMemo(
        () => economicsResultOption,
        [JSON.stringify(economicsResultOption)]
      )}
      titleOptions={React.useMemo(
        () => economicsResultsTitleOptions,
        [JSON.stringify(economicsResultsTitleOptions)]
      )}
      handleSelectChange={React.useCallback(
        handleSelectEconomicsResultsChange,
        []
      )}
      hasSecondaryComponent={false}
      selectedTitle={selectedEconomicsResultsTitle}
      treeViewComponent={
        economicsResultOption.title === "Select..."
          ? () => (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select result.."
              />
            )
          : EconomicsPlotChartsTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={React.useCallback(setExtrudeCategories, [])}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
    />
  );
};

export default React.memo(EconomicsPlotChartsDataPanel);
