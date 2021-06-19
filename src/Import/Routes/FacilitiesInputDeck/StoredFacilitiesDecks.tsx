import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import {
  IStoredDataProps,
  IApplicationStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../InputDeckTypes";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredFacilitiesDecks({
  reducer,
  containerStyle,
  finalAction,
  showChart,
}: IStoredInputDeck) {
  const dispatch = useDispatch();

  const tableTitle = "Facilities InputDeck Table";
  const mainUrl = `${getBaseForecastUrl()}/facilities-inputdeck`;

  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> = "facilitiesInputDeckStored";
  const storedData = useSelector((state: RootState) => state[reducer][wc][wp]);

  const componentRef = React.useRef();

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
    componentRef,
  };

  const snStoredData =
    storedData &&
    storedData.map((row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: ["--", "--"],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    }));

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

  const props: IStoredDataProps = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    showChart,
    containerStyle,
    handleCheckboxChange,
    reducer,
    mainUrl,
    tableTitle,
  };

  return (
    <StoredDataRoute
      {...props}
      ref={componentRef as React.MutableRefObject<any>}
    />
  );
}
