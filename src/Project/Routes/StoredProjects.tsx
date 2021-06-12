import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import StoredDataRoute from "../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import { IGiftProject } from "../Redux/State/ProjectStateTypes";

const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function StoredProjects({
  containerStyle,
}: {
  containerStyle: CSSProperties;
}) {
  const dispatch = useDispatch();

  const { storedProjects } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  //TODO: Tell Gift to pass in createdAt
  const snStoredData = (storedProjects as IGiftProject[]).map(
    (row: IGiftProject, i: number) => ({
      sn: i + 1,
      id: row.id,
      title: row.title,
      description: row.description,
      approval: "Not Started",
      author: { avatarUrl: "", name: "None" },
      approvers: "---",
      // createdOn: row.createdAt,
      createdOn: "11th February, 2021",
      // modifiedOn: row.createdAt,
      modifiedOn: "11th February, 2021",
    })
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const dataKey = "title";
  const dataTitle = "PROJECT TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("projectReducer", {
          selectedProjectId: id,
          selectedProjectTitle: title,
        })
      );
  };

  const props = {
    snStoredData,
    dataKey,
    dataTitle,
    tableButtons,
    chartData,
    containerStyle,
    handleCheckboxChange,
  };

  return <StoredDataRoute {...props} />;
}
