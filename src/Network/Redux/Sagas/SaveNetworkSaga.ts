import { EventChannel } from "redux-saga";
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
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SaveNetworkSuccessFailureDialogParameters";
import {
  fetchExistingNetworkDataRequestAction,
  saveNetworkFailureAction,
  saveNetworkSuccessAction,
  SAVENETWORK_REQUEST,
  updateNetworkParameterAction,
} from "../Actions/NetworkActions";

export default function* watchSaveNetworkSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveNetworkChan = yield actionChannel(SAVENETWORK_REQUEST);
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
  const { projectId } = yield select((state) => state.projectReducer);

  const { selectedFacilitiesInputDeckId, selectedForecastInputDeckId } =
    yield select((state) => state.inputReducer);
  const {
    isNetworkAuto,
    networkTitle,
    networkDescription,
    nodeElements,
    edgeElements,
  } = yield select((state) => state.networkReducer);

  const data = {
    userId: "Gift",
    projectId,
    build: isNetworkAuto ? "Manual" : "Auto",
    title: networkTitle,
    description: networkDescription,
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
      `${getBaseForecastUrl()}/network`
    );

    const {
      data: { data: selectedNetworkId }, //prevent 2nd trip to server
      status,
      success,
    } = result;

    const successAction = saveNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, success, selectedNetworkId },
    });

    yield put(
      updateNetworkParameterAction("selectedNetworkTitle", networkTitle)
    );
    yield put(fetchExistingNetworkDataRequestAction());
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      // showDialogAction(failureDialogParameters(errors["errors"][0].message))
      showDialogAction(failureDialogParameters(errors.message))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
