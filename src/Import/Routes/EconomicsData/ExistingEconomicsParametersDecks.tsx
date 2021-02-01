import React from "react";
import { useSelector } from "react-redux";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IImportWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../Common/InputWorkflows/ExistingDataRoute";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingEconomicsParametersDecks({
  workflowProcess,
  finalAction,
}: {
  workflowProcess: IImportWorkflowProcess["workflowProcess"];
  finalAction: () => void;
}) {
  const workflowCategory = "existingDataName";
  const { existingData } = useSelector(
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
    (row: IExistingDataRow, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );

  const dataKey = "title";
  const dataTitle = "ECONOMIC PARAMETERS TITLE";

  const props: IExistingDataProps = {
    snExistingData,
    dataKey,
    dataTitle,
    chartData,
    tableOptions,
  };

  return <ExistingDataRoute {...props} />;
  // return <div>Hello</div>;
}