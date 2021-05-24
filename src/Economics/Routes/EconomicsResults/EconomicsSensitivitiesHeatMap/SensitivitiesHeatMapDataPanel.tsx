import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IApplicationExistingDataRow } from "../../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import { fetchTreeviewKeysRequestAction } from "../../../../Forecast/Redux/Actions/ForecastActions";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";

import SensitivitiesHeatMapTreeView from "./SensitivitiesHeatMapTreeView";

const SensitivitiesHeatMapDataPanel = () => {
  const dispatch = useDispatch();

  const wc = "existingDataWorkflows";
  const { economicsResultsExisting } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const { selectedEconomicsResultsTitle, showHeatMapCategories } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const economicsResultsTitles = economicsResultsExisting.map(
    (row: IApplicationExistingDataRow) => row.title
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

    dispatch(fetchTreeviewKeysRequestAction());
  };

  return (
    <ChartDataPanel
      selectLabel={"Economics Results"}
      selectedOption={economicsResultTitleOption}
      titleOptions={economicsResultsTitleOptions}
      handleSelectChange={handleSelectEconomicsResultsChange}
      selectedTitle={selectedEconomicsResultsTitle}
      treeViewComponent={SensitivitiesHeatMapTreeView}
      categoriesAction={() =>
        dispatch(
          updateEconomicsParameterAction(
            `showHeatMapCategories`,
            !showHeatMapCategories
          )
        )
      }
    />
  );
};

export default SensitivitiesHeatMapDataPanel;
