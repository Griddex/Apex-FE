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
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredForecastResultsSuccessFailureDialogParameters";
import {
  getForecastDataByIdFailureAction,
  getForecastDataByIdSuccessAction,
  GET_FORECASTDATABYID_REQUEST,
} from "../Actions/ForecastActions";
import history from "../../../Application/Services/HistoryService";
import { getTableDataByIdSuccessAction } from "../../../Application/Redux/Actions/ApplicationActions";

export default function* watchGetSelectedForecastDataByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getSelectedForecastResultsChan = yield actionChannel(
    GET_FORECASTDATABYID_REQUEST
  );
  yield takeLeading<ActionType>(
    getSelectedForecastResultsChan,
    getSelectedForecastDataByIdSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* getSelectedForecastDataByIdSaga(
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
  const { workflowProcess, switchToRoute, routeUrl } = payload;

  const { selectedForecastingResultsId } = yield select(
    (state) => state.forecastReducer
  );

  const reducer = "forecastReducer";

  const config = {};
  const url = `${getBaseForecastUrl()}/forecastResultData/${selectedForecastingResultsId}`;
  const message = "Loading forecast data...";

  try {
    yield put(showSpinnerAction(message));

    const forecastResultsAPI = (url: string) => authService.get(url, config);
    const result = yield call(forecastResultsAPI, url);

    console.log("result: ", result);

    const selectedTableData = result.data;

    const successAction = getTableDataByIdSuccessAction();
    console.log("ans: ", {
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });

    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });

    // if (workflowProcess === "forecastResultsData") {
    //   yield call(forwardTo, "/apex/forecast/forecastdata");
    // }
    if (switchToRoute) {
      yield call(forwardTo, routeUrl);
    }
  } catch (errors) {
    const failureAction = getForecastDataByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
