import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IIdSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { fetchTreeviewKeysRequestAction } from "../../../../Forecast/Redux/Actions/ForecastActions";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import EconomicsPlotChartsTreeView from "./EconomicsPlotChartsTreeView";

const EconomicsPlotChartsDataPanel = () => {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const { economicsResultsStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const { selectedEconomicsResultsTitle } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsResultsTitleOptions = economicsResultsStored.map(
    (row: any) => ({
      value: row.title,
      label: row.title,
      id: row.id,
    })
  ) as IIdSelectOption[];

  economicsResultsTitleOptions.unshift({
    value: "select",
    label: "Select...",
    id: "",
  });

  const selectedEconomicsResultsTitleOption =
    selectedEconomicsResultsTitle !== ""
      ? {
          value: selectedEconomicsResultsTitle,
          label: selectedEconomicsResultsTitle,
          id: (economicsResultsTitleOptions as IIdSelectOption[]).filter(
            (o) => o.label === selectedEconomicsResultsTitle
          )[0].id,
        }
      : economicsResultsTitleOptions[0];

  const [economicsResultTitleOption, setEconomicsResultTitleOption] =
    React.useState<IIdSelectOption>(
      selectedEconomicsResultsTitleOption as IIdSelectOption
    );

  const handleSelectEconomicsResultsChange = (
    option: ValueType<IIdSelectOption, false>
  ) => {
    setEconomicsResultTitleOption(option as IIdSelectOption);

    dispatch(fetchTreeviewKeysRequestAction());
  };

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={economicsResultTitleOption}
      titleOptions={economicsResultsTitleOptions}
      handleSelectChange={handleSelectEconomicsResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedEconomicsResultsTitle}
      treeViewComponent={EconomicsPlotChartsTreeView}
    />
  );
};

export default EconomicsPlotChartsDataPanel;
