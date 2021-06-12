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
import getBaseForecastUrl, {
  getBaseEconomicsUrl,
} from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  runForecastAggregationFailureAction,
  runForecastAggregationSuccessAction,
  RUN_FORECASTAGGREGATION_REQUEST,
} from "../Actions/ForecastActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchRunForecastResultAggregationSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const runForecastAggregationChan = yield actionChannel(
    RUN_FORECASTAGGREGATION_REQUEST
  );
  yield takeLeading<ActionType>(
    runForecastAggregationChan,
    runForecastResultAggregationSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* runForecastResultAggregationSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { workflowProcess } = payload;
  const { selectedForecastingResultsId } = yield select(
    (state) => state.forecastReducer
  );

  const { forecastScenario } = yield select(
    (state) => state.economicsReducer["inputDataWorkflows"][workflowProcess]
  );

  const config = {};
  const url = `${getBaseEconomicsUrl()}/forecast/forecastResultDataByScenario/${selectedForecastingResultsId}/${forecastScenario}`;
  const message = "Running forecast results aggregation...";

  try {
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) => authService.get(url, config);
    const result = yield call(forecastResultsAPI, url);

    const { status, data: forecastResultsAggregated, succcess } = result;

    const successAction = runForecastAggregationSuccessAction();
    yield put({
      ...successAction,
      payload: {
        forecastResultsAggregated,
      },
    });
  } catch (errors) {
    const failureAction = runForecastAggregationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
