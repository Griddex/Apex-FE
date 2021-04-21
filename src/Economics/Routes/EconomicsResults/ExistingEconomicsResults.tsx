import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IApplicationExistingData,
} from "../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../../../Import/Routes/Common/InputWorkflows/ExistingDataRoute";
import { IExistingDataRow } from "./../../../Application/Types/ApplicationTypes";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingEconomicsResults({
  reducer,
  containerStyle,
}: IExistingDataProps) {
  const dispatch = useDispatch();
  const wc = "existingDataWorkflows";
  const wp = "economicsResultsExisting" as NonNullable<
    IExistingDataProps["wkPs"]
  >;

  const existingData = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snExistingData: IExistingDataRow[] = existingData.map(
    (row: IApplicationExistingData, i: number) => ({
      sn: i + 1,
      id: row.id,
      status: "Not Started",
      title: row.title,
      description: row.description,
      author: "---",
      approvers: "--",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "TITLE";

  const props = {
    reducer,
    snExistingData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    wkPs: wp,
    containerStyle,
  };

  return <ExistingDataRoute {...props} />;
}
