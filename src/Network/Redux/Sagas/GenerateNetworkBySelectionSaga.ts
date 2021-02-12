import {
  actionChannel,
  call,
  put,
  select,
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
  generateNetworkBySelectionFailureAction,
  generateNetworkBySelectionSuccessAction,
  GENERATENETWORKBYSELECTION_REQUEST,
} from "../Actions/NetworkActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchGenerateNetworkBySelectionSaga() {
  const generateNetworkBySelectionChan = yield actionChannel(
    GENERATENETWORKBYSELECTION_REQUEST
  );
  yield takeLeading(
    generateNetworkBySelectionChan,
    generateNetworkBySelectionSaga
  );
}

export function* generateNetworkBySelectionSaga(action: IAction) {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";

  const { selectedNetworkId } = yield select((state) => state.networkReducer);

  const config = { headers: null };
  const generateNetworkBySelectionAPI = (url: string) =>
    authService.get(url, config);

  yield put(showSpinnerAction(message));

  try {
    const result = yield call(
      generateNetworkBySelectionAPI,
      `${getBaseUrl()}/network/${selectedNetworkId}`
    );

    const {
      data: {
        success,
        statusCode,
        data: { nodes: nodeElements, edges: edgeElements },
      },
    } = result;
    console.log(
      "Logged output --> ~ file: AutogenerateNetworkSaga.ts ~ line 58 ~ function*generateNetworkBySelectionSaga ~ result",
      result
    );

    const successAction = generateNetworkBySelectionSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, success, nodeElements, edgeElements },
    });
  } catch (errors) {
    const failureAction = generateNetworkBySelectionFailureAction();

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
