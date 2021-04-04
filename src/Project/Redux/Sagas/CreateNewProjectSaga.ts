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
import { activateDisabledMenusAction } from "../../../Application/Redux/Actions/LayoutActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import {
  createNewProjectFailureAction,
  createNewProjectSuccessAction,
  CREATE_NEWPROJECT,
} from "../Actions/ProjectActions";

export default function* watchCreateNewProjectSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const createNewProjectChan = yield actionChannel(CREATE_NEWPROJECT);
  yield takeLeading(createNewProjectChan, createNewProjectSaga);
}

function* createNewProjectSaga(
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
  const { successDialogParameters, failureDialogParameters } = payload;

  const { projectTitle, projectDescription } = yield select(
    (state: RootState) => state.projectReducer
  );

  const {
    unitGroup,
    dayFormat,
    monthFormat,
    yearFormat,
    pressureAddend,
    selectedVariableUnits,
  } = yield select((state: RootState) => state.unitSettingsReducer);

  const data = {
    userId: "Gideon",
    title: projectTitle,
    description: projectDescription,
    unitGroup,
    dayFormat,
    monthFormat,
    yearFormat,
    pressureAddend,
    variableUnits: selectedVariableUnits,
  };
  const config = { withCredentials: false };
  const createNewProjectAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    const result = yield call(createNewProjectAPI, `${getBaseUrl()}/project`);

    const {
      data: {
        status,
        data: { id },
        succcess,
      }, //prevent 2nd trip to server
    } = result;
    //put default unitsettings data received into
    //unitsettings store

    const successAction = createNewProjectSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, id },
    });

    yield put(activateDisabledMenusAction());
    yield put(showDialogAction(successDialogParameters)); //put --> show snackbar, reset registration form
  } catch (errors) {
    const failureAction = createNewProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
