import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { IExtendedSelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  resetTemplateChartsWorkflowsAction,
  updateEconomicsParametersAction,
} from "../../../Redux/Actions/EconomicsActions";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const ChartDataPanel = React.lazy(
  () =>
    import("../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel")
);
const EconomicsTemplateTreeView = React.lazy(
  () => import("./EconomicsTemplateTreeView")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const reducer = "economicsReducer";
const wc = "storedDataWorkflows";

const economicsResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc]["economicsResultsStored"],
  (data) => data
);
const selectedEconomicsResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer["selectedEconomicsResultsTitle"],
  (data) => data
);

const EconomicsTemplateDataPanel = () => {
  const dispatch = useDispatch();
  const economicsResultsStored = useSelector(economicsResultsStoredSelector);

  const selectedEconomicsResultsTitle = useSelector(
    selectedEconomicsResultsTitleSelector
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
          "templatesTree",
          idTitleDescIsSaved
        )
      );
    }

    dispatch(resetTemplateChartsWorkflowsAction());
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
      renderCategoryIcon={true}
    />
  );
};

export default EconomicsTemplateDataPanel;
