import { AxiosResponse } from "axios";
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
import * as authService from "../../Services/AuthService";
import { IAction } from "../Actions/ActionTypes";
import {
  deleteDataByIdFailureAction,
  deleteDataByIdSuccessAction,
  DELETE_DATABYID_REQUEST,
} from "../Actions/ApplicationActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchDeleteDataByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const deleteDataByIdChan = yield actionChannel(DELETE_DATABYID_REQUEST);
  yield takeLeading(deleteDataByIdChan, deleteDataByIdSaga);
}

const config = { withCredentials: false };
const deleteDataByIdAPI = (url: string) => authService.deleteData(url, config);
const fetchStoredDataAPI = (url: string) => authService.get(url, config);

function* deleteDataByIdSaga(action: IAction): Generator<
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
    fetchStoredUrl,
    fetchStoredSuccessAction,
    dataStored,
  } = payload;

  try {
    const deleteResults = yield call(deleteDataByIdAPI, tableDataUrl);
    const {
      data: { success: deleteSuccess },
    } = deleteResults;

    const successAction = deleteDataByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        deleteSuccess,
      },
    });

    const fetchResults = yield call(fetchStoredDataAPI, fetchStoredUrl);
    const {
      data: { data },
    } = fetchResults;

    const fetchSuccessAction = fetchStoredSuccessAction();
    yield put({
      ...fetchSuccessAction,
      payload: {
        ...payload,
        [dataStored]: data,
      },
    });
  } catch (errors) {
    const failureAction = deleteDataByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    // yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
