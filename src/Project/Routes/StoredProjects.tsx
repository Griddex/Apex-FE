import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import { IStoredDataRow } from "../../Application/Types/ApplicationTypes";
import StoredDataRoute from "../../Import/Routes/Common/InputWorkflows/StoredDataRoute";
import {
  fetchStoredProjectsRequestAction,
  fetchStoredProjectsSuccessAction,
} from "../Redux/Actions/ProjectActions";
import { IApplicationProject } from "../Redux/State/ProjectStateTypes";

export default function StoredProjects({
  containerStyle,
}: {
  containerStyle: CSSProperties;
}) {
  const mainUrl = `${getBaseForecastUrl()}/project`;
  const fetchStoredUrl = `${getBaseForecastUrl()}/project/recents/20`;
  const dataStored = "storedProjects";

  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const { storedProjects } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
    componentRef,
  };

  const snStoredData = (storedProjects as IApplicationProject[]).map(
    (row, i: number) => ({
      sn: i + 1,
      id: row.id,
      title: row.title,
      description: row.description,
      approval: "Not Started",
      author: { avatarUrl: "", name: "None" },
      approvers: "---",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  ) as IStoredDataRow[];

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

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("projectReducer", {
          selectedProjectId: "",
          selectedProjectTitle: "",
        })
      );
  };

  const props = {
    snStoredData,
    dataKey,
    dataTitle,
    tableButtons,
    containerStyle,
    handleCheckboxChange,
    clickAwayAction,
    mainUrl,
    fetchStoredRequestAction: fetchStoredProjectsRequestAction,
  };

  return <StoredDataRoute {...props} />;
}
