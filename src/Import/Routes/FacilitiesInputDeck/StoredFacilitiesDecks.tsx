import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
} from "../../../Application/Types/ApplicationTypes";
import { fetchStoredInputDeckRequestAction } from "../../Redux/Actions/StoredInputDeckActions";
import { IStoredInputDeck } from "../InputDeckTypes";

const StoredDataRoute = React.lazy(
  () => import("../Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

export default function StoredFacilitiesDecks({
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

  const tableTitle = "Facilities InputDeck Table";
  const mainUrl = `${getBaseForecastUrl()}/facilities-inputdeck`;
  const collectionName = "InputDeckEntities";

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> = "facilitiesInputDeckStored";

  const facilitiesInputDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc]["facilitiesInputDeckStored"],
    (stored) => stored
  );
  const facilitiesInputDeckStored = useSelector(
    facilitiesInputDeckStoredSelector
  );
  console.log(
    "🚀 ~ file: StoredFacilitiesDecks.tsx ~ line 73 ~ facilitiesInputDeckStored",
    facilitiesInputDeckStored
  );
  console.log("IsArray: ", Array.isArray(facilitiesInputDeckStored));

  const componentRef = React.useRef();

  const snStoredData =
    facilitiesInputDeckStored &&
    facilitiesInputDeckStored.map(
      (row: IApplicationStoredDataRow, i: number) => ({
        sn: i + 1,
        id: row.id,
        approval: "Not Started",
        title: row.title,
        description: row.description,
        author: { avatarUrl: "", name: "None" },
        approvers: [{ avatarUrl: "", name: "" }],
        createdOn: row.createdAt,
        modifiedOn: row.createdAt,
      })
    );

  const dataKey = "title";
  const dataTitle = "FACILITIES DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedFacilitiesInputDeckId: id,
          selectedFacilitiesInputDeckTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedFacilitiesInputDeckId: "",
          selectedFacilitiesInputDeckTitle: "",
        })
      );
  };

  const isDataVisibility = true;
  const isCloning = false;

  const props: IStoredDataProps = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
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
      fetchStoredInputDeckRequestAction(currentProjectId),
  };

  return (
    <StoredDataRoute
      {...props}
      ref={componentRef as React.MutableRefObject<any>}
    />
  );
}
