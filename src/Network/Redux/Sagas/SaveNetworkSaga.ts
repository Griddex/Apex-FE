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
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveNetworkSuccessFailureDialogParameters";
import {
  fetchStoredNetworkDataRequestAction,
  saveNetworkFailureAction,
  saveNetworkSuccessAction,
  SAVE_NETWORK_REQUEST,
  updateNetworkParameterAction,
} from "../Actions/NetworkActions";

export default function* watchSaveNetworkSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveNetworkChan = yield actionChannel(SAVE_NETWORK_REQUEST);
  yield takeLeading(saveNetworkChan, saveNetworkSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* saveNetworkSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    titleDesc: { title, description },
  } = payload;
  const { currentProjectId } = yield select((state) => state.projectReducer);

  const { selectedFacilitiesInputDeckId, selectedForecastInputDeckId } =
    yield select((state) => state.inputReducer);
  const { isNetworkAuto, nodeElements, edgeElements } = yield select(
    (state) => state.networkReducer
  );

  const data = {
    userId: "Gift",
    projectId: currentProjectId,
    title,
    description,
    build: isNetworkAuto ? "Manual" : "Auto",
    facilitiesInputDeckId: selectedFacilitiesInputDeckId,
    forecastInputDeckId: selectedForecastInputDeckId,
    nodes: nodeElements,
    edges: edgeElements,
  };

  const config = { withCredentials: false };
  const saveNetworkAPI = (url: string) => authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving network..."));

    const result = yield call(
      saveNetworkAPI,
      `${getBaseForecastUrl()}/network/save`
    );

    const {
      data: { data: selectedNetworkId },
      status,
      success,
    } = result;

    const successAction = saveNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, success, selectedNetworkId },
    });

    yield put(updateNetworkParameterAction("selectedNetworkTitle", title));
    yield put(fetchStoredNetworkDataRequestAction(currentProjectId));

    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(failureDialogParameters((errors as any).message))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
