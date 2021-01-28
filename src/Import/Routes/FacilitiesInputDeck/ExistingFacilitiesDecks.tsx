import React from "react";
import { useSelector } from "react-redux";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
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

export default function ExistingFacilitiesDecks({
  workflowProcess,
  finalAction,
}: {
  workflowProcess: NonNullable<IExistingDataProps["workflowProcess"]>;
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
  const dataTitle = "FACILITIES DECK TITLE";

  const props = {
    snExistingData,
    dataKey,
    dataTitle,
    tableOptions,
    chartData,
  };

  return <ExistingDataRoute {...props} />;
}
