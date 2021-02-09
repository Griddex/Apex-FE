import { call, put, select, takeLeading } from "redux-saga/effects";
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

export default function* watchAutogenerateNetworkSaga() {
  yield takeLeading(AUTOGENERATENETWORK_REQUEST, autoGenerateNetworkSaga);
}

export function* autoGenerateNetworkSaga(action: IAction) {
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

  const config = { headers: null };
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
        statusCode,
      },
    } = result;

    const successAction = autoGenerateNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        success,
        statusCode,
        nodeElements,
        edgeElements,
        networkId,
      },
    });

    yield put(hideSpinnerAction());
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    // yield call(forwardTo, "/apex/network");

    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
