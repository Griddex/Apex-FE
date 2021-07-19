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
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/FetchStoredNetworkFailureDialogParameters";
import {
  STORED_NETWORKDATA_REQUEST,
  fetchStoredNetworkDataFailureAction,
  fetchStoredNetworkDataSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredNetworkDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedNetworkDataChan = yield actionChannel(STORED_NETWORKDATA_REQUEST);
  yield takeLeading(storedNetworkDataChan, fetchStoredNetworkDataSaga);
}

type AxiosPromise = ReturnType<typeof fetchStoredInputDeckAPI>;

const config = { withCredentials: true };
const fetchStoredInputDeckAPI = (url: string) => authService.get(url, config);

function* fetchStoredNetworkDataSaga(
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
  const { projectId } = payload;
  const networkUrl = `${getBaseForecastUrl()}/network/light/${projectId}`;

  try {
    const networkResult = yield call<(url: string) => AxiosPromise>(
      fetchStoredInputDeckAPI,
      networkUrl
    );

    const {
      data: { data: networkStored },
    } = networkResult;

    const successAction = fetchStoredNetworkDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        networkStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "networkTitles",
        networkStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredNetworkDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    yield put(hideSpinnerAction());
  }
}
