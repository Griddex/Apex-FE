import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import omit from "lodash.omit";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import XYYZRChartCategories from "../../../../Visualytics/Components/ChartCategories/XYYZRChartCategories";
import CategoryPanelComponent from "../../../../Visualytics/Components/ChartCategoryPanel/ChartCategoryPanel";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { initialHeatMapData } from "../../../Data/EconomicsData";
import useDroppedIds from "../../../Hooks/UseDroppedIds";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  removeEconomicsChartCategoryAction,
  resetHeatMapWorkflowsAction,
  updateEconomicsChartCategoryAction,
  updateEconomicsHeatMapDragItemsAction,
  updateEconomicsHeatMapHasDroppedAction,
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import getDragItems from "../../../Utils/GetDragItems";
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import SensitivitiesHeatMapTreeView from "./SensitivitiesHeatMapTreeView";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedEconomicsResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsResultsTitle,
  (data) => data
);
const selectedEconomicsResultsDescriptionSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer.selectedEconomicsResultsDescription,
  (data) => data
);
const sensitivitiesHeatMapTreeSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.sensitivitiesHeatMapTree,
  (data) => data
);

const heatMapTreeByScenarioSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapTreeByScenario,
  (data) => data
);
const showHeatMapCategoryZMembersSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.showCategoryZMembers,
  (data) => data
);
const heatMapCategoryDragItemsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapCategoryDragItems,
  (data) => data
);
const heatMapCategoryHasDroppedSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapCategoryHasDropped,
  (data) => data
);
const resultsAnalyisOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.resultsAnalyisOptions,
  (data) => data
);
const analysisOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.analysisOption,
  (data) => data
);

const wc = "storedDataWorkflows";

const economicsResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc].economicsResultsStored,
  (stored) => stored
);

