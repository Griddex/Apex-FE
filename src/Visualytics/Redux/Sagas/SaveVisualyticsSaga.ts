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
import { workflowResetAction } from "../../../Application/Redux/Actions/WorkflowActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseVisualyticsUrl } from "../../../Application/Services/BaseUrlService";
import {
  fetchStoredVisualyticsDataRequestAction,
  saveVisualyticsFailureAction,
  saveVisualyticsSuccessAction,
  SAVE_VISUALYTICS_REQUEST,
} from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveVisualyticsSuccessFailureDialogParameters";

export default function* watchSaveVisualyticsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveVisualyticsChan = yield actionChannel(SAVE_VISUALYTICS_REQUEST);
  yield takeLeading<ActionType>(saveVisualyticsChan, saveVisualyticsSaga);
}

function* saveVisualyticsSaga(
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
  const wc = "visualyticsDataWorkflows";

  const { payload } = action;
  const {
    workflowProcess: wp,
    titleDesc: { title, description },
  } = payload;
  const { currentProjectId } = yield select((state) => state.projectReducer);

  const { tableData } = yield select(
    (state) => state.visualyticsReducer[wc][wp]
  );

  const data = {
    projectId: currentProjectId,
    title,
    description,
    inputDeck: tableData,
  };

  const config = { withCredentials: false };
  const saveVisualyticsAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving visualytics results..."));

    const result = yield call(
      saveVisualyticsAPI,
      `${getBaseVisualyticsUrl()}/save`
    );

    const {
      data: { data: selectedVisualyticsId },
    } = result;

    const successAction = saveVisualyticsSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        selectedVisualyticsId,
      },
    });

    yield put(workflowResetAction(0, wp, wc));
    yield put(fetchStoredVisualyticsDataRequestAction(currentProjectId));
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveVisualyticsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
