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
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  autoGenerateNetworkFailureAction,
  autoGenerateNetworkSuccessAction,
  AUTOGENERATENETWORK_REQUEST,
} from "../Actions/NetworkActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchAutogenerateNetworkSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const autoGenerateNetworkChan = yield actionChannel(
    AUTOGENERATENETWORK_REQUEST
  );
  yield takeLeading(autoGenerateNetworkChan, autoGenerateNetworkSaga);
}

export function* autoGenerateNetworkSaga(
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
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";

  const { userId } = yield select((state) => state.loginReducer);
  const { forecastInputDeckId, facilitiesInputDeckId } = yield select(
    (state) => state.inputReducer
  );
  const { showWellheadSummaryNodes, showWellheadSummaryEdges } = yield select(
    (state) => state.networkReducer
  );

  const data = {
    userId,
    facilitiesInputDeckId,
    forecastInputDeckId,
    showWellheadSummaryNodes,
    showWellheadSummaryEdges,
  };

  const config = { withCredentials: false };
  const autoGenerateNetworkAPI = (url: string) =>
    authService.post(url, data, config);

  yield put(showSpinnerAction(message));

  try {
    const result = yield call(
      autoGenerateNetworkAPI,
      `${getBaseUrl()}/network/generate`
    );

    const {
      data: {
        success,
        data: { nodes: nodeElements, edges: edgeElements, networkId },
        status,
      },
    } = result;

    const successAction = autoGenerateNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        success,
        status,
        nodeElements,
        edgeElements,
        networkId,
      },
    });
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    // yield call(forwardTo, "/apex/network");
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
