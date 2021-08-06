import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IExtendedSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { fetchEconomicsTreeviewKeysRequestAction } from "../../../Redux/Actions/EconomicsActions";
import EconomicsTemplateTreeView from "./EconomicsTemplateTreeView";

const EconomicsTemplateDataPanel = () => {
  const dispatch = useDispatch();

  const reducer = "economicsReducer";
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
  ) as IExtendedSelectOption[];

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
          id: (economicsResultsTitleOptions as IExtendedSelectOption[]).filter(
            (o) => o.label === selectedEconomicsResultsTitle
          )[0].id,
        }
      : economicsResultsTitleOptions[0];

  const [economicsResultTitleOption, setEconomicsResultTitleOption] =
    React.useState<IExtendedSelectOption>(
      selectedEconomicsResultsTitleOption as IExtendedSelectOption
    );

  const handleSelectEconomicsResultsChange = (
    option: ValueType<IExtendedSelectOption, false>
  ) => {
    setEconomicsResultTitleOption(option as IExtendedSelectOption);

    dispatch(
      fetchEconomicsTreeviewKeysRequestAction(true, "templatesTree", option?.id)
    );
  };

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={economicsResultTitleOption}
      titleOptions={economicsResultsTitleOptions}
      handleSelectChange={handleSelectEconomicsResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedEconomicsResultsTitle}
      treeViewComponent={EconomicsTemplateTreeView}
    />
  );
};

export default EconomicsTemplateDataPanel;
