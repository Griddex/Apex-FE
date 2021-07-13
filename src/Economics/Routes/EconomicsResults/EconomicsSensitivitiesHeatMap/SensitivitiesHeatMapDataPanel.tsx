import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import DialogCancelButton from "../../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IApplicationStoredDataRow } from "../../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import ChartCategories from "../../../../Visualytics/Components/ChartCategories/ChartCategories";
import { IChartCategoriesData } from "../../../../Visualytics/Components/ChartCategories/ChartCategoryTypes";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { fetchEconomicsTreeviewKeysRequestAction } from "../../../Redux/Actions/EconomicsActions";
import SensitivitiesHeatMapTreeView from "./SensitivitiesHeatMapTreeView";

const SensitivitiesHeatMapDataPanel = ({
  ChartCategoriesData,
  categoriesTitle,
}: IChartCategoriesData) => {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const { economicsResultsStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const { selectedEconomicsResultsTitle } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsResultsTitles = economicsResultsStored.map(
    (row: IApplicationStoredDataRow) => row.title
  ) as string[];
  const economicsResultsTitleOptions = generateSelectOptions(
    economicsResultsTitles
  );
  const initialEconomicsResultsTitleOption =
    selectedEconomicsResultsTitle !== ""
      ? {
          value: selectedEconomicsResultsTitle,
          label: selectedEconomicsResultsTitle,
        }
      : economicsResultsTitleOptions[0];

  const [economicsResultTitleOption, setEconomicsResultTitleOption] =
    React.useState(initialEconomicsResultsTitleOption);

  const handleSelectEconomicsResultsChange = (
    option: ValueType<ISelectOption, false>
  ) => {
    setEconomicsResultTitleOption(option as ISelectOption);

    dispatch(fetchEconomicsTreeviewKeysRequestAction());
  };

  const developmentScenarios = () => {
    return (
      <AnalyticsComp
        title="Development Scenarios"
        content={
          <ApexSelectRS
            valueOption={{ value: "a", label: "A" }}
            data={[
              { value: "a", label: "A" },
              { value: "b", label: "B" },
            ]}
            handleSelect={() => {}}
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

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={economicsResultTitleOption}
      titleOptions={economicsResultsTitleOptions}
      handleSelectChange={handleSelectEconomicsResultsChange}
      selectedTitle={selectedEconomicsResultsTitle}
      hasSecondaryComponent={true}
      secondarySelectComponent={developmentScenarios}
      treeViewComponent={SensitivitiesHeatMapTreeView}
      categoriesAction={() => {
        const dialogParameters: DialogStuff = {
          name: "Chart_Categories_Dialog",
          title: `${categoriesTitle} Categories`,
          type: "draggableDialog",
          show: true,
          exclusive: true,
          maxWidth: "xs",
          iconType: "category",
          children: (
            <ChartCategories ChartCategoriesData={ChartCategoriesData} />
          ),
          actionsList: () => DialogCancelButton(),
        };

        dispatch(showDialogAction(dialogParameters));
      }}
    />
  );
};

export default SensitivitiesHeatMapDataPanel;
