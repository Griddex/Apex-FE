import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  fetchForecastTreeviewKeysRequestAction,
  resetForecastChartsWorkflowsAction,
  updateForecastResultsParameterAction,
  updateForecastResultsParametersAction,
} from "../Redux/Actions/ForecastActions";
import NoSelectionPlaceholder from "../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import ChartDataPanel from "../../Visualytics/Components/ChartDataPanel/ChartDataPanel";
import ForecastTreeView from "./ForecastTreeView";
import ApexSelectRS from "../../Application/Components/Selects/ApexSelectRS";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const reducer = "forecastReducer";
const wc = "storedDataWorkflows";

const forecastResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer[wc]["forecastResultsStored"],
  (reducer) => reducer
);

const selectedForecastingResultsTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.selectedForecastingResultsTitle,
  (data) => data
);

const selectedForecastingResultsDescriptionSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.forecastReducer.selectedForecastingResultsDescription,
  (data) => data
);

const ForecastChartDataPanel = () => {
  const dispatch = useDispatch();

  const forecastResultsStored = useSelector(forecastResultsStoredSelector);

  const selectedForecastingResultsTitle = useSelector(
    selectedForecastingResultsTitleSelector
  );
  const selectedForecastingResultsDescription = useSelector(
    selectedForecastingResultsDescriptionSelector
  );

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
    option: OnChangeValue<IExtendedSelectOption, false>
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
      dispatch(
        updateForecastResultsParameterAction(
          "forecastChartsWorkflows.commonChartProps.axisLeft.legend",
          ""
        )
      );
      dispatch(
        updateForecastResultsParameterAction(
          "forecastChartsWorkflows.commonChartProps.axisBottom.legend",
          ""
        )
      );
      dispatch(
        updateForecastResultsParameterAction("qualityAssuranceResults", [])
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

  const ResultsSelect = () => {
    return (
      <ApexSelectRS<IExtendedSelectOption>
        valueOption={forecastRunOption}
        data={forecastRunTitleOptions}
        handleSelect={handleSelectForecastResultsChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
        containerWidth={300}
        containerHeight={40}
      />
    );
  };

  return (
    <ChartDataPanel
      selectLabel={"Forecast Results"}
      selectedOption={React.useMemo(
        () => forecastRunOption,
        [JSON.stringify(forecastRunOption)]
      )}
      titleOptions={React.useMemo(
        () => forecastRunTitleOptions,
        [JSON.stringify(forecastRunTitleOptions)]
      )}
      handleSelectChange={React.useCallback(
        handleSelectForecastResultsChange,
        []
      )}
      hasSecondaryComponent={false}
      selectedTitle={selectedForecastingResultsTitle}
      resultsSelect={ResultsSelect}
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
