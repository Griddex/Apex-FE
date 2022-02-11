import { AxiosResponse } from "axios";
import zipObject from "lodash.zipobject";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import DialogCancelButton from "../../Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../Components/DialogButtons/DialogOkayButton";
import { failureDialogParameters } from "../../Components/DialogParameters/GetTableDataByIdFailureDialogParameters";
import { DialogStuff } from "../../Components/Dialogs/DialogTypes";
import * as authService from "../../Services/AuthService";
import { IAction } from "../Actions/ActionTypes";
import {
  getTableDataByIdFailureAction,
  getTableDataByIdSuccessAction,
  GET_TABLEDATABYID_REQUEST,
} from "../Actions/ApplicationActions";
import { showDialogAction } from "../Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../Actions/UISpinnerActions";

export default function* watchGetTableDataByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getTableDataByIdChan = yield actionChannel(GET_TABLEDATABYID_REQUEST);
  yield takeLeading(getTableDataByIdChan, getTableDataByIdSaga);
}

const config = { withCredentials: false };
const getTableDataByIdAPI = (url: string) => authService.get(url, config);

function* getTableDataByIdSaga(action: IAction): Generator<
  | CallEffect<AxiosResponse>
  | PutEffect<{
      payload: any;
      type: string;
    }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    reducer,
    tableDataUrl,
    tableTitle,
    workflowProcess,
    tableOrSuccessDialog,
    collectionName,
  } = payload;
  console.log(
    "🚀 ~ file: GetTableDataByIdSaga.ts ~ line 62 ~ collectionName",
    collectionName
  );

  try {
    yield put(showSpinnerAction("Loading..."));

    const tableDataResults = yield call(getTableDataByIdAPI, tableDataUrl);

    const {
      data: {
        data: { data, units },
      },
    } = tableDataResults;
    console.log("🚀 ~ file: GetTableDataByIdSaga.ts ~ line 71 ~ units", units);
    console.log("🚀 ~ file: GetTableDataByIdSaga.ts ~ line 71 ~ data", data);

    let selectedTableData = [] as any[];
    if (reducer === "visualyticsReducer") {
      const selectedData = data[collectionName];
      const newHeaders = Object.values(selectedData[0]) as string[];

      selectedTableData = selectedData
        .slice(1)
        .map((row: any) => zipObject(newHeaders, Object.values(row)));
    } else {
      selectedTableData = data[collectionName];
    }

    const selectedTableDataWithUnits = [units, ...selectedTableData];
    const successAction = getTableDataByIdSuccessAction();

    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData: selectedTableDataWithUnits,
      },
    });

    let dialogParameters = {} as DialogStuff;
    if (tableOrSuccessDialog === "table") {
      dialogParameters = {
        name: "Display_Table_Data_Dialog",
        title: tableTitle,
        type: "tableDataDialog",
        show: true,
        exclusive: true,
        maxWidth: "lg",
        iconType: "information",
        actionsList: () => DialogCancelButton(),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
        reducer,
        workflowProcess,
      };
    } else {
      dialogParameters = {
        name: "Get_ForecastInputDeck_Success_Dialog",
        title: "Forecast Input Deck Success",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Forecast input deck was successfully fetched!`,
        iconType: "success",
        actionsList: () => DialogOkayButton([true], [false], [() => {}]),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };
    }

    yield put(showDialogAction(dialogParameters));
  } catch (errors) {
    const failureAction = getTableDataByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
