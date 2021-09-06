import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IExtendedSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import NoData from "../../../../Application/Components/Visuals/NoData";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import XYChartCategories from "../../../../Visualytics/Components/ChartCategories/XYChartCategories";
import XYZChartCategories from "../../../../Visualytics/Components/ChartCategories/XYZChartCategories";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  removeEconomicsChartCategoryAction,
  updateEconomicsChartCategoryAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import EconomicsPlotChartsTreeView from "./EconomicsPlotChartsTreeView";

const EconomicsPlotChartsDataPanel = () => {
  const dispatch = useDispatch();

  const reducer = "economicsReducer";
  const wc = "storedDataWorkflows";

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const { economicsResultsStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const {
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsDescription,
    selectedEconomicsPlotChartOption,
  } = useSelector((state: RootState) => state.economicsReducer);

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

  const renderChartCategory = (chartType: TChartTypes) => {
    const chartTypeDefined = chartType as TChartTypes;

    if (
      ["stackedAreaChart", "lineChart", "barChart"].includes(chartTypeDefined)
    ) {
      return (
        <XYChartCategories
          xCategoryOptionTitle="plotChartsVariableXOptions"
          yCategoryOptionTitle="plotChartsVariableYOptions"
          disableX={false}
          disableY={false}
          updateAction={updateEconomicsChartCategoryAction}
          removeAction={removeEconomicsChartCategoryAction}
        />
      );
    } else if (["heatMapChart"].includes(chartTypeDefined)) {
      return (
        <XYZChartCategories
          xCategoryOptionTitle="plotChartsVariableXOptions"
          yCategoryOptionTitle="plotChartsVariableYOptions"
          zCategoryOptionTitle="plotChartsVariableZOptions"
          disableX={false}
          disableY={false}
          disableZ={false}
          updateAction={updateEconomicsChartCategoryAction}
          removeAction={removeEconomicsChartCategoryAction}
        />
      );
    }
  };

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
          ? NoData
          : EconomicsPlotChartsTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={setExtrudeCategories}
      categoriesComponent={renderChartCategory(chartType as TChartTypes)}
      renderCategoryIcon={true}
    />
  );
};

export default EconomicsPlotChartsDataPanel;
