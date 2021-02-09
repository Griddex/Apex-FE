import React from "react";
import { useSelector } from "react-redux";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  IExistingDataProps,
  IGiftExistingData,
} from "../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../../Import/Routes/Common/InputWorkflows/ExistingDataRoute";
import { IForecastRoutes } from "./ForecastRoutesTypes";

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingForecastResults({
  wrkflwCtgry,
  wrkflwPrcss,
  finalAction,
  showChart,
}: IForecastRoutes) {
  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss as NonNullable<typeof wrkflwPrcss>;

  const existingData = useSelector(
    (state: RootState) => state.inputReducer[wc][wp]
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

  const dataKey = "title";
  const dataTitle = "FORECAST DECK TITLE";

  const props = {
    wkPs: wp,
    snExistingData,
    dataKey,
    dataTitle,
    tableOptions,
    chartData,
    showChart,
  };

  return <ExistingDataRoute {...props} />;
}
