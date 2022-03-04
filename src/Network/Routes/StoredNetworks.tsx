import { useTheme } from "@mui/material";
import React from "react";
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
import { IApplicationStoredDataRow } from "../../Application/Types/ApplicationTypes";
import { fetchStoredNetworkDataRequestAction } from "../Redux/Actions/NetworkActions";
import { IStoredNetworks } from "./StoredNetworkTypes";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import {
  unloadDialogsAction,
  showDialogAction,
} from "../../Application/Redux/Actions/DialogsAction";

const StoredDataRoute = React.lazy(
  () => import("../../Import/Routes/Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

export default function StoredNetworks({
  workflowProcess,
  containerStyle,
}: IStoredNetworks) {
  const reducer = "networkReducer";
  const wc = "storedDataWorkflows";
  const wp = workflowProcess;
  const collectionName = "declineParameters";
  const mainUrl = `${getBaseForecastUrl()}/network`;

  const currentProjectId = useSelector(currentProjectIdSelector);

  const dispatch = useDispatch();

  const networkStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.networkReducer[wc]["networkStored"],
    (stored) => stored
  );

  const networkStored = useSelector(networkStoredSelector);

  const snStoredData = networkStored.map(
    (row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  );

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

  const dataKey = "title";
  const dataTitle = "NETWORK TITLE";

  const handleCheckboxChange = (row: any) => {
    console.log("row: ", row);
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("networkReducer", {
          selectedNetworkId: id,
          selectedNetworkTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("networkReducer", {
          selectedNetworkId: "",
          selectedNetworkTitle: "",
        })
      );
  };

  const fetchStoredRequestAction = () =>
    fetchStoredNetworkDataRequestAction(currentProjectId);

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
                  reducer,
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
    wkPs: wp,
    containerStyle,
    collectionName,
    handleCheckboxChange,
    // clickAwayAction,
    mainUrl,
    fetchStoredRequestAction: () =>
      fetchStoredNetworkDataRequestAction(currentProjectId),
    updateTableActionConfirmation,
  };

  return <StoredDataRoute {...props} />;
}
