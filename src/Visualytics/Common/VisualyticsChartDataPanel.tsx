import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import NoData from "../../Application/Components/Visuals/NoData";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import XYChartCategories from "../Components/ChartCategories/XYChartCategories";
import XYYZRChartCategories from "../Components/ChartCategories/XYYZRChartCategories";
import ChartDataPanel from "../Components/ChartDataPanel/ChartDataPanel";
import { TChartTypes } from "../Components/Charts/ChartTypes";
import {
  fetchVisualyticsTreeviewKeysRequestAction,
  removeVisualyticsChartCategoryAction,
  updateVisualyticsChartCategoryAction,
  updateVisualyticsParametersAction,
} from "../Redux/Actions/VisualyticsActions";
import VisualyticsTreeView from "./VisualyticsTreeView";

const VisualyticsChartDataPanel = () => {
  const dispatch = useDispatch();

  const reducer = "visualyticsReducer";
  const wc = "storedDataWorkflows";

  const [extrudeCategories, setExtrudeCategories] = React.useState(false);

  const { visualyticsDeckStored } = useSelector(
    (state: RootState) => state.visualyticsReducer[wc]
  );
  const {
    selectedVisualyticsTitle,
    selectedVisualyticsDescription,
    selectedVisualyticsChartOption,
  } = useSelector((state: RootState) => state.visualyticsReducer);

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
          updateAction={updateVisualyticsChartCategoryAction}
          removeAction={removeVisualyticsChartCategoryAction}
        />
      );
    } else if (["heatMapChart"].includes(chartTypeDefined)) {
      return (
        <XYYZRChartCategories
          xCategoryOptionTitle="plotChartsVariableXOptions"
          yCategoryOptionTitle="plotChartsVariableYOptions"
          zCategoryOptionTitle="plotChartsVariableZOptions"
          disableX={false}
          disableY={false}
          disableZ={false}
          updateAction={updateVisualyticsChartCategoryAction}
          removeAction={removeVisualyticsChartCategoryAction}
        />
      );
    }
  };

  return (
    <ChartDataPanel<IExtendedSelectOption>
      selectLabel={"Visualytics Results"}
      selectedOption={visualyticsRunOption}
      titleOptions={visualyticsRunTitleOptions}
      handleSelectChange={handleSelectVisualyticsResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedVisualyticsTitle}
      treeViewComponent={
        visualyticsRunOption.title === "Select..."
          ? NoData
          : VisualyticsTreeView
      }
      extrudeCategories={extrudeCategories}
      setExtrudeCategories={setExtrudeCategories}
      categoriesComponent={renderChartCategory(chartType as TChartTypes)}
      renderCategoryIcon={true}
    />
  );
};

export default VisualyticsChartDataPanel;
