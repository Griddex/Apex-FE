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

const EconomicsPlotChartsTreeView = React.lazy(
  () => import("./EconomicsPlotChartsTreeView")
);
const XYYZRChartCategories = React.lazy(
  () =>
    import(
      "../../../../Visualytics/Components/ChartCategories/XYYZRChartCategories"
    )
);
const CategoryPanelComponent = React.lazy(
  () =>
    import(
      "../../../../Visualytics/Components/ChartCategoryPanel/ChartCategoryPanel"
    )
);
const ChartDataPanel = React.lazy(
  () =>
    import("../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel")
);
const NoSelectionPlaceholder = React.lazy(
  () =>
    import(
      "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder"
    )
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const economicsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer,
  (reducer) => reducer
);

const EconomicsPlotChartsDataPanel = ({
  setSelectedZ,
}: IEconomicsResultsVisualytics) => {
  const wc = "storedDataWorkflows";

  const dispatch = useDispatch();

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const economicsWCSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wc],
    (wc) => wc
  );

  const { economicsResultsStored } = useSelector(economicsWCSelector);

  const {
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsDescription,
    selectedEconomicsPlotChartOption,
    economicsPlotChartsTree,
    plotChartsVariableZOptions,
    showPlotChartsCategoryMembersObj,
    plotChartsCategoryDragItems,
    plotChartsCategoryHasDropped,
  } = useSelector(economicsSelector);

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
      updateDragItemsAction={updateEconomicsPlotChartsDragItemsAction}
      updateHasDroppedAction={updateEconomicsPlotChartsHasDroppedAction}
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
          ? () => (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select result.."
              />
            )
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
