import React from "react";
import { useSelector } from "react-redux";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IGiftExistingData,
} from "../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../Common/InputWorkflows/ExistingDataRoute";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingEconomicsParametersDecks({
  finalAction,
}: {
  finalAction: () => void;
}) {
  const workflowCategory = "existingDataWorkflows";
  const workflowProcess: NonNullable<IExistingDataProps["wrkflwPrcss"]> =
    "economicsInputDataExisting";
  const existingData = useSelector(
    (state: RootState) =>
      state.economicsReducer[workflowCategory][workflowProcess]
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
      author: "None",
      approvers: ["None", "None"],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  const dataKey = "title";
  const dataTitle = "ECONOMIC PARAMETERS TITLE";

  const props: IExistingDataProps = {
    workflowProcess,
    snExistingData,
    dataKey,
    dataTitle,
    chartData,
    tableOptions,
  };

  return <ExistingDataRoute {...props} />;
  // return <div>Hello</div>;
}
