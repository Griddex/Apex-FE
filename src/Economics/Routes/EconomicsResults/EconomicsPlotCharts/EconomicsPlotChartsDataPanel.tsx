import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { IExtendedSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import XYYZRChartCategories from "../../../../Visualytics/Components/ChartCategories/XYYZRChartCategories";
import CategoryPanelComponent from "../../../../Visualytics/Components/ChartCategoryPanel/ChartCategoryPanel";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  removeEconomicsChartCategoryAction,
  updateEconomicsChartCategoryAction,
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import EconomicsPlotChartsTreeView from "./EconomicsPlotChartsTreeView";

const EconomicsPlotChartsDataPanel = ({
  setSelectedZ,
}: IEconomicsResultsVisualytics) => {
  const wc = "storedDataWorkflows";

  const dispatch = useDispatch();

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const { economicsResultsStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );

  const {
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsDescription,
    selectedEconomicsPlotChartOption,
    economicsPlotChartsTree,
    plotChartsVariableZOptions,
    showPlotChartsCategoryMembersObj,
    plotChartsCategoryDragItems,
    plotChartsCategoryHasDropped,
  } = useSelector((state: RootState) => {
    const {
      selectedEconomicsResultsTitle,
      selectedEconomicsResultsDescription,
      selectedEconomicsPlotChartOption,
      economicsPlotChartsTree,
      plotChartsVariableZOptions,
      showPlotChartsCategoryMembersObj,
      heatMapTreeByScenario,
      plotChartsCategoryDragItems,
      plotChartsCategoryHasDropped,
    } = state.economicsReducer;

    return {
      selectedEconomicsResultsTitle,
      selectedEconomicsResultsDescription,
      selectedEconomicsPlotChartOption,
      economicsPlotChartsTree,
      plotChartsVariableZOptions,
      showPlotChartsCategoryMembersObj,
      heatMapTreeByScenario,
      plotChartsCategoryDragItems,
      plotChartsCategoryHasDropped,
    };
  });

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
      updateAction={updateEconomicsChartCategoryAction}
      removeAction={removeEconomicsChartCategoryAction}
      showXCategoryMembersSwitch={false}
      showYCategoryMembersSwitch={false}
      showYSecondaryCategoryMembersSwitch={false}
      showZCategoryMembersSwitch={true}
      showRCategoryMembersSwitch={true}
      showCategoryMembersObj={showPlotChartsCategoryMembersObj}
      path="showPlotChartsCategoryMembersObj"
      updateParameterAction={updateEconomicsParameterAction}
      categoryDragItemsTitle="plotChartsCategoryDragItems"
      categoryDragItems={plotChartsCategoryDragItems}
      categoryHasDroppedTitle="plotChartsCategoryHasDropped"
      categoryHasDropped={plotChartsCategoryHasDropped}
      categoryPanelWidth={categoryPanelWidth}
      categoryPanelComponent={
        <CategoryPanelComponent
          variableOptions={plotChartsVariableZOptions}
          setSelectedZ={setSelectedZ}
        />
      }
      resultsTitle={selectedEconomicsResultsTitle}
    />
  );

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={economicsResultOption}
      titleOptions={economicsResultsTitleOptions}
      handleSelectChange={handleSelectEconomicsResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedEconomicsResultsTitle}
      treeViewComponent={
        economicsResultOption.title === "Select..."
          ? NoSelectionPlaceholder
          : EconomicsPlotChartsTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={setExtrudeCategories}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
    />
  );
};

export default EconomicsPlotChartsDataPanel;
