import { call, put, select, takeLeading } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
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
  const { payload } = action;
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
    authService.post(url, config, data);

  try {
    const result = yield call(
      autoGenerateNetworkAPI,
      `${getBaseUrl()}/network/generate`
    );

    const {
      statusCode,
      data: { data },
    } = result;
    const { nodeElements, edgeElements } = data;

    const successAction = autoGenerateNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, nodeElements, edgeElements },
    });

    yield call(forwardTo, "/apex/network");
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  }

  yield put(hideSpinnerAction());
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
