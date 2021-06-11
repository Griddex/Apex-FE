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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingForecastResultsSuccessFailureDialogParameters";
import {
  EXISTINGFORECASTINGRESULTS_REQUEST,
  fetchExistingForecastingResultsFailureAction,
  fetchExistingForecastingResultsSuccessAction,
} from "../Actions/ForecastActions";

export default function* watchFetchExistingForecastingResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingForecastingResultsChan = yield actionChannel(
    EXISTINGFORECASTINGRESULTS_REQUEST
  );
  yield takeLeading(
    existingForecastingResultsChan,
    fetchExistingForecastingResultsSaga
  );
}

const config = { withCredentials: false };
const fetchExistingForecastingResultsAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingForecastingResultsSaga(action: IAction): Generator<
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
  const { projectId } = payload;
  const forecastResultsUrl = `${getBaseForecastUrl()}/forecastResults/light/${projectId}`;

  try {
    const forecastResults = yield call(
      fetchExistingForecastingResultsAPI,
      forecastResultsUrl
    );

    const {
      data: { data: forecastResultsExisting },
    } = forecastResults;

    const successAction = fetchExistingForecastingResultsSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastResultsExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingForecastingResultsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
    yield put(hideSpinnerAction());
  }
}
