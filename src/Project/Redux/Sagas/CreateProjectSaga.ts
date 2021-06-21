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
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/ProjectSuccessFailureDialogsParameters";
import {
  createProjectFailureAction,
  createProjectSuccessAction,
  CREATE_PROJECT_REQUEST,
  fetchRecentProjectsAction,
} from "../Actions/ProjectActions";

export default function* watchCreateNewProjectSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const createProjectChan = yield actionChannel(CREATE_PROJECT_REQUEST);
  yield takeLeading(createProjectChan, createProjectSaga);
}

function* createProjectSaga(
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
  const {
    titleDesc: { title, description },
  } = payload;

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
    title,
    description,
    unitGroup,
    dayFormat,
    monthFormat,
    yearFormat,
    pressureAddend,
    variableUnits: selectedVariableUnits,
  };
  const config = { withCredentials: false };
  const createProjectAPI = (url: string) => authService.post(url, data, config);

  try {
    const result = yield call(
      createProjectAPI,
      `${getBaseForecastUrl()}/project`
    );

    const {
      data: {
        status,
        data: { id },
      },
    } = result;

    const successAction = createProjectSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        status,
        currentProjectTitle: projectTitle,
        currentProjectDescription: projectDescription,
        currentProjectId: id,
      },
    });

    yield put(activateDisabledMenusAction());
    yield put(fetchRecentProjectsAction());

    yield put(showDialogAction(successDialogParameters));
  } catch (errors) {
    const failureAction = createProjectFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}