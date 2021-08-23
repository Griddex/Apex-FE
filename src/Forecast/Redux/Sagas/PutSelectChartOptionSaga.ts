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
import {
  putSelectChartOptionSuccessAction,
  PUT_SELECTCHART,
} from "../Actions/ForecastActions";

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
  const {
    reducer,
    chartOption,
    transformChartResultsAction,
    transformChartResultsPayload,
  } = payload;
  const selectedChartype = chartOption.value;
  console.log(
    "Logged output --> ~ file: PutSelectChartOptionSaga.ts ~ line 44 ~ selectedChartype",
    selectedChartype
  );

  // const {
  //   selectedNetworkId,
  //   forecastResultsTitle,
  //   forecastResultsDescription,
  // } = yield select((state) => state[reducer]);

  try {
    const successAction = putSelectChartOptionSuccessAction();

    yield putResolve({
      ...successAction,
      payload: {
        reducer,
        selectedForecastChartOption: chartOption,
      },
    });
  } finally {
    yield put({
      ...transformChartResultsAction(),
      payload: transformChartResultsPayload.payload,
    });
  }
}
