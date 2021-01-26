import React from "react";
import { useSelector } from "react-redux";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IExistingDataRow } from "../Common/InputLayoutTypes";
import ExistingDataWorkflow from "../Common/InputWorkflows/ExistingDataWorkflow";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingFacilitiesDecks({
  workflowProcess,
  finalAction,
}: {
  workflowProcess: IWorkflowProcess["workflowProcess"];
  finalAction: () => void;
}) {
  const { existingData } = useSelector(
    (state: RootState) =>
      state.importReducer["existingDataWorkflows"][workflowProcess]
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
    (row: IExistingDataRow, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );

  const dataKey = "title";
  const dataTitle = "FACILITIES DECK TITLE";

  const props = {
    workflowProcess,
    snExistingData,
    dataKey,
    dataTitle,
    tableOptions,
    chartData,
  };

  return <ExistingDataWorkflow {...props} />;
}
