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
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingForecastResultsSuccessFailureDialogParameters";
import {
  getForecastResultByIdFailureAction,
  getForecastResultByIdSuccessAction,
  GET_FORECASTRESULTBYID_REQUEST,
} from "../Actions/ForecastActions";

export default function* watchGetSelectedForecastResultByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getSelectedForecastResultsChan = yield actionChannel(
    GET_FORECASTRESULTBYID_REQUEST
  );
  yield takeLeading<ActionType>(
    getSelectedForecastResultsChan,
    getSelectedForecastResultByIdSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getSelectedForecastResultByIdSaga(
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
  const { selectedForecastingResultsId } = yield select(
    (state) => state.forecastReducer
  );
  console.log(
    "Logged output --> ~ file: GetSelectedForecastResultByIdSaga.ts ~ line 65 ~ selectedForecastingResultsId",
    selectedForecastingResultsId
  );

  const config = {};
  const userId = "Gideon";
  const url = `${getBaseForecastUrl()}/forecastResultData/${selectedForecastingResultsId}`;

  try {
    const forecastResultsAPI = (url: string) => authService.get(url, config);
    const result = yield call(forecastResultsAPI, url);
    console.log(
      "Logged output --> ~ file: GetForecastResultsWholeSaga.ts ~ line 89 ~ result",
      result
    );

    const {
      status,
      data: selectedForecastData,
      succcess, //prevent 2nd trip to server
    } = result;
    console.log(
      "Logged output --> ~ file: GetForecastResultsWholeSaga.ts ~ line 93 ~ selectedForecastData",
      selectedForecastData
    );

    const successAction = getForecastResultByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        selectedForecastData,
      },
    });

    // yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = getForecastResultByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}
