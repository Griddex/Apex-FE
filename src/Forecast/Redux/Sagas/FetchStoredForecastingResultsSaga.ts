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
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  STORED_FORECASTINGRESULTS_REQUEST,
  fetchStoredForecastingResultsFailureAction,
  fetchStoredForecastingResultsSuccessAction,
} from "../Actions/ForecastActions";

export default function* watchFetchStoredForecastingResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedForecastingResultsChan = yield actionChannel(
    STORED_FORECASTINGRESULTS_REQUEST
  );
  yield takeLeading(
    storedForecastingResultsChan,
    fetchStoredForecastingResultsSaga
  );
}

const config = { withCredentials: false };
const fetchStoredForecastingResultsAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredForecastingResultsSaga(action: IAction): Generator<
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
      fetchStoredForecastingResultsAPI,
      forecastResultsUrl
    );

    const {
      data: { data: forecastResultsStored },
    } = forecastResults;

    const successAction = fetchStoredForecastingResultsSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastResultsStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "forecastResultTitles",
        forecastResultsStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredForecastingResultsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
    yield put(hideSpinnerAction());
  }
}
