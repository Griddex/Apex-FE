import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistSelectedIdTitleAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import { IStoredInputDeck } from "../../../../Import/Routes/InputDeckTypes";
import {
  fetchStoredEconomicsDataRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const StoredDataRoute = React.lazy(
  () =>
    import("../../../../Import/Routes/Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

const wc = "storedDataWorkflows";
const wp: NonNullable<IStoredDataProps["wkPs"]> =
  "economicsCostsRevenuesDeckStored";

const economicsCostsRevenuesDeckStoredSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer[wc]["economicsCostsRevenuesDeckStored"],
  (data) => data
);

export default function StoredCostsAndRevenuesDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredInputDeck) {
  const theme = useTheme();

  //TODO: Calculate classification data from collection
  const chartData = [
    {
      id: "A",
      label: "A",
      value: 2400,
      color: theme.palette.primary.main,
    },
    {
      id: "B",
      label: "B",
      value: 4567,
      color: theme.palette.success.main,
    },
    {
      id: "C",
      label: "C",
      value: 1398,
      color: theme.palette.secondary.main,
    },
  ];

  const currentProjectId = useSelector(currentProjectIdSelector);

  const tableTitle = "Costs/Revenues Table";
  const mainUrl = `${getBaseEconomicsUrl()}/data`;
  const collectionName = "costRevenuesOil";

  const dispatch = useDispatch();

  const economicsCostsRevenuesDeckStored = useSelector(
    economicsCostsRevenuesDeckStoredSelector
  );

  const snStoredData: IStoredDataRow[] =
    economicsCostsRevenuesDeckStored &&
    economicsCostsRevenuesDeckStored.map(
      (row: IApplicationStoredDataRow, i: number) => ({
        sn: i + 1,
        id: row.id,
        approval: "Not Started",
        title: row.title,
        description: row.description,
        developmentScenarios: row?.developmentScenariosCostsRevenue?.join(", "),
        author: { avatarUrl: "", name: "None" },
        approvers: [{ avatarUrl: "", name: "" }],
        createdOn: row.createdAt,
        modifiedOn: row.createdAt,
      })
    );

  const dataKey = "title";
  const dataTitle = "COSTS & REVENUE TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title, developmentScenariosCostsRevenue } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          selectedCostsRevenuesInputDeckId: id,
          selectedCostsRevenuesInputDeckTitle: title,
        })
      );

    dispatch(
      updateEconomicsParameterAction(
        "selectedDevScenarioNamesCostsRevenues",
        developmentScenariosCostsRevenue
      )
    );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedCostsRevenuesInputDeckId: "",
          selectedCostsRevenuesInputDeckTitle: "",
        })
      );
  };

  const isDataVisibility = true;
  const isCloning = false;

  const props: IStoredDataProps = {
    snStoredData,
    dataKey,
    dataTitle,
    wkPs: wp,
    chartData,
    showChart,
    containerStyle,
    handleCheckboxChange,
    reducer,
    collectionName,
    mainUrl,
    tableTitle,
    isDataVisibility,
    isCloning,
    clickAwayAction,
    fetchStoredRequestAction: () =>
      fetchStoredEconomicsDataRequestAction(currentProjectId),
  };

  return <StoredDataRoute {...props} />;
}
