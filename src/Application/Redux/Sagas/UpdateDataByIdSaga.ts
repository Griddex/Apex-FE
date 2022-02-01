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
import {
  updateFailureDPs,
  updateSuccessDPs,
} from "../../Components/DialogParameters/UpdateDataSuccessFailureDialogParameters";
import * as authService from "../../Services/AuthService";
import { IAction } from "../Actions/ActionTypes";
import {
  updateDataByIdFailureAction,
  updateDataByIdSuccessAction,
  UPDATE_DATABYID_REQUEST,
} from "../Actions/ApplicationActions";
import { showDialogAction } from "../Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../Actions/UISpinnerActions";

export default function* watchUpdateDataByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const updateDataByIdChan = yield actionChannel(UPDATE_DATABYID_REQUEST);
  yield takeLeading(updateDataByIdChan, updateDataByIdSaga);
}

function* updateDataByIdSaga(action: IAction): Generator<
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
  const { reducer, updateDataUrl, titleDesc, fetchStoredRequestAction } =
    payload;

  const { currentProjectId } = yield select((state) => state.projectReducer);

  const { title, description } = titleDesc;
  const data = {
    title,
    description,
    projectId: currentProjectId,
  };

  const config = { withCredentials: false };
  const updateDataByIdAPI = (url: string) =>
    authService.updateData(url, data, config);

  try {
    yield put(showSpinnerAction("Updating..."));

    const updateResults = yield call(updateDataByIdAPI, updateDataUrl);
    const {
      data: { success: updateSuccess },
    } = updateResults;

    const successAction = updateDataByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        updateSuccess,
      },
    });

    yield put(fetchStoredRequestAction());

    yield put(showDialogAction(updateSuccessDPs()));
  } catch (errors) {
    const failureAction = updateDataByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(updateFailureDPs()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
