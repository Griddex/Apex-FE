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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { activateDisabledMenusAction } from "../../../Application/Redux/Actions/LayoutActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/OpenProjectFailureDialogParameters";
import {
  openRecentProjectFailureAction,
  openRecentProjectSuccessAction,
  OPENRECENTPROJECT_REQUEST,
} from "../Actions/ProjectActions";

export default function* watchOpenRecentProjectSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const openRecentProjectChan = yield actionChannel(OPENRECENTPROJECT_REQUEST);
  yield takeLeading(openRecentProjectChan, openRecentProjectSaga);
}

function* openRecentProjectSaga(
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
  const { userId, projectId, projectTitle, projectDescription } = payload; //grab from own dps

  const config = { withCredentials: false };
  const openRecentProjectAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      openRecentProjectAPI,
      `${getBaseUrl()}/project/${projectId}`
    );

    // const { status, data } = response; //data that'll go to several reducers to
    //boostrap project

    const {
      data: { status, data, succcess }, //prevent 2nd trip to server
    } = result;
    const { title } = data; //unitsettins object

    const successAction = openRecentProjectSuccessAction(); //this will do the bootstrap
    yield put({
      ...successAction,
      payload: {
        ...payload,
        status,
        projectId,
        projectTitle,
        projectDescription,
      },
    });

    yield put(activateDisabledMenusAction());
  } catch (errors) {
    const failureAction = openRecentProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
