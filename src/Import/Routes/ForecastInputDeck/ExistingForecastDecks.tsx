import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import formatDate from "../../../Application/Utils/FormatDate";
import {
  shirleyImg,
  anitaImg,
  glenImg,
  kerryImg,
  johnImg,
} from "../../Utils/iconImages";
import { IExistingDataRow } from "../Common/InputLayoutTypes";
import ExistingDataWorkflow from "../Common/InputWorkflows/ExistingDataWorkflow";

//TODO: API saga to get entire units object from server
const forecastList: IExistingDataRow[] = [
  {
    status: "Approved",
    title: "ARPR_NETWORK DIAGRAM 2020",
    description: "ARPR_NETWORK DIAGRAM 2020",
    author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { avatarUrl: anitaImg, name: "Anita Stragan" },
      { avatarUrl: glenImg, name: "Glen Moore John III" },
      { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    status: "Pending",
    title: "ARPR_NETWORK DIAGRAM 2019",
    description: "ARPR_NETWORK DIAGRAM 2019",
    author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { avatarUrl: anitaImg, name: "Anita Stragan" },
      { avatarUrl: glenImg, name: "Glen Moore John III" },
      { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    status: "Returned",
    title: "ARPR_NETWORK DIAGRAM 2018",
    description: "ARPR_NETWORK DIAGRAM 2018",
    author: { avatarUrl: johnImg, name: "John Bravo" },
    approvers: [
      { avatarUrl: anitaImg, name: "Anita Stragan" },
      { avatarUrl: glenImg, name: "Glen Moore John III" },
      { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
];

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingForecastDecks({
  workflowProcess,
}: {
  workflowProcess: IWorkflowProcess["workflowProcess"];
}) {
  const dispatch = useDispatch();
  const existingData = useSelector(
    (state: RootState) =>
      state.importReducer["existingDataWorkflows"][workflowProcess]
  ) as IExistingDataRow[];

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

  const snExistingData = existingData.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "forecastKey";
  const dataTitle = "FORECAST DECK TITLE";

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
