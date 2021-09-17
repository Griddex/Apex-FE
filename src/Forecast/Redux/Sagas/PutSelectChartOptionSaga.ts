import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  ActionChannelEffect,
  ForkEffect,
  put,
  PutEffect,
  putResolve,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { transformEconomicsChartDataAction } from "../../../Economics/Redux/Actions/EconomicsActions";
import {
  PUT_SELECTCHART,
  putSelectChartOptionSuccessAction,
  transformVisualyticsChartDataAction,
} from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import { transformForecastChartDataAction } from "../Actions/ForecastActions";

export default function* watchPutSelectChartOptionSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const putSelectChartOptionChan = yield actionChannel(PUT_SELECTCHART);

  yield takeLeading<ActionType>(
    putSelectChartOptionChan,
    putSelectChartOptionSaga
  );
}

function* putSelectChartOptionSaga(
  action: IAction
): Generator<TakeEffect | PutEffect<IAction> | SelectEffect, void, any> {
  const { payload } = action;
  console.log(
    "Logged output --> ~ file: PutSelectChartOptionSaga.ts ~ line 39 ~ payload",
    payload
  );
  const { reducer, selectedChartOptionTitle, chartOption } = payload;

  try {
    const successAction = putSelectChartOptionSuccessAction();

    yield putResolve({
      ...successAction,
      payload: {
        reducer,
        selectedChartOptionTitle,
        chartOption,
      },
    });
  } finally {
    if (reducer === "forecastReducer")
      yield put({
        ...transformForecastChartDataAction(reducer),
        payload,
      });
    else if (reducer === "visualyticsReducer")
      yield put({
        ...transformVisualyticsChartDataAction(reducer),
        payload,
      });
    else if (reducer === "economicsReducer")
      yield put({
        ...transformEconomicsChartDataAction(reducer),
        payload,
      });
  }
}
