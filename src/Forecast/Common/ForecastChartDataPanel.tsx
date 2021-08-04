import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IIdSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { fetchTreeviewKeysRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ChartDataPanel from "../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { updateForecastResultsParameterAction } from "../Redux/Actions/ForecastActions";
import { IForecastRunOptions } from "../Routes/ForecastData";
import ForecastTreeView from "./ForecastTreeView";

const ForecastChartDataPanel = () => {
  const dispatch = useDispatch();

  const reducer = "forecastReducer";
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
  })) as IIdSelectOption[];

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
    React.useState<IIdSelectOption>(
      selectedForecastTitleOption as IIdSelectOption
    );

  const handleSelectForecastResultsChange = (
    option: ValueType<IIdSelectOption, false>
  ) => {
    setForecastRunOption(option as IIdSelectOption);

    dispatch(
      updateForecastResultsParameterAction(
        "selectedForecastingResultsId",
        (option as IIdSelectOption).id
      )
    );

    dispatch(fetchTreeviewKeysRequestAction(reducer, "forecastChart"));
  };

  return (
    <ChartDataPanel<IIdSelectOption>
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
