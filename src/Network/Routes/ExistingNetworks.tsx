import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IGiftExistingData,
} from "../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../../Import/Routes/Common/InputWorkflows/ExistingDataRoute";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingNetworks({
  workflowProcess,
}: {
  workflowProcess: NonNullable<IExistingDataProps["wkPs"]>;
}) {
  const dispatch = useDispatch();
  const wc = "existingDataWorkflows";
  const wp = workflowProcess;

  const existingData = useSelector(
    (state: RootState) => state.networkReducer[wc][wp]
  );

  const tableOptions: ITableIconsOptions = {
    sort: {
      show: true,
    },
    filter: {
      show: true,
    },
    save: {
      show: true,
      action: () => {
        alert("Save table icon");
      },
    },
  };

  const snExistingData = existingData.map(
    (row: IGiftExistingData, i: number) => ({
      sn: i + 1,
      id: row.id,
      status: "Not Started",
      title: row.title,
      description: row.description,
      author: "---",
      approvers: ["--", "--"],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "NETWORK TITLE";

  const props = {
    snExistingData,
    dataKey,
    dataTitle,
    tableOptions,
    chartData,
    wkPs: wp,
  };

  return <ExistingDataRoute {...props} />;
}
