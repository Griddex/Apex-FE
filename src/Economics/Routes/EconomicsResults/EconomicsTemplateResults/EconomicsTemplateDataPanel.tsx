import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { fetchTreeviewKeysRequestAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { IApplicationStoredDataRow } from "../../../../Application/Types/ApplicationTypes";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import ChartDataPanel from "../../../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
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

  const economicsResultsTitles = economicsResultsStored.map(
    (row: IApplicationStoredDataRow) => row.title
  ) as string[];
  const economicsResultsTitleOptions = generateSelectOptions(
    economicsResultsTitles
  );
  const initialEconomicsResultsTitleOption =
    selectedEconomicsResultsTitle !== ""
      ? selectedEconomicsResultsTitle
      : economicsResultsTitleOptions[0];

  const [economicsResultTitleOption, setEconomicsResultTitleOption] =
    React.useState(initialEconomicsResultsTitleOption);
  const firstRender = React.useRef(true);

  const handleSelectEconomicsResultsChange = (
    option: ValueType<ISelectOption, false>
  ) => {
    setEconomicsResultTitleOption(option);

    dispatch(
      fetchTreeviewKeysRequestAction(reducer, "economicsTemplateResults")
    );
  };

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

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
