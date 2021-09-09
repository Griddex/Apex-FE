import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import DialogCancelButton from "../../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  IExtendedSelectOption,
  ISelectOption,
} from "../../../../Application/Components/Selects/SelectItemsType";
import NoData from "../../../../Application/Components/Visuals/NoData";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import XYZChartCategories from "../../../../Visualytics/Components/ChartCategories/XYZChartCategories";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { RenderTree } from "../../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  removeEconomicsChartCategoryAction,
  updateEconomicsChartCategoryAction,
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import SensitivitiesHeatMapTreeView from "./SensitivitiesHeatMapTreeView";

const SensitivitiesHeatMapDataPanel = () => {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const { economicsResultsStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const {
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsDescription,
    sensitivitiesHeatMapTree,
    heatMapTreeByScenario,
    showHeatMapCategoryMembersObj,
  } = useSelector((state: RootState) => state.economicsReducer);

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
    }
  };

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

  const [showObj, setShowObj] = React.useState(showHeatMapCategoryMembersObj);
  console.log(
    "Logged output --> ~ file: SensitivitiesHeatMapDataPanel.tsx ~ line 185 ~ SensitivitiesHeatMapDataPanel ~ showObj",
    showObj
  );
  console.log(
    "Logged output --> ~ file: SensitivitiesHeatMapDataPanel.tsx ~ line 185 ~ SensitivitiesHeatMapDataPanel ~ showHeatMapCategoryMembersObj",
    showHeatMapCategoryMembersObj
  );

  const membersObjString = Object.values(
    showHeatMapCategoryMembersObj as Record<string, boolean>
  ).join("");

  const categoryComponent = () => {
    return (
      <XYZChartCategories
        xCategoryOptionTitle="heatMapVariableXOptions"
        yCategoryOptionTitle="heatMapVariableYOptions"
        zCategoryOptionTitle="heatMapVariableZOptions"
        disableX={disableCollection[0]}
        disableY={disableCollection[1]}
        disableZ={disableCollection[2]}
        updateAction={updateEconomicsChartCategoryAction}
        removeAction={removeEconomicsChartCategoryAction}
        showXCategoryMembersSwitch={false}
        showYCategoryMembersSwitch={false}
        showZCategoryMembersSwitch={true}
        showCategoryMembersObj={showObj}
        path="showHeatMapCategoryMembersObj"
        updateParameterAction={updateEconomicsParameterAction}
      />
    );
  };

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={economicsResultTitleOption}
      titleOptions={economicsResultsTitleOptions}
      handleSelectChange={handleSelectEconomicsResultsChange}
      selectedTitle={selectedEconomicsResultsTitle}
      hasSecondaryComponent={true}
      secondarySelectComponent={DevelopmentScenarios}
      treeViewComponent={
        devOption.label === "Select..." ? NoData : SensitivitiesHeatMapTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={setExtrudeCategories}
      categoriesComponent={categoryComponent()}
      renderCategoryIcon={true}
      membersObjString={membersObjString}
    />
  );
};

export default SensitivitiesHeatMapDataPanel;
