import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../Common/InputWorkflows/ExistingDataRoute";
import { IExistingInputDeck } from "../InputDeckTypes";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];
type wpTypeNon = NonNullable<IExistingDataProps["wkPs"]>;
// type wpType = Omit<wpTypeNon, "">;

export default function ExistingProductionData({
  reducer,
  finalAction,
}: IExistingInputDeck) {
  const dispatch = useDispatch();

  const wc = "existingDataWorkflows";
  const wp: wpTypeNon = "productionInputDataExisting";
  // const wp = "productionInputDataExisting" as wpType;
  // const wp = "productionInputDataExisting" as Omit<NonNullable<
  //   IExistingDataProps["wkPs"]
  // >,"">;

  const existing = useSelector((state: RootState) => state.inputReducer);
  //existing.existingDataWorkflows;
  // const existingData = useSelector(
  //   (state: RootState) => state.inputReducer[wc]
  // );
  const existingData = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snExistingData: IExistingDataRow[] = existingData.map(
    (row: any, i: number) => {
      const data: IExistingDataRow = {
        sn: i + 1,
        id: row.id,
        status: "Not Started",
        title: row.title,
        description: row.description,
        author: "---",
        approvers: "None",
        createdOn: row.createdAt,
        modifiedOn: row.createdAt,
      };

      return data;
    }
  );

  const dataKey = "title";
  const dataTitle = "PRODUCTION DATA TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    //TODO: Doesnt exist yet
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
    snExistingData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    handleCheckboxChange,
  };

  return <ExistingDataRoute {...props} />;
}
