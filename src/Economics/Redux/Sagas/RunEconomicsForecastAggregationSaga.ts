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
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../../Forecast/Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  RUN_ECONOMICSFORECASTAGGREGATION_REQUEST,
  runEconomicsForecastAggregationSuccessAction,
  runEconomicsForecastAggregationFailureAction,
} from "../Actions/EconomicsActions";

export default function* watchRunEconomicsForecastAggregationSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const runForecastAggregationChan = yield actionChannel(
    RUN_ECONOMICSFORECASTAGGREGATION_REQUEST
  );
  yield takeLeading<ActionType>(
    runForecastAggregationChan,
    runEconomicsForecastAggregationSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* runEconomicsForecastAggregationSaga(
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

  const { forecastCase } = yield select(
    (state) => state.economicsReducer["inputDataWorkflows"][workflowProcess]
  );

  const config = {};
  const url = `${getBaseEconomicsUrl()}/forecast/forecastResultDataByScenario/${selectedForecastingResultsId}/${forecastCase}`;

  try {
    const forecastResultsAPI = (url: string) => authService.get(url, config);
    const result = yield call(forecastResultsAPI, url);

    const { data: forecastEconomicsAggregated } = result;

    console.log("forecastEconomicsAggregated: ", forecastEconomicsAggregated);
    const successAction = runEconomicsForecastAggregationSuccessAction();
    yield put({
      ...successAction,
      payload: {
        forecastEconomicsAggregated,
      },
    });
  } catch (errors) {
    const failureAction = runEconomicsForecastAggregationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
