import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  IApplicationExistingDataRow,
  IExistingDataProps,
} from "../../Application/Types/ApplicationTypes";
import ExistingDataRoute from "../../Import/Routes/Common/InputWorkflows/ExistingDataRoute";
import { IExistingNetworks } from "./ExistingNetworkTypes";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingDeclineParameters({
  workflowProcess,
  containerStyle,
}: IExistingDataProps) {
  const dispatch = useDispatch();
  const wc = "existingDataWorkflows";
  const wp = workflowProcess as NonNullable<
    IExistingDataProps["workflowProcess"]
  >;

  const existingData = useSelector(
    (state: RootState) => state.networkReducer[wc][wp]
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snExistingData = existingData.map(
    (row: IApplicationExistingDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      status: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: ["--", "--"],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "DECLINE PARAMETERS TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("networkReducer", {
          selectedDeclineParametersId: id,
          selectedDeclineParametersTitle: title,
        })
      );
  };

  const props = {
    snExistingData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    wkPs: wp,
    containerStyle,
    handleCheckboxChange,
  };

  return <ExistingDataRoute {...props} />;
}
