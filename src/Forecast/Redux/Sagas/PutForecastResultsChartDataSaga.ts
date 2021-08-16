import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  ActionChannelEffect,
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
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  putForecastResultsChartDataFailureAction,
  putForecastResultsChartDataSuccessAction,
} from "../Actions/ForecastActions";

export default function* watchPutForecastResultsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const putForecastResultsChan = yield actionChannel("NONE");
  yield takeLeading<ActionType>(
    putForecastResultsChan,
    putForecastResultsChartDataSaga
  );
}

function* putForecastResultsChartDataSaga(
  action: IAction
): Generator<TakeEffect | PutEffect<IAction> | SelectEffect, void, any> {
  const { payload } = action;
  const { forecastResults } = payload;

  const { selectedForecastChartOption } = yield select(
    (state) => state.forecastReducer
  );

  const chartType = selectedForecastChartOption.value;

  try {
    const successAction = putForecastResultsChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        forecastResults,
      },
    });
  } catch (errors) {
    const failureAction = putForecastResultsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  }
}
