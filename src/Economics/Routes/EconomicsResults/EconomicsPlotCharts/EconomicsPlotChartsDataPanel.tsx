import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import omit from "lodash.omit";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { TUseState } from "../../../../Application/Types/ApplicationTypes";
import XYYZRChartCategories from "../../../../Visualytics/Components/ChartCategories/XYYZRChartCategories";
import CategoryPanelComponent from "../../../../Visualytics/Components/ChartCategoryPanel/ChartCategoryPanel";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import { initialEconomicsPlotData } from "../../../Data/EconomicsData";
import useDroppedIds from "../../../Hooks/UseDroppedIds";
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
import getDragItems from "../../../Utils/GetDragItems";
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import EconomicsPlotChartsTreeView from "./EconomicsPlotChartsTreeView";

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
const resultsAnalyisOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.resultsAnalyisOptions,
  (data) => data
);
const selectedEconomicsResultsIdSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsResultsId,
  (data) => data
);
const analysisOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.analysisOption,
  (data) => data
);

const EconomicsPlotChartsDataPanel = ({
  selectedZ,
  setSelectedZ,
  chartStory,
  variableZDataOptions,
  ZValuesTitle,
}: IEconomicsResultsVisualytics) => {
  const reducer = "economicsReducer";

  const dispatch = useDispatch();

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

  const showPlotChartsCategoryMembersObj = useSelector(
    showPlotChartsCategoryMembersObjSelector
  );
  const plotChartsCategoryDragItems = useSelector(
    plotChartsCategoryDragItemsSelector
  );
  const plotChartsCategoryHasDropped = useSelector(
    plotChartsCategoryHasDroppedSelector
  );
  const resultsAnalyisOptions = useSelector(resultsAnalyisOptionsSelector);
  const selectedEconomicsResultsId = useSelector(
    selectedEconomicsResultsIdSelector
  );
  const anOption = useSelector(analysisOptionSelector);

  const drgItems = getDragItems(plotChartsCategoryDragItems);
  const droppedIds = useDroppedIds({
    categoryDragItems: plotChartsCategoryDragItems,
    drgItems,
  });

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);
  const [analysisOption, setAnalysisOption] =
    React.useState<ISelectOption>(anOption);

  const chartType = selectedEconomicsPlotChartOption.value;

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
    option: OnChangeValue<IExtendedSelectOption, false>
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
      setAnalysisOption({ value: "Select...", label: "Select..." });
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
      setAnalysisOption(resultsAnalyisOptions[0]);
    }

    dispatch(resetPlotChartsWorkflowsAction());
  };

  const clearHeatMap = () =>
    dispatch(
      updateEconomicsParametersAction(
        omit(initialEconomicsPlotData, [
          "plotChartsResults",
          "plotChartsData",
          "plotChartsDataTrans",
        ])
      )
    );

  const ResultsSelect = () => {
    return (
      <ApexSelectRS<IExtendedSelectOption>
        valueOption={economicsResultOption}
        data={economicsResultsTitleOptions}
        handleSelect={handleSelectEconomicsResultsChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
        containerWidth={300}
        containerHeight={40}
      />
    );
  };

  const AnalysisResult = () => {
    return (
      <ApexSelectRS
        valueOption={analysisOption}
        data={resultsAnalyisOptions}
        handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
          const optionDefined = option as ISelectOption;

          setAnalysisOption(optionDefined);
          dispatch(
            updateEconomicsParameterAction("analysisOption", optionDefined)
          );
          clearHeatMap();
        }}
        menuPortalTarget={document.body}
        isSelectOptionType={true}
        containerHeight={40}
      />
    );
  };

  const categoryPanelWidth = 250;
  const chartTypeDefined = chartType as TChartTypes;
  const categoriesComponent = (
    <XYYZRChartCategories
      reducer={reducer}
      chartStory={chartStory}
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
          selectedZ={selectedZ}
          setSelectedZ={React.useCallback(
            setSelectedZ as TUseState<string>,
            []
          )}
          chartStory={chartStory}
          variableZDataOptions={variableZDataOptions}
          ZValuesTitle={ZValuesTitle}
        />
      }
      resultsTitle={selectedEconomicsResultsTitle}
    />
  );

  React.useEffect(() => {
    if (selectedEconomicsResultsId === "") {
      setAnalysisOption({
        value: "Select",
        label: "Select...",
      } as ISelectOption);
    } else {
      setAnalysisOption(resultsAnalyisOptions[0]);
    }
  }, [selectedEconomicsResultsId]);

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={React.useMemo(
        () => economicsResultOption,
        [economicsResultOption?.value]
      )}
      titleOptions={React.useMemo(
        () => economicsResultsTitleOptions,
        [JSON.stringify(economicsResultsTitleOptions)]
      )}
      handleSelectChange={React.useCallback(
        handleSelectEconomicsResultsChange,
        []
      )}
      hasSecondaryComponent={true}
      secondarySelectComponent={AnalysisResult}
      selectedTitle={selectedEconomicsResultsTitle}
      resultsSelect={ResultsSelect}
      treeViewComponent={
        economicsResultOption.title === "Select..."
          ? () => (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select result.."
              />
            )
          : () => <EconomicsPlotChartsTreeView droppedIds={droppedIds} />
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={React.useCallback(setExtrudeCategories, [])}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
    />
  );
};

export default React.memo(EconomicsPlotChartsDataPanel);
