import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import {
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import {
  IStoredDataRow,
  IStoredDeck,
} from "../../Application/Types/ApplicationTypes";
import { fetchStoredProjectsRequestAction } from "../Redux/Actions/ProjectActions";
import { IApplicationProject } from "../Redux/State/ProjectStateTypes";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";

const StoredDataRoute = React.lazy(
  () => import("../../Import/Routes/Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const storedProjectsSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.storedProjects,
  (projects) => projects
);

export default function StoredProjects({
  reducer,
  containerStyle,
}: Partial<IStoredDeck>) {
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

  const fetchStoredRequestAction = () => fetchStoredProjectsRequestAction();

  const updateTableActionConfirmation =
    (id: string) => (titleDesc: Record<string, string>) => {
      const updateDataUrl = `${mainUrl}/${id}`;

      const confirmationDialogParameters: DialogStuff = {
        name: "Update_Data_Dialog_Confirmation",
        title: `Update Confirmation`,
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to proceed with this update?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogOneCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () =>
                updateDataByIdRequestAction(
                  reducer as ReducersType,
                  updateDataUrl as string,
                  titleDesc,
                  fetchStoredRequestAction as () => IAction
                ),
            ],
            "Update",
            "updateOutlined",
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(confirmationDialogParameters));
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
    updateTableActionConfirmation,
  };

  return <StoredDataRoute {...props} />;
}
