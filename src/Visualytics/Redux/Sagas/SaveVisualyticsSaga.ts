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
import getBaseVisualyticsUrl from "../../../Application/Services/BaseUrlService";
import {
  fetchStoredVisualyticsRequestAction,
  saveVisualyticsFailureAction,
  saveVisualyticsSuccessAction,
  SAVE_VISUALYTICS_REQUEST,
} from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveVisualyticsSuccessFailureDialogParameters";
import { showSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

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
  const { payload } = action;
  const {
    titleDesc: { title, description },
  } = payload;
  const { currentProjectId } = yield select((state) => state.projectReducer);

  const { selectedNetworkId, selectedVisualyticsingParametersId } =
    yield select((state) => state.networkReducer);

  const data = {
    userId: "Gideon",
    projectId: currentProjectId,
    networkId: selectedNetworkId,
    visualyticsingParametersId: selectedVisualyticsingParametersId,
    title,
    description,
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

    // yield put(
    //   updateVisualyticsResultsParameterAction("selectedVisualyticsTitle", title)
    // );
    yield put(fetchStoredVisualyticsRequestAction(currentProjectId));
    yield put(showDialogAction(successDialogParameters() as DialogStuff));
  } catch (errors) {
    const failureAction = saveVisualyticsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters() as DialogStuff));
  } finally {
    yield put(hideSpinnerAction());
  }
}
