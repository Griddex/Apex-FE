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
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  runForecastResultsAggregationFailureAction,
  runForecastResultsAggregationSuccessAction,
  RUN_FORECASTRESULTSAGGREGATION_REQUEST,
} from "../Actions/ForecastActions";

export default function* watchRunForecastResultsAggregationSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const runForecastAggregationChan = yield actionChannel(
    RUN_FORECASTRESULTSAGGREGATION_REQUEST
  );
  yield takeLeading<ActionType>(
    runForecastAggregationChan,
    runForecastResultsAggregationSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* runForecastResultsAggregationSaga(
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
  const { workflowProcess } = payload;
  const { selectedForecastingResultsId } = yield select(
    (state) => state.forecastReducer
  );

  const { forecastScenario } = yield select(
    (state) => state.economicsReducer["inputDataWorkflows"][workflowProcess]
  );

  const config = {};
  // const url = `${getBaseForecastUrl()}/forecastResultData/${selectedForecastingResultsId}`;

  const url = `${getBaseEconomicsUrl()}/forecast/forecastResultDataByScenario/${selectedForecastingResultsId}/${forecastScenario}`;
  const message = "Running forecast results aggregation...";

  try {
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) => authService.get(url, config);
    const result = yield call(forecastResultsAPI, url);

    const { data: forecastResultsAggregated } = result;

    const successAction = runForecastResultsAggregationSuccessAction();
    yield put({
      ...successAction,
      payload: {
        forecastResultsAggregated,
      },
    });
  } catch (errors) {
    const failureAction = runForecastResultsAggregationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
