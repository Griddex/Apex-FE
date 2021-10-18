import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IStoredDataRow } from "../../Application/Types/ApplicationTypes";
import { fetchStoredProjectsRequestAction } from "../Redux/Actions/ProjectActions";
import { IApplicationProject } from "../Redux/State/ProjectStateTypes";

const StoredDataRoute = React.lazy(
  () => import("../../Import/Routes/Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const storedProjectsSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.storedProjects,
  (projects) => projects
);

export default function StoredProjects({
  containerStyle,
}: {
  containerStyle: CSSProperties;
}) {
  const mainUrl = `${getBaseForecastUrl()}/project`;
  const collectionName = "declineParameters";

  const dispatch = useDispatch();

  const storedProjects = useSelector(storedProjectsSelector);

  const snStoredData = (storedProjects as IApplicationProject[]).map(
    (row, i: number) => ({
      sn: i + 1,
      id: row.id,
      title: row.title,
      description: row.description,
      approval: "Not Started",
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
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
    containerStyle,
    handleCheckboxChange,
    clickAwayAction,
    collectionName,
    mainUrl,
    fetchStoredRequestAction: fetchStoredProjectsRequestAction,
  };

  return <StoredDataRoute {...props} />;
}
