import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import ExistingDataRoute from "../../Import/Routes/Common/InputWorkflows/ExistingDataRoute";
import { IGiftProject } from "../Redux/State/ProjectStateTypes";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingProjects({
  containerStyle,
}: {
  containerStyle: CSSProperties;
}) {
  const dispatch = useDispatch();

  const { existingProjects } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const snExistingData = (existingProjects as IGiftProject[]).map(
    (row: IGiftProject, i: number) => ({
      sn: i + 1,
      id: row.id,
      title: row.title,
      description: row.description,
      author: "---",
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
    tableButtons,
    chartData,
    containerStyle,
  };

  return <ExistingDataRoute {...props} />;
}
