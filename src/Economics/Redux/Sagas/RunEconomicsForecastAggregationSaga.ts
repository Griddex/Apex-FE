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
import {
  generalFailureDialogParameters,
  generalSuccessDialogParameters,
} from "../../../Application/Components/DialogParameters/GeneralSuccessFailureDialogParameters";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import {
  runEconomicsForecastAggregationFailureAction,
  runEconomicsForecastAggregationSuccessAction,
  RUN_ECONOMICSFORECASTAGGREGATION_REQUEST,
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
    const message = "Fetching aggregated forecast results...";
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) => authService.get(url, config);
    const result = yield call(forecastResultsAPI, url);

    const { data: forecastEconomicsAggregated } = result;

    const successAction = runEconomicsForecastAggregationSuccessAction();
    yield put({
      ...successAction,
      payload: {
        forecastEconomicsAggregated,
      },
    });

    yield put(
      showDialogAction(
        generalSuccessDialogParameters(
          "Forecast_Aggregation_Success",
          "Forecast Aggregation Results Successful",
          true,
          "Aggregated Forecast results was successfully loaded"
        )
      )
    );
  } catch (errors) {
    const failureAction = runEconomicsForecastAggregationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(
        generalFailureDialogParameters(
          "Forecast_Aggregation_Failure",
          "Forecast Aggregation Results Failure",
          true,
          "Something went wrong and aggregated Forecast results could not be loaded",
          ""
        )
      )
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
