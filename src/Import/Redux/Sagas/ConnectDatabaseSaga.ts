import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  connectDatabaseFailureAction,
  connectDatabaseSuccessAction,
  CONNECTDATABASE_REQUEST,
} from "../Actions/DatabaseServerActions";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

export default function* watchConnectDatabaseSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const connectDbChan = yield actionChannel(CONNECTDATABASE_REQUEST);
  yield takeLeading(connectDbChan, connectDatabaseSaga);
}

function* connectDatabaseSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { successDialogParameters, failureDialogParameters } = payload;
  //add authenticationType
  //connectionString, userName, password as payload
  const { userName, password } = payload;

  const data = {
    title: userName,
    body: password,
  };
  const config = { withCredentials: true };
  const connectDatabaI = (url: string) => authService.post(url, data, config);
  const status = "";

  //Replace with actual API call
  try {
    let databases = yield call(
      connectDatabaI,
      "https://jsonplaceholder.typicode.com/comments"
    );

    databases = ["ForecastingDb", "MainDb"];
    const successAction = connectDatabaseSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, databases: databases },
    });

    //dispatch spinner
    //after success,

    yield put(showDialogAction(successDialogParameters));
  } catch (errors) {
    const failureAction = connectDatabaseFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, status, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
