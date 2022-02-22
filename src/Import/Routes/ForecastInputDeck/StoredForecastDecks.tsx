import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import {
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../../Application/Redux/Actions/ApplicationActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
  IStoredDeck,
} from "../../../Application/Types/ApplicationTypes";
import { fetchStoredInputDeckRequestAction } from "../../Redux/Actions/StoredInputDeckActions";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { TReducer } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  unloadDialogsAction,
  showDialogAction,
} from "../../../Application/Redux/Actions/DialogsAction";

const StoredDataRoute = React.lazy(
  () => import("../Common/InputWorkflows/StoredDataRoute")
);

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

export default function StoredForecastDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredDeck) {
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> = "forecastInputDeckStored";

  const storedDataSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp],
    (data) => data
  );

  const storedData = useSelector(storedDataSelector);

  const currentProjectId = useSelector(currentProjectIdSelector);

  const tableTitle = "Forecast InputDeck Table";
  const mainUrl = `${getBaseForecastUrl()}/forecast-inputdeck`;
  const collectionName = "InputDeckEntities";

  const snStoredData = storedData.map(
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

  const dataKey = "title";
  const dataTitle = "FORECAST DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedForecastInputDeckId: id,
          selectedForecastInputDeckTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    // persistSelectedIdTitleAction &&
    //   dispatch(
    //     persistSelectedIdTitleAction("inputReducer", {
    //       selectedForecastInputDeckId: "",
    //       selectedForecastInputDeckTitle: "",
    //     })
    //   );
  };

  const fetchStoredRequestAction = () =>
    fetchStoredInputDeckRequestAction(currentProjectId);

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
                  reducer as TReducer,
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
    showChart,
    containerStyle,
    handleCheckboxChange,
    reducer,
    collectionName,
    mainUrl,
    tableTitle,
    isDataVisibility,
    isCloning,
    // clickAwayAction,
    fetchStoredRequestAction: () =>
      fetchStoredInputDeckRequestAction(currentProjectId),
    updateTableActionConfirmation,
  };

  return <StoredDataRoute {...props} />;
}
