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
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingProjectsFailureDialogParameters";
import {
  fetchExistingProjectsFailureAction,
  fetchExistingProjectsSuccessAction,
  FETCHEXISTINGPROJECTS_REQUEST,
} from "../Actions/ProjectActions";

export default function* watchFetchExistingProjectsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const fetchExistingProjectsChan = yield actionChannel(
    FETCHEXISTINGPROJECTS_REQUEST
  );
  yield takeLeading(fetchExistingProjectsChan, fetchExistingProjectsSaga);
}

function* fetchExistingProjectsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { userId } = yield select((state) => state.loginReducer);

  const config = { withCredentials: false };
  const fetchExistingProjectsAPI = (url: string) =>
    authService.get(url, config);

  try {
    const result = yield call(
      fetchExistingProjectsAPI,
      `${getBaseForecastUrl()}/project/recents/${20}` //Put in actual URL
    );

    const {
      data: { status, data: existingProjects, succcess }, //prevent 2nd trip to server
    } = result;

    const successAction = fetchExistingProjectsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, existingProjects },
    });
  } catch (errors) {
    const failureAction = fetchExistingProjectsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
