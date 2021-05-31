import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import { failureDialogParameters } from "../../Components/DialogParameters/GetTableDataByIdFailureDialogParameters";
import * as authService from "../../Services/AuthService";
import { IAction } from "../Actions/ActionTypes";
import {
  getTableDataByIdFailureAction,
  GET_TABLEDATABYID_REQUEST,
} from "../Actions/ApplicationActions";
import { showDialogAction } from "../Actions/DialogsAction";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

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
  const { reducer, tableDataUrl, getTableDataByIdSuccessAction } = payload;

  try {
    const tableDataResults = yield call(getTableDataByIdAPI, tableDataUrl);

    const {
      data: { data: tableData }, //prevent 2nd trip to server
    } = tableDataResults;

    const successAction = getTableDataByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        tableData,
      },
    });
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
