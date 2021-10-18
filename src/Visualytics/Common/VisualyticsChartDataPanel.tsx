import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../Components/Charts/ChartTypes";
import {
  fetchVisualyticsTreeviewKeysRequestAction,
  removeVisualyticsChartCategoryAction,
  resetVisualyticsChartsWorkflowsAction,
  updateVisualyticsChartCategoryAction,
  updateVisualyticsDragItemsAction,
  updateVisualyticsHasDroppedAction,
  updateVisualyticsParameterAction,
  updateVisualyticsParametersAction,
} from "../Redux/Actions/VisualyticsActions";
import { IChartVisualytics } from "./VisualyticsLandingTypes";

const NoSelectionPlaceholder = React.lazy(
  () =>
    import("../../Application/Components/PlaceHolders/NoSelectionPlaceholder")
);
const XYYZRChartCategories = React.lazy(
  () => import("../Components/ChartCategories/XYYZRChartCategories")
);
const CategoryPanelComponent = React.lazy(
  () => import("../Components/ChartCategoryPanel/ChartCategoryPanel")
);
const ChartDataPanel = React.lazy(
  () => import("../Components/ChartDataPanel/ChartDataPanel")
);
const VisualyticsTreeView = React.lazy(() => import("./VisualyticsTreeView"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const visualyticsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer,
  (reducer) => reducer
);

const VisualyticsChartDataPanel = ({ setSelectedZ }: IChartVisualytics) => {
  const dispatch = useDispatch();

  const reducer = "visualyticsReducer";
  const wc = "storedDataWorkflows";

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const visualyticsDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.visualyticsReducer[wc]["visualyticsDeckStored"],
    (stored) => stored
  );

  const visualyticsDeckStored = useSelector(visualyticsDeckStoredSelector);

  const {
    selectedVisualyticsTitle,
    selectedVisualyticsDescription,
    selectedVisualyticsChartOption,
    visualyticsVariableZOptions,
    showVisualyticsCategoryMembersObj,
    visualyticsCategoryDragItems,
    visualyticsCategoryHasDropped,
  } = useSelector(visualyticsSelector);

  const chartType = selectedVisualyticsChartOption.value;

  const visualyticsRunTitleOptions = visualyticsDeckStored.map((row) => ({
    value: row.title,
    label: row.title,
    id: row.id,
    title: row.title,
    description: row.description,
  })) as IExtendedSelectOption[];

  visualyticsRunTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
    title: "Select...",
    description: "Select...",
  });

  const selectedVisualyticsTitleOption =
    selectedVisualyticsTitle !== ""
      ? {
          value: selectedVisualyticsTitle,
          label: selectedVisualyticsTitle,
          id: (visualyticsRunTitleOptions as IExtendedSelectOption[]).filter(
            (o) => o.label === selectedVisualyticsTitle
          )[0].id,
          title: selectedVisualyticsTitle,
          description: selectedVisualyticsDescription,
        }
      : visualyticsRunTitleOptions[0];

  const [visualyticsRunOption, setVisualyticsRunOption] =
    React.useState<IExtendedSelectOption>(
      selectedVisualyticsTitleOption as IExtendedSelectOption
    );

  const handleSelectVisualyticsResultsChange = (
    option: ValueType<IExtendedSelectOption, false>
  ) => {
    const optionDefined = option as IExtendedSelectOption;
    setVisualyticsRunOption(optionDefined);

    const { id, title, description } = optionDefined;

    if (title === "Select...") {
      dispatch(
        updateVisualyticsParametersAction({
          selectedVisualyticsId: "",
          selectedVisualyticsTitle: "",
          selectedVisualyticsDescription: "",
          isVisualyticsDeckSaved: false,
        })
      );
    } else {
      const idTitleDescIsSaved = {
        selectedVisualyticsId: id,
        selectedVisualyticsTitle: title,
        selectedVisualyticsDescription: description,
        isVisualyticsDeckSaved: true,
      };

      dispatch(
        fetchVisualyticsTreeviewKeysRequestAction(reducer, idTitleDescIsSaved)
      );
    }

    dispatch(resetVisualyticsChartsWorkflowsAction());
  };

  const categoryPanelWidth = 250;
  const chartTypeDefined = chartType as TChartTypes;

  const categoriesComponent = (
    <XYYZRChartCategories
      reducer={reducer}
      chartType={chartTypeDefined}
      xCategoryOptionTitle="visualyticsVariableXOptions"
      yCategoryOptionTitle="visualyticsVariableYOptions"
      ySecondaryCategoryOptionTitle="visualyticsSecondaryVariableYOptions"
      zCategoryOptionTitle="visualyticsVariableZOptions"
      rCategoryOptionTitle="visualyticsVariableROptions"
      disableX={false}
      disableY={false}
      disableSecondaryY={false}
      disableZ={false}
      disableR={false}
      updateAction={updateVisualyticsChartCategoryAction}
      removeAction={removeVisualyticsChartCategoryAction}
      showXCategoryMembersSwitch={false}
      showYCategoryMembersSwitch={false}
      showYSecondaryCategoryMembersSwitch={false}
      showZCategoryMembersSwitch={true}
      showRCategoryMembersSwitch={true}
      showCategoryMembersObj={showVisualyticsCategoryMembersObj}
      path="showVisualyticsCategoryMembersObj"
      updateParameterAction={updateVisualyticsParameterAction}
      updateDragItemsAction={updateVisualyticsDragItemsAction}
      updateHasDroppedAction={updateVisualyticsHasDroppedAction}
      categoryDragItemsTitle="visualyticsCategoryDragItems"
      categoryDragItems={visualyticsCategoryDragItems}
      categoryHasDroppedTitle="visualyticsCategoryHasDropped"
      categoryHasDropped={visualyticsCategoryHasDropped}
      categoryPanelWidth={categoryPanelWidth}
      categoryPanelComponent={
        <CategoryPanelComponent
          variableOptions={visualyticsVariableZOptions}
          setSelectedZ={setSelectedZ}
        />
      }
      resultsTitle={selectedVisualyticsTitle}
    />
  );

  return (
    <ChartDataPanel
      selectLabel={"Visualytics Results"}
      selectedOption={visualyticsRunOption}
      titleOptions={visualyticsRunTitleOptions}
      handleSelectChange={handleSelectVisualyticsResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedVisualyticsTitle}
      treeViewComponent={
        visualyticsRunOption.title === "Select..."
          ? () => (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select result.."
              />
            )
          : VisualyticsTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={setExtrudeCategories}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
    />
  );
};

export default VisualyticsChartDataPanel;
