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

export default function ExistingEconomicsParametersDecks({
  containerStyle,
  finalAction,
  showChart,
}: IExistingInputDeck) {
  const wc = "existingDataWorkflows";
  const wp: NonNullable<IExistingDataProps["wkPs"]> =
    "economicsParametersDeckExisting";

  const existingData = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );
  console.log(
    "Logged output --> ~ file: ExistingEconomicsParametersDecks.tsx ~ line 31 ~ existingData",
    existingData
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
  const dataTitle = "ECONOMIC PARAMETERS TITLE";

  const props: IExistingDataProps = {
    wkPs: wp,
    snExistingData,
    dataKey,
    dataTitle,
    chartData,
    tableButtons,
  };

  return <ExistingDataRoute {...props} />;
}
