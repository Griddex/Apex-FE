import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IApplicationExistingData,
} from "../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../Common/InputWorkflows/ExistingDataRoute";
import { IExistingInputDeck } from "../InputDeckTypes";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingFacilitiesDecks({
  reducer,
  containerStyle,
  finalAction,
  showChart,
}: IExistingInputDeck) {
  const dispatch = useDispatch();

  const wc = "existingDataWorkflows";
  const wp: NonNullable<IExistingDataProps["wkPs"]> =
    "facilitiesInputDeckExisting";
  const existingData = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snExistingData =
    existingData &&
    existingData.map((row: IApplicationExistingData, i: number) => ({
      sn: i + 1,
      id: row.id,
      status: "Not Started",
      title: row.title,
      description: row.description,
      author: "---",
      approvers: ["--", "--"],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    }));

  const dataKey = "title";
  const dataTitle = "FACILITIES DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;
    console.log(
      "Logged output --> ~ file: ExistingFacilitiesDecks.tsx ~ line 59 ~ handleCheckboxChange ~ row",
      row
    );

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedFacilitiesInputDeckId: id,
          selectedFacilitiesInputDeckTitle: title,
        })
      );
  };

  const props: IExistingDataProps = {
    wkPs: wp,
    snExistingData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    showChart,
    containerStyle,
    handleCheckboxChange,
  };

  return <ExistingDataRoute {...props} />;
}
