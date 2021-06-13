import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataProps,
  IApplicationStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { IStoredDataRow } from "./../../../Application/Types/ApplicationTypes";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredEconomicsResults({
  reducer,
  containerStyle,
}: IStoredDataProps) {
  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp = "economicsResultsStored" as NonNullable<IStoredDataProps["wkPs"]>;

  const storedData = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snStoredData: IStoredDataRow[] = storedData.map(
    (row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: "--",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "ECONOMICS RESULTS TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          selectedEconomicsResultsId: id,
          selectedEconomicsResultsTitle: title,
        })
      );
  };

  const props = {
    reducer,
    snStoredData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    wkPs: wp,
    containerStyle,
    handleCheckboxChange,
  };

  return <StoredDataRoute {...props} />;
}
