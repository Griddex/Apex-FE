import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  getForecastResultsQualityAssuranceFailureAction,
  getForecastResultsQualityAssuranceSuccessAction,
  GET_FORECASTRESULTS_QUALITYASSURANCE_REQUEST,
} from "../Actions/ForecastActions";

export default function* watchGetForecastQADataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getForecastQAResultsChan = yield actionChannel(
    GET_FORECASTRESULTS_QUALITYASSURANCE_REQUEST
  );
  yield takeLeading<ActionType>(
    getForecastQAResultsChan,
    getForecastQADataSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getForecastQADataSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { selectedModulePaths, forecastQualityAssuranceVariable } = payload;

  const {
    selectedForecastingResultsId,
    selectedForecastAggregationType,
    selectedForecastAggregationLevel,
  } = yield select((state) => state.forecastReducer);

  const config = {};
  const url = `${getBaseForecastUrl()}/forecastQualityAssurance`;
  const data = {
    isMonthly: selectedForecastAggregationType === "monthly" ? true : false,
    aggregationLevel: selectedForecastAggregationLevel,
    selectedVariable: forecastQualityAssuranceVariable,
    selectedModulePaths: selectedModulePaths,
    forecastId: selectedForecastingResultsId,
  };

  const message = "Loading forecast data...";

  try {
    yield put(showSpinnerAction(message));

    const forecastQualityAssuranceAPI = (url: string) =>
      authService.post(url, data, config);
    const result = yield call(forecastQualityAssuranceAPI, url);
    console.log("result: ", result);

    const { data: forecastQualityAssuranceData } = result;

    const successAction = getForecastResultsQualityAssuranceSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastQualityAssuranceData,
      },
    });
  } catch (errors) {
    const failureAction = getForecastResultsQualityAssuranceFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
