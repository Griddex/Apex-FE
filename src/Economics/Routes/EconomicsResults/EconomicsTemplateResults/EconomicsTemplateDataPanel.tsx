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
import EconomicsTemplateTreeView from "./EconomicsTemplateTreeView";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  chartSelect: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    border: "1px solid #C4C4C4",
    width: "100%",
  },
  treeViewPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    // border: "1px solid #C4C4C4",
    width: "100%",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const EconomicsTemplateDataPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "existingDataWorkflows";
  const { economicsResultsExisting } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const { selectedEconomicsResultsTitle } = useSelector(
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
      ? selectedEconomicsResultsTitle
      : economicsResultsTitleOptions[0];

  const [
    economicsResultTitleOption,
    setEconomicsResultTitleOption,
  ] = React.useState(initialEconomicsResultsTitleOption);
  const firstRender = React.useRef(true);

  const handleSelectEconomicsResultsChange = (
    option: ValueType<ISelectOption, false>
  ) => {
    setEconomicsResultTitleOption(option);

    dispatch(fetchTreeviewKeysRequestAction());
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
      selectedTitle={selectedEconomicsResultsTitle}
      treeViewComponent={EconomicsTemplateTreeView}
    />
  );
};

export default EconomicsTemplateDataPanel;
