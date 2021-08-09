import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ChartDataPanel from "../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import {
  fetchForecastTreeviewKeysRequestAction,
  updateForecastResultsParameterAction,
  updateForecastResultsParametersAction,
} from "../Redux/Actions/ForecastActions";
import { IForecastRunOptions } from "../Routes/ForecastData";
import ForecastTreeView from "./ForecastTreeView";

const ForecastChartDataPanel = () => {
  const dispatch = useDispatch();

  const reducer = "forecastReducer";
  const wc = "storedDataWorkflows";
  const { forecastResultsStored } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );
  const {
    selectedForecastingResultsTitle,
    selectedForecastingResultsDescription,
  } = useSelector((state: RootState) => state.forecastReducer);

  const forecastRunTitleOptions = forecastResultsStored.map((row) => ({
    value: row.title,
    label: row.title,
    id: row.id,
    title: row.title,
    description: row.description,
  })) as IExtendedSelectOption[];

  forecastRunTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
    title: "Select...",
    description: "Select...",
  });

  const selectedForecastTitleOption =
    selectedForecastingResultsTitle !== ""
      ? {
          value: selectedForecastingResultsTitle,
          label: selectedForecastingResultsTitle,
          id: (forecastRunTitleOptions as IForecastRunOptions[]).filter(
            (o) => o.label === selectedForecastingResultsTitle
          )[0].id,
          title: selectedForecastingResultsTitle,
          description: selectedForecastingResultsDescription,
        }
      : forecastRunTitleOptions[0];

  const [forecastRunOption, setForecastRunOption] =
    React.useState<IExtendedSelectOption>(
      selectedForecastTitleOption as IExtendedSelectOption
    );

  const handleSelectForecastResultsChange = (
    option: ValueType<IExtendedSelectOption, false>
  ) => {
    const optionDefined = option as IExtendedSelectOption;
    setForecastRunOption(optionDefined);

    const { id, title, description } = optionDefined;

    dispatch(
      updateForecastResultsParametersAction({
        selectedForecastingResultsId: id,
        selectedForecastingResultsTitle: title,
        selectedForecastingResultsDescription: description,
      })
    );

    dispatch(fetchForecastTreeviewKeysRequestAction(reducer, "forecastChart"));
  };

  return (
    <ChartDataPanel<IExtendedSelectOption>
      selectLabel={"Forecast Results"}
      selectedOption={forecastRunOption}
      titleOptions={forecastRunTitleOptions}
      handleSelectChange={handleSelectForecastResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedForecastingResultsTitle}
      treeViewComponent={ForecastTreeView}
    />
  );
};

export default ForecastChartDataPanel;
