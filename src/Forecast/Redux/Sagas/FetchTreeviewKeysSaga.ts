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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingForecastResultsSuccessFailureDialogParameters";
import {
  fetchTreeviewKeysFailureAction,
  fetchTreeviewKeysSuccessAction,
  TREEVIEWKEYS_REQUEST,
} from "../Actions/ForecastActions";

export default function* watchFetchTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(TREEVIEWKEYS_REQUEST);
  yield takeLeading(treeviewKeysChan, fetchTreeviewKeysSaga);
}

const config = { withCredentials: false };
const fetchTreeviewKeysAPI = (url: string) => authService.get(url, config);

function* fetchTreeviewKeysSaga(
  action: IAction
): Generator<
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
  const { selectedForecastingResultsId: forecastId } = yield select(
    (state) => state.forecastReducer
  );
  const forecastResultsUrl = `${getBaseUrl()}/treeview/${forecastId}`;

  try {
    const forecastResults = yield call(
      fetchTreeviewKeysAPI,
      forecastResultsUrl
    );
    const {
      data: {
        data: { tree: forecastTree, keys: forecastKeys },
      }, //prevent 2nd trip to server
    } = forecastResults;

    const successAction = fetchTreeviewKeysSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastTree,
        forecastKeys,
      },
    });
  } catch (errors) {
    const failureAction = fetchTreeviewKeysFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
