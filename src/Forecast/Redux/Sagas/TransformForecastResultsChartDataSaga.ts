import { ActionType } from "@redux-saga/types";
import {
  actionChannel,
  ActionChannelEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { TChartTypes } from "../../../Visualytics/Components/Charts/ChartTypes";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import { forecastResultsTransformersObj } from "../../Data/ForecastData";
import {
  GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  transformForecastResultsChartDataFailureAction,
  transformForecastResultsChartDataSuccessAction,
  TRANSFORM_FORECASTRESULTS_CHARTDATA,
} from "../Actions/ForecastActions";

export default function* watchTransformForecastResultsChartDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const transformForecastResultsChan = yield actionChannel([
    TRANSFORM_FORECASTRESULTS_CHARTDATA,
    GET_FORECASTRESULTS_CHARTDATA_SUCCESS,
  ]);

  yield takeLeading<ActionType>(
    transformForecastResultsChan,
    transformForecastResultsChartDataSaga
  );
}

function* transformForecastResultsChartDataSaga(
  action: IAction
): Generator<TakeEffect | PutEffect<IAction> | SelectEffect, void, any> {
  const { payload } = action;

  const {
    chartType,
    forecastResults,
    xValueCategories,
    lineOrScatter,
    isYear,
  } = payload;

  try {
    const transformedForecastResultsFxn =
      forecastResultsTransformersObj[chartType as TChartTypes];

    const transformedForecastResults = transformedForecastResultsFxn({
      data: forecastResults,
      yearsOrMonths: xValueCategories,
      lineOrScatter,
      isYear,
    });

    const successAction = transformForecastResultsChartDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        chartType,
        forecastResults: transformedForecastResults,
        xValueCategories,
        lineOrScatter,
        isYear,
      },
    });
  } catch (errors) {
    const failureAction = transformForecastResultsChartDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  }
}
