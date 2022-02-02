import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  unloadDialogsAction,
  showDialogAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
  IStoredDeck,
} from "../../../Application/Types/ApplicationTypes";
import { fetchStoredInputDeckRequestAction } from "../../Redux/Actions/StoredInputDeckActions";
import StoredDataRoute from "../Common/InputWorkflows/StoredDataRoute";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

export default function StoredFacilitiesDecks({
  reducer,
  containerStyle,
  showChart,
}: IStoredDeck) {
  const currentProjectId = useSelector(currentProjectIdSelector);

  const tableTitle = "Facilities InputDeck Table";
  const mainUrl = `${getBaseForecastUrl()}/facilities-inputdeck`;
  const collectionName = "InputDeckEntities";

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> = "facilitiesInputDeckStored";

  const facilitiesInputDeckStoredSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc]["facilitiesInputDeckStored"],
    (stored) => stored
  );
  const facilitiesInputDeckStored = useSelector(
    facilitiesInputDeckStoredSelector
  );

  const componentRef = React.useRef();

  const snStoredData =
    facilitiesInputDeckStored &&
    facilitiesInputDeckStored.map(
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
  const dataTitle = "FACILITIES DECK TITLE";

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedFacilitiesInputDeckId: id,
          selectedFacilitiesInputDeckTitle: title,
        })
      );
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("inputReducer", {
          selectedFacilitiesInputDeckId: "",
          selectedFacilitiesInputDeckTitle: "",
        })
      );
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
      fetchStoredInputDeckRequestAction(currentProjectId),
    updateTableActionConfirmation,
  };

  return (
    <StoredDataRoute
      {...props}
      ref={componentRef as React.MutableRefObject<any>}
    />
  );
}
