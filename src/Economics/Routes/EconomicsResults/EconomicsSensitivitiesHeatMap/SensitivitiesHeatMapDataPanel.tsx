import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
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
import { IEconomicsResultsVisualytics } from "../EconomicsResultsTypes";
import CategoryPanelComponent from "../../../../Visualytics/Components/ChartCategoryPanel/ChartCategoryPanel";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import XYYZRChartCategories from "../../../../Visualytics/Components/ChartCategories/XYYZRChartCategories";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
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
const heatMapVariableZOptionsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapVariableZOptions,
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
// const showHeatMapCategoryZMembersSelector = createDeepEqualSelector(
//   (state: RootState) =>
//     state.economicsReducer.showHeatMapCategoryMembersObj["Z Category"],
//   (data) => data
// );
const heatMapCategoryDragItemsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapCategoryDragItems,
  (data) => data
);
const heatMapCategoryHasDroppedSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.heatMapCategoryHasDropped,
  (data) => data
);

const wc = "storedDataWorkflows";

const economicsResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc].economicsResultsStored,
  (stored) => stored
);

const SensitivitiesHeatMapDataPanel = ({
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
  const sensitivitiesHeatMapTree = useSelector(
    sensitivitiesHeatMapTreeSelector
  );
  const heatMapVariableZOptions = useSelector(heatMapVariableZOptionsSelector);
  const heatMapTreeByScenario = useSelector(heatMapTreeByScenarioSelector);

  const showHeatMapCategoryMembersObj = useSelector(
    (state: RootState) => state.economicsReducer.showHeatMapCategoryMembersObj
  );
  const showHeatMapCategoryZMembers = useSelector(
    showHeatMapCategoryZMembersSelector
  );
  console.log(
    "🚀 ~ file: SensitivitiesHeatMapDataPanel.tsx ~ line 103 ~ showHeatMapCategoryZMembers",
    showHeatMapCategoryZMembers
  );

  const heatMapCategoryDragItems = useSelector(
    heatMapCategoryDragItemsSelector
  );
  const heatMapCategoryHasDropped = useSelector(
    heatMapCategoryHasDroppedSelector
  );

  const heatMapTreeData = sensitivitiesHeatMapTree["children"] as NonNullable<
    RenderTree["children"]
  >;
  const devScenariosColl = heatMapTreeData ? heatMapTreeData : [];
  const devOptions = devScenariosColl.map((row) => ({
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

  const clearChartCategories = React.useCallback(
    () =>
      dispatch(
        updateEconomicsParametersAction({
          sensitivitiesHeatMapData: {},
          sensitivitiesHeatMap1or2D: [],
          heatMapVariableXOptions: {},
          heatMapVariableYOptions: {},
          heatMapVariableZOptions: {},
          categoryDragItems: {
            "X Category": {},
            "Y Category": {},
            "Z Category": {},
            "R Category": {},
          },
          categoryHasDropped: {
            "X Category": {},
            "Y Category": {},
            "Z Category": {},
            "R Category": {},
          },
        })
      ),
    []
  );

  const handleSelectEconomicsResultsChange = (
    option: ValueType<IExtendedSelectOption, false>
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
        })
      );

      setDevOption({ value: "select", label: "Select..." });
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
          "heatMapTree",
          idTitleDescIsSaved
        )
      );

      clearChartCategories();
    }

    dispatch(resetHeatMapWorkflowsAction());
  };

  React.useEffect(() => {
    if (selectedEconomicsResultsTitle !== "") {
      setDevOption({ value: "select", label: "Select..." });
    }
  }, [selectedEconomicsResultsTitle]);

  const DevelopmentScenarios = () => {
    return (
      <AnalyticsComp
        title="Development Scenarios"
        content={
          <ApexSelectRS
            valueOption={devOption as NonNullable<ISelectOption>}
            data={devOptions as NonNullable<ISelectOption[]>}
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              const optionDefined = option as NonNullable<ISelectOption>;

              setDevOption(optionDefined);

              const heatMapTreeByScenario = heatMapTreeData.find(
                (sno) => sno.title === optionDefined.label
              ) as RenderTree;

              dispatch(
                updateEconomicsParameterAction(
                  "heatMapTreeByScenario",
                  heatMapTreeByScenario
                )
              );
            }}
            isSelectOptionType={true}
            menuPortalTarget={document.body}
            containerWidth={"100%"}
          />
        }
        direction="Vertical"
        containerStyle={{ width: "100%", marginBottom: 20 }}
      />
    );
  };

  let disableCollection = [] as boolean[];
  if (heatMapTreeByScenario && heatMapTreeByScenario.id === "") {
    disableCollection = [true, true, true];
  } else if (
    heatMapTreeByScenario &&
    heatMapTreeByScenario["children"].length === 1
  ) {
    disableCollection = [false, true, true];
  } else if (
    heatMapTreeByScenario &&
    heatMapTreeByScenario["children"].length === 2
  ) {
    disableCollection = [false, false, true];
  } else {
    disableCollection = [false, false, false];
  }

  const showMembersObjValues = [showHeatMapCategoryZMembers];
  // const showMembersObjValues = Object.values(
  //   showHeatMapCategoryMembersObj as Record<string, boolean>
  // );
  console.log(
    "🚀 ~ file: SensitivitiesHeatMapDataPanel.tsx ~ line 309 ~ showMembersObjValues",
    showMembersObjValues
  );

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
      // showCategoryMembersObj={React.useMemo(
      //   () => showHeatMapCategoryMembersObj,
      //   [JSON.stringify(showHeatMapCategoryMembersObj)]
      // )}
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
          variableOptions={React.useMemo(
            () => heatMapVariableZOptions,
            [JSON.stringify(heatMapVariableZOptions)]
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
        () => economicsResultTitleOption,
        [JSON.stringify(economicsResultTitleOption)]
      )}
      titleOptions={React.useMemo(
        () => economicsResultsTitleOptions,
        [JSON.stringify(economicsResultsTitleOptions)]
      )}
      handleSelectChange={React.useCallback(
        handleSelectEconomicsResultsChange,
        []
      )}
      selectedTitle={selectedEconomicsResultsTitle}
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
          : SensitivitiesHeatMapTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={React.useCallback(setExtrudeCategories, [])}
      categoriesComponent={categoriesComponent}
      renderCategoryIcon={true}
      showMembersObjValues={React.useMemo(
        () => showMembersObjValues,
        [JSON.stringify(showMembersObjValues)]
      )}
      clearChartCategories={React.useCallback(clearChartCategories, [])}
    />
  );
};

export default SensitivitiesHeatMapDataPanel;
