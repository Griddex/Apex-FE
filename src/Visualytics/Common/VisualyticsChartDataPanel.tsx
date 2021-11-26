import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
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

const selectedVisualyticsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.selectedVisualyticsTitle,
  (data) => data
);

const selectedVisualyticsDescriptionSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.selectedVisualyticsDescription,
  (data) => data
);

const selectedVisualyticsChartOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.selectedVisualyticsChartOption,
  (data) => data
);

const visualyticsVariableZOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsVariableZOptions,
  (data) => data
);

const showVisualyticsCategoryMembersObjSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.visualyticsReducer.showVisualyticsCategoryMembersObj,
  (data) => data
);

const visualyticsCategoryDragItemsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsCategoryDragItems,
  (data) => data
);

const visualyticsCategoryHasDroppedSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.visualyticsCategoryHasDropped,
  (data) => data
);

const reducer = "visualyticsReducer";
const wc = "storedDataWorkflows";
const visualyticsDeckStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer[wc]["visualyticsDeckStored"],
  (stored) => stored
);

const VisualyticsChartDataPanel = ({
  selectedZ,
  setSelectedZ,
  variableZDataOptions,
  ZValuesTitle,
}: IChartVisualytics) => {
  const dispatch = useDispatch();

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const visualyticsDeckStored = useSelector(visualyticsDeckStoredSelector);

  const selectedVisualyticsTitle = useSelector(
    selectedVisualyticsTitleSelector
  );
  const selectedVisualyticsDescription = useSelector(
    selectedVisualyticsDescriptionSelector
  );
  const selectedVisualyticsChartOption = useSelector(
    selectedVisualyticsChartOptionSelector
  );
  const visualyticsVariableZOptions = useSelector(
    visualyticsVariableZOptionsSelector
  );
  const showVisualyticsCategoryMembersObj = useSelector(
    showVisualyticsCategoryMembersObjSelector
  );
  const visualyticsCategoryDragItems = useSelector(
    visualyticsCategoryDragItemsSelector
  );
  const visualyticsCategoryHasDropped = useSelector(
    visualyticsCategoryHasDroppedSelector
  );

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
    option: OnChangeValue<IExtendedSelectOption, false>
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
      updateAction={React.useCallback(updateVisualyticsChartCategoryAction, [])}
      removeAction={React.useCallback(removeVisualyticsChartCategoryAction, [])}
      showXCategoryMembersSwitch={false}
      showYCategoryMembersSwitch={false}
      showYSecondaryCategoryMembersSwitch={false}
      showZCategoryMembersSwitch={true}
      showRCategoryMembersSwitch={true}
      showCategoryMembersObj={React.useMemo(
        () => showVisualyticsCategoryMembersObj,
        [JSON.stringify(showVisualyticsCategoryMembersObj)]
      )}
      path="showVisualyticsCategoryMembersObj"
      updateParameterAction={React.useCallback(
        updateVisualyticsParameterAction,
        []
      )}
      updateDragItemsAction={React.useCallback(
        updateVisualyticsDragItemsAction,
        []
      )}
      updateHasDroppedAction={React.useCallback(
        updateVisualyticsHasDroppedAction,
        []
      )}
      categoryDragItemsTitle="visualyticsCategoryDragItems"
      categoryDragItems={React.useMemo(
        () => visualyticsCategoryDragItems,
        [JSON.stringify(visualyticsCategoryDragItems)]
      )}
      categoryHasDroppedTitle="visualyticsCategoryHasDropped"
      categoryHasDropped={React.useMemo(
        () => visualyticsCategoryHasDropped,
        [JSON.stringify(visualyticsCategoryHasDropped)]
      )}
      categoryPanelWidth={categoryPanelWidth}
      categoryPanelComponent={
        <CategoryPanelComponent
          selectedZ={selectedZ}
          setSelectedZ={React.useCallback(setSelectedZ, [])}
          variableZDataOptions={variableZDataOptions}
          ZValuesTitle={ZValuesTitle}
        />
      }
      resultsTitle={selectedVisualyticsTitle}
    />
  );

  return (
    <ChartDataPanel
      selectLabel={"Visualytics Results"}
      selectedOption={React.useMemo(
        () => visualyticsRunOption,
        [JSON.stringify(visualyticsRunOption)]
      )}
      titleOptions={React.useMemo(
        () => visualyticsRunTitleOptions,
        [JSON.stringify(visualyticsRunTitleOptions)]
      )}
      handleSelectChange={React.useCallback(
        handleSelectVisualyticsResultsChange,
        []
      )}
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
      setExtrudeCategories={React.useCallback(setExtrudeCategories, [])}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
    />
  );
};

export default VisualyticsChartDataPanel;
