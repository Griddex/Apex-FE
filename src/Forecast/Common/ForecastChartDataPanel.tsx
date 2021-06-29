import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IForecastSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ChartDataPanel from "../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import {
  fetchTreeviewKeysRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IForecastRunOptions } from "../Routes/ForecastData";
import ForecastTreeView from "./ForecastTreeView";

const ForecastChartDataPanel = () => {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const { forecastResultsStored } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  );
  const { selectedForecastingResultsTitle } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const forecastRunTitleOptions = forecastResultsStored.map((row) => ({
    value: row.title,
    label: row.title,
    id: row.id,
  })) as IForecastSelectOption[];

  forecastRunTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
  });

  const selectedForecastTitleOption =
    selectedForecastingResultsTitle !== ""
      ? {
          value: selectedForecastingResultsTitle,
          label: selectedForecastingResultsTitle,
          id: (forecastRunTitleOptions as IForecastRunOptions[]).filter(
            (o) => o.label === selectedForecastingResultsTitle
          )[0].id,
        }
      : forecastRunTitleOptions[0];

  const [forecastRunOption, setForecastRunOption] =
    React.useState<IForecastSelectOption>(
      selectedForecastTitleOption as IForecastSelectOption
    );

  const handleSelectForecastResultsChange = (
    option: ValueType<IForecastSelectOption, false>
  ) => {
    setForecastRunOption(option as IForecastSelectOption);

    dispatch(
      updateForecastResultsParameterAction(
        "selectedForecastingResultsId",
        (option as IForecastSelectOption).id
      )
    );
    // dispatch(fetchTreeviewKeysRequestAction("forecastResultsVisualytics"));
    dispatch(fetchTreeviewKeysRequestAction());
  };

  return (
    <ChartDataPanel<IForecastSelectOption>
      selectLabel={"Forecast Results"}
      selectedOption={forecastRunOption}
      titleOptions={forecastRunTitleOptions}
      handleSelectChange={handleSelectForecastResultsChange}
      selectedTitle={selectedForecastingResultsTitle}
      treeViewComponent={ForecastTreeView}
    />
  );
};

export default ForecastChartDataPanel;
