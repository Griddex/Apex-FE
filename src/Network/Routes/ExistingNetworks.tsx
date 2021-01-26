import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IWorkflowProcess } from "../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IExistingDataRow } from "../../Import/Routes/Common/InputLayoutTypes";
import ExistingDataWorkflow from "../../Import/Routes/Common/InputWorkflows/ExistingDataWorkflow";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingNetworks({
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

  const dataKey = "networkKey";
  const dataTitle = "NETWORK TITLE";

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