const SensitivitiesHeatMapDataPanel = ({
  selectedZ,
  setSelectedZ,
  variableZDataOptions,
  ZValuesTitle,
}: IEconomicsResultsVisualytics) => {
  const dispatch = useDispatch();

  const [willExtrudeCategories, setWillExtrudeCategories] =
    React.useState(false);

  const economicsResultsStored = useSelector(economicsResultsStoredSelector);

  const selectedEconomicsResultsTitle = useSelector(
    selectedEconomicsResultsTitleSelector
  );

  const selectedEconomicsResultsDescription = useSelector(
    selectedEconomicsResultsDescriptionSelector
  );
  const sensitivitiesHeatMapTree = useSelector(
    sensitivitiesHeatMapTreeSelector
  );
  const heatMapTreeByScenario = useSelector(heatMapTreeByScenarioSelector);

  const showHeatMapCategoryMembersObj = useSelector(
    (state: RootState) => state.economicsReducer.showHeatMapCategoryMembersObj
  );
  const showHeatMapCategoryZMembers = useSelector(
    showHeatMapCategoryZMembersSelector
  );

  const heatMapCategoryDragItems = useSelector(
    heatMapCategoryDragItemsSelector
  );

  const heatMapCategoryHasDropped = useSelector(
    heatMapCategoryHasDroppedSelector
  );
  const resultsAnalyisOptions = useSelector(resultsAnalyisOptionsSelector);
  const anOption = useSelector(analysisOptionSelector);

  const drgItems = getDragItems(heatMapCategoryDragItems);
  const droppedIds = useDroppedIds({
    categoryDragItems: heatMapCategoryDragItems,
    drgItems,
  });

  const heatMapTreeData = sensitivitiesHeatMapTree[anOption?.value as string]
    ?.children as NonNullable<RenderTree["children"]>;

  const devScenariosData = heatMapTreeData ? heatMapTreeData : [];
  const devOptions = devScenariosData.map((row) => ({
    value: row.title,
    label: row.title,
  }));

  devOptions.unshift({
    value: "select",
    label: "Select...",
  });

  const [devOption, setDevOption] = React.useState(devOptions[0]);

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

  const [economicsResultTitleOption, setEconomicsResultTitleOption] =
    React.useState<IExtendedSelectOption>(
      selectedEconomicsResultsTitleOption as IExtendedSelectOption
    );

  const resetChartData = React.useCallback(
    () => dispatch(updateEconomicsParametersAction(initialHeatMapData)),
    []
  );

  const clearChartCategories = React.useCallback(
    () =>
      dispatch(
        updateEconomicsParametersAction(
          omit(initialHeatMapData, [
            "selectedEconomicsResultsId",
            "selectedEconomicsResultsTitle",
            "selectedEconomicsResultsDescription",
            "isEconomicsResultsSaved",
            "analyisOption",
            "heatMapTreeByScenario",
            "sensitivitiesHeatMapTree",
            "sensitivitiesHeatMapData",
          ])
        )
      ),
    []
  );

  const handleSelectEconomicsResultsChange = (
    option: OnChangeValue<IExtendedSelectOption, false>
  ) => {
    const optionDefined = option as IExtendedSelectOption;
    setEconomicsResultTitleOption(optionDefined);

    const { id, title, description } = optionDefined;

    if (title === "Select...") {
      dispatch(
        updateEconomicsParametersAction({
          selectedEconomicsResultsId: "",
          selectedEconomicsResultsTitle: "",
          selectedEconomicsResultsDescription: "",
          isEconomicsResultsSaved: false,
          analyisOption: { value: "Select...", label: "Select..." },
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
        updateEconomicsParametersAction({
          analyisOption: resultsAnalyisOptions[0],
        })
      );

      dispatch(
        fetchEconomicsTreeviewKeysRequestAction(
          true,
          "heatMapTree",
          idTitleDescIsSaved
        )
      );

      resetChartData();
    }

    setDevOption({ value: "select", label: "Select..." });
    dispatch(resetHeatMapWorkflowsAction());
  };

  const DevelopmentScenarios = React.memo(() => {
    return (
      <AnalyticsComp
        title="Development Scenarios"
        content={
          <ApexSelectRS
            valueOption={devOption as NonNullable<ISelectOption>}
            data={devOptions as NonNullable<ISelectOption[]>}
            handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
              const optionDefined = option as NonNullable<ISelectOption>;

              setDevOption(optionDefined);

              const heatMapTreeByScenario = heatMapTreeData?.find(
                (sno) => sno.title === optionDefined.label
              ) as RenderTree;

              dispatch(
                updateEconomicsParameterAction(
                  "heatMapTreeByScenario",
                  heatMapTreeByScenario
                )
              );

              dispatch(
                updateEconomicsParametersAction(
                  omit(initialHeatMapData, [
                    "selectedEconomicsResultsId",
                    "selectedEconomicsResultsTitle",
                    "selectedEconomicsResultsDescription",
                    "isEconomicsResultsSaved",
                    "analyisOption",
                    "heatMapTreeByScenario",
                    "sensitivitiesHeatMapTree",
                  ])
                )
              );
            }}
            isSelectOptionType={true}
            menuPortalTarget={document.body}
            containerWidth={"100%"}
            containerHeight={40}
          />
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
    );
  });

  const ResultsSelect = React.memo(() => {
    return (
      <ApexSelectRS<IExtendedSelectOption>
        valueOption={economicsResultTitleOption}
        data={economicsResultsTitleOptions}
        handleSelect={handleSelectEconomicsResultsChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
        containerWidth={300}
        containerHeight={40}
      />
    );
  });

  let disableCollection = [] as boolean[];
  if (heatMapTreeByScenario && heatMapTreeByScenario.id === "") {
    disableCollection = [true, true, true];
  } else if (
    heatMapTreeByScenario &&
    heatMapTreeByScenario?.children[0]?.children?.length === 1
  ) {
    disableCollection = [false, true, true];
  } else if (
    heatMapTreeByScenario &&
    heatMapTreeByScenario?.children[0]?.children?.length === 2
  ) {
    disableCollection = [false, false, true];
  } else {
    disableCollection = [false, false, false];
  }

  const showMembersObjValues = [showHeatMapCategoryZMembers];

  const categoryPanelWidth = 250;

  const categoriesComponent = (
    <XYYZRChartCategories
      chartType="heatMapChart"
      xCategoryOptionTitle="heatMapVariableXOptions"
      yCategoryOptionTitle="heatMapVariableYOptions"
      zCategoryOptionTitle="heatMapVariableZOptions"
      disableX={disableCollection[0]}
      disableY={disableCollection[1]}
      disableZ={disableCollection[2]}
      updateAction={React.useCallback(updateEconomicsChartCategoryAction, [])}
      removeAction={React.useCallback(removeEconomicsChartCategoryAction, [])}
      showXCategoryMembersSwitch={false}
      showYCategoryMembersSwitch={false}
      showZCategoryMembersSwitch={true}
      showCategoryMembersObj={showHeatMapCategoryMembersObj}
      showCategoryZMembers={showHeatMapCategoryZMembers}
      path="showHeatMapCategoryMembersObj"
      updateParameterAction={React.useCallback(
        updateEconomicsParameterAction,
        []
      )}
      categoryDragItemsTitle="heatMapCategoryDragItems"
      categoryDragItems={React.useMemo(
        () => heatMapCategoryDragItems,
        [JSON.stringify(heatMapCategoryDragItems)]
      )}
      categoryHasDroppedTitle="heatMapCategoryHasDropped"
      categoryHasDropped={React.useMemo(
        () => heatMapCategoryHasDropped,
        [JSON.stringify(heatMapCategoryHasDropped)]
      )}
      updateDragItemsAction={React.useCallback(
        updateEconomicsHeatMapDragItemsAction,
        []
      )}
      updateHasDroppedAction={React.useCallback(
        updateEconomicsHeatMapHasDroppedAction,
        []
      )}
      categoryPanelWidth={categoryPanelWidth}
      categoryPanelComponent={
        <CategoryPanelComponent
          selectedZ={selectedZ}
          setSelectedZ={setSelectedZ}
          variableZDataOptions={variableZDataOptions}
          ZValuesTitle={ZValuesTitle}
        />
      }
      resultsTitle={selectedEconomicsResultsTitle}
      devScenariosTitle={devOption.value}
    />
  );

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={React.useMemo(
        () => economicsResultTitleOption,
        [economicsResultTitleOption?.value]
      )}
      titleOptions={React.useMemo(
        () => economicsResultsTitleOptions,
        [economicsResultsTitleOptions.map((o) => o.value).join()]
      )}
      handleSelectChange={React.useCallback(
        handleSelectEconomicsResultsChange,
        []
      )}
      selectedTitle={selectedEconomicsResultsTitle}
      resultsSelect={ResultsSelect}
      hasSecondaryComponent={true}
      secondarySelectComponent={DevelopmentScenarios}
      treeViewComponent={
        devOption.label === "Select..."
          ? () => (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select result.."
              />
            )
          : () => <SensitivitiesHeatMapTreeView droppedIds={droppedIds} />
      }
      willExtrudeCategories={willExtrudeCategories}
      setWillExtrudeCategories={React.useCallback(setWillExtrudeCategories, [])}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
      showMembersObjValues={React.useMemo(
        () => showMembersObjValues,
        [showMembersObjValues.join()]
      )}
      clearChartCategories={React.useCallback(clearChartCategories, [])}
      hasTitle={true}
      title={anOption?.label}
    />
  );
};

export default SensitivitiesHeatMapDataPanel;
