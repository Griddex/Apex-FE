import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataProps,
  IApplicationStoredDataRow,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { IStoredInputDeck } from "../../../../Import/Routes/InputDeckTypes";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredCostsAndRevenuesDecks({
  containerStyle,
  finalAction,
  showChart,
}: IStoredInputDeck) {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> =
    "economicsCostsRevenuesDeckStored";

  const storedData: IStoredDataRow[] = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snStoredData: IStoredDataRow[] =
    storedData &&
    storedData.map((row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      status: "Not Started",
      title: row.title,
      description: row.description,
      developmentScenarios: row?.developmentScenariosCostsRevenue?.join(", "),
      author: { avatarUrl: "", name: "None" },
      // approvers: [{ avatarUrl: "", name: "" }],
      approvers: "----",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    }));

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

  const props: IStoredDataProps = {
    snStoredData,
    dataKey,
    dataTitle,
    tableButtons,
    wkPs: wp,
    chartData,
    showChart,
    containerStyle,
    handleCheckboxChange,
  };

  return <StoredDataRoute {...props} />;
}
