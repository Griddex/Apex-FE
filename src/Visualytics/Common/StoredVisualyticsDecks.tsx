import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import {
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseVisualyticsUrl } from "../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
} from "../../Application/Types/ApplicationTypes";
import { IStoredInputDeck } from "../../Import/Routes/InputDeckTypes";
import { fetchStoredVisualyticsDataRequestAction } from "../Redux/Actions/VisualyticsActions";

const StoredDataRoute = React.lazy(
  () => import("../../Import/Routes/Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

export default function StoredVisualyticsDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredInputDeck) {
  const theme = useTheme();

  //TODO: Calculate classification data from collection
  const chartData = [
    {
      id: "A",
      label: "A",
      value: 2400,
      color: theme.palette.primary.main,
    },
    {
      id: "B",
      label: "B",
      value: 4567,
      color: theme.palette.success.main,
    },
    {
      id: "C",
      label: "C",
      value: 1398,
      color: theme.palette.secondary.main,
    },
  ];

  const currentProjectId = useSelector(currentProjectIdSelector);

  const tableTitle = "Visualytics InputDeck Table";
  const mainUrl = `${getBaseVisualyticsUrl()}`;
  const collectionName = "inputDeck";

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp = "visualyticsDeckStored";

  const visualyticsDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) => state.visualyticsReducer[wc]["visualyticsDeckStored"],
    (stored) => stored
  );

  const visualyticsDeckStored = useSelector(visualyticsDeckStoredSelector);

  const componentRef = React.useRef();

  const snStoredData =
    visualyticsDeckStored &&
    (visualyticsDeckStored.map((row: IApplicationStoredDataRow, i: number) => ({
      sn: i + 1,
      id: row.id,
      approval: "Not Started",
      title: row.title,
      description: row.description,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })) as IStoredDataProps["snStoredData"]);

  const dataKey = "title";
  const dataTitle = "VISUALYTICS DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("visualyticsReducer", {
          selectedVisualyticsId: id,
          selectedVisualyticsTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("visualyticsReducer", {
          selectedVisualyticsId: "",
          selectedVisualyticsTitle: "",
        })
      );
  };

  const fetchStoredRequestAction = () =>
    fetchStoredVisualyticsDataRequestAction(currentProjectId);

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

  const isDataVisibility = true;
  const isCloning = false;

  const props: IStoredDataProps = {
    wkPs: wp,
    snStoredData,
    dataKey,
    dataTitle,
    chartData,
    showChart,
    containerStyle,
    handleCheckboxChange,
    reducer,
    collectionName,
    mainUrl,
    tableTitle,
    isDataVisibility,
    isCloning,
    clickAwayAction,
    fetchStoredRequestAction: () =>
      fetchStoredVisualyticsDataRequestAction(currentProjectId),
    updateTableActionConfirmation,
  };

  return (
    <StoredDataRoute
      {...props}
      ref={componentRef as React.MutableRefObject<any>}
    />
  );
}
