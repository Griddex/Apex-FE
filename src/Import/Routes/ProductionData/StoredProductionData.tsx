import { useTheme } from "@mui/material";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataProps,
  IStoredDataRow,
  IStoredDeck,
} from "../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../Common/InputWorkflows/StoredDataRoute";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

type wpTypeNon = NonNullable<IStoredDataProps["wkPs"]>;
// type wpType = Omit<wpTypeNon, "">;

export default function StoredProductionData({
  reducer,
  finalAction,
}: IStoredDeck) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const collectionName = "declineParameters";

  const wc = "storedDataWorkflows";
  const wp: wpTypeNon = "productionInputDataStored";

  const productionInputDataStoredSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp],
    (data) => data
  );
  const storedData = useSelector(productionInputDataStoredSelector);

  const snStoredData = storedData?.map((row: any, i: number) => {
    const data: IStoredDataRow = {
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    };

    return data;
  }) as IStoredDataRow[];

  const dataKey = "title";
  const dataTitle = "PRODUCTION DATA TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          productionInputDeckId: id,
          productionInputDeckTitle: title,
        })
      );
  };

  const props = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
    collectionName,
    handleCheckboxChange,
  };

  return <StoredDataRoute {...props} />;
}
