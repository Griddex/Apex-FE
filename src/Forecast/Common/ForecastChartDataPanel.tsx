import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  fetchForecastTreeviewKeysRequestAction,
  resetForecastChartsWorkflowsAction,
  updateForecastResultsParametersAction,
} from "../Redux/Actions/ForecastActions";

const NoSelectionPlaceholder = React.lazy(
  () =>
    import("../../Application/Components/PlaceHolders/NoSelectionPlaceholder")
);
const ChartDataPanel = React.lazy(
  () => import("../../Visualytics/Components/ChartDataPanel/ChartDataPanel")
);
const ForecastTreeView = React.lazy(() => import("./ForecastTreeView"));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const forecastSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer,
  (reducer) => reducer
);

const ForecastChartDataPanel = () => {
  const dispatch = useDispatch();

  const reducer = "forecastReducer";
  const wc = "storedDataWorkflows";

  const forecastResultsStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.forecastReducer[wc]["forecastResultsStored"],
    (reducer) => reducer
  );

  const forecastResultsStored = useSelector(forecastResultsStoredSelector);

  const {
    selectedForecastingResultsTitle,
    selectedForecastingResultsDescription,
  } = useSelector(forecastSelector);

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
          id: (forecastRunTitleOptions as IExtendedSelectOption[]).filter(
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

    if (title === "Select...") {
      dispatch(
        updateForecastResultsParametersAction({
          selectedForecastingResultsId: "",
          selectedForecastingResultsTitle: "",
          selectedForecastingResultsDescription: "",
          isForecastResultsSaved: false,
        })
      );
    } else {
      const idTitleDescIsSaved = {
        selectedForecastingResultsId: id,
        selectedForecastingResultsTitle: title,
        selectedForecastingResultsDescription: description,
        isForecastResultsSaved: true,
      };

      dispatch(
        fetchForecastTreeviewKeysRequestAction(
          reducer,
          "forecastChart",
          idTitleDescIsSaved
        )
      );
    }

    dispatch(resetForecastChartsWorkflowsAction());
  };

  return (
    <ChartDataPanel
      selectLabel={"Forecast Results"}
      selectedOption={forecastRunOption}
      titleOptions={forecastRunTitleOptions}
      handleSelectChange={handleSelectForecastResultsChange}
      hasSecondaryComponent={false}
      selectedTitle={selectedForecastingResultsTitle}
      treeViewComponent={
        forecastRunOption.title === "Select..."
          ? () => (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select result.."
              />
            )
          : ForecastTreeView
      }
      renderCategoryIcon={false}
    />
  );
};

export default ForecastChartDataPanel;
