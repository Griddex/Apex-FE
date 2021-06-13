import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../InputDeckTypes";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];
type wpTypeNon = NonNullable<IStoredDataProps["wkPs"]>;
// type wpType = Omit<wpTypeNon, "">;

export default function StoredProductionData({
  reducer,
  finalAction,
}: IStoredInputDeck) {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const wp: wpTypeNon = "productionInputDataStored";
  // const wp = "productionInputDataStored" as wpType;
  // const wp = "productionInputDataStored" as Omit<NonNullable<
  //   IStoredDataProps["wkPs"]
  // >,"">;

  const stored = useSelector((state: RootState) => state.inputReducer);
  //stored.storedDataWorkflows;
  // const storedData = useSelector(
  //   (state: RootState) => state.inputReducer[wc]
  // );
  const storedData = useSelector((state: RootState) => state[reducer][wc][wp]);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snStoredData = storedData.map((row: any, i: number) => {
    const data: IStoredDataRow = {
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: "None",
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
    tableButtons,
    chartData,
    handleCheckboxChange,
  };

  return <StoredDataRoute {...props} />;
}
