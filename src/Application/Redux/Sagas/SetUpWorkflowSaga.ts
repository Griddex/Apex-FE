import { all, call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "../../Services/HistoryService";
import { IAction } from "../Actions/ActionTypes";
import {
  SETUP_WORKFLOW,
  setWorkflowProcessAction,
} from "../Actions/WorkflowActions";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchLoginSaga() {
  yield takeLatest(SETUP_WORKFLOW, setUpWorkflowSaga);
}

function* setUpWorkflowSaga(action: IAction) {
  const { payload } = action;
  const { route, name, workflowProcess } = payload;

  // try {
  //  yield all([call(setWorkflowProcessAction,workflowProcess)])
  //   const { statusCode, userId, token } = response;
  //   // const successAction = setUpWorkflowSuccessAction();
  //   yield put({
  //     ...successAction,
  //     payload: { ...payload, statusCode, userId, token },
  //   });

  //   yield call(forwardTo, route);
  // } catch (errors) {
  //   // const failureAction = setUpWorkflowFailureAction();
  //   yield put({
  //     ...failureAction,
  //     payload: { ...payload, errors },
  //   });
  // }

  yield put(hideSpinnerAction());
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
