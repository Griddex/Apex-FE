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
import {
  deleteFailureDPs,
  deleteSuccessDPs,
} from "../../Components/DialogParameters/DeleteDataSuccessFailureDialogParameters";
import * as authService from "../../Services/AuthService";
import { IAction } from "../Actions/ActionTypes";
import {
  deleteDataByIdFailureAction,
  deleteDataByIdSuccessAction,
  DELETE_DATABYID_REQUEST,
} from "../Actions/ApplicationActions";
import { showDialogAction } from "../Actions/DialogsAction";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchDeleteDataByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const deleteDataByIdChan = yield actionChannel(DELETE_DATABYID_REQUEST);
  yield takeLeading(deleteDataByIdChan, deleteDataByIdSaga);
}

const config = {};
const deleteDataByIdAPI = (url: string) => authService.deleteData(url, config);

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
  const { reducer, deleteDataUrl, fetchStoredRequestAction } = payload;

  try {
    const deleteResults = yield call(deleteDataByIdAPI, deleteDataUrl);
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

    yield put(fetchStoredRequestAction());

    yield put(showDialogAction(deleteSuccessDPs()));
  } catch (errors) {
    const failureAction = deleteDataByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(deleteFailureDPs()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
