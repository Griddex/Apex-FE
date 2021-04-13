import React from "react";
import { useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IApplicationExistingData,
  IExistingDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../../../../Import/Routes/Common/InputWorkflows/ExistingDataRoute";
import { IExistingInputDeck } from "../../../../Import/Routes/InputDeckTypes";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingCostsAndRevenuesDecks({
  containerStyle,
  finalAction,
  showChart,
}: IExistingInputDeck) {
  const wc = "existingDataWorkflows";
  const wp: NonNullable<IExistingDataProps["wkPs"]> =
    "economicsCostsRevenuesDeckExisting";
  const existingData: IExistingDataRow[] = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snExistingData: IExistingDataRow[] =
    existingData &&
    existingData.map((row: IApplicationExistingData, i: number) => ({
      sn: i + 1,
      id: row.id,
      status: "Not Started",
      title: row.title,
      description: row.description,
      author: "---",
      approvers: '"--", "--"',
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    }));

  const dataKey = "title";
  const dataTitle = "COSTS & REVENUE TITLE";

  const props: IExistingDataProps = {
    wkPs: wp,
    snExistingData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    showChart,
    containerStyle,
  };

  return <ExistingDataRoute {...props} />;
}
