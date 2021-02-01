import React from "react";
import { useSelector } from "react-redux";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IExistingDataRow,
  IGiftExistingData,
} from "../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../Common/InputWorkflows/ExistingDataRoute";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingProductionData({
  finalAction,
}: {
  finalAction: () => void;
}) {
  const workflowCategory = "existingDataWorkflows";
  // const workflowProcess = "productionInputDataExisting" as NonNullable<
  //   IExistingDataProps["wrkflwPrcss"]
  // >;
  const workflowProcess: NonNullable<IExistingDataProps["wrkflwPrcss"]> =
    "productionInputDataExisting";
  const existing = useSelector((state: RootState) => state.inputReducer);
  existing.existingDataWorkflows;
  const existingData = useSelector(
    (state: RootState) => state.inputReducer[workflowCategory][workflowProcess]
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
  const dataTitle = "PRODUCTION DATA TITLE";

  const props = {
    workflowProcess,
    snExistingData,
    dataKey,
    dataTitle,
    tableOptions,
    chartData,
  };

  return <ExistingDataRoute {...props} />;
}
