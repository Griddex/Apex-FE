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
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/FetchStoredNetworkFailureDialogParameters";
import {
  STOREDNETWORKDATA_REQUEST,
  fetchStoredNetworkDataFailureAction,
  fetchStoredNetworkDataSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredNetworkDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedNetworkDataChan = yield actionChannel(STOREDNETWORKDATA_REQUEST);
  yield takeLeading(storedNetworkDataChan, fetchStoredNetworkDataSaga);
}

type AxiosPromise = ReturnType<typeof fetchStoredDataAPI>;

const config = { withCredentials: false };
const fetchStoredDataAPI = (url: string) => authService.get(url, config);

function* fetchStoredNetworkDataSaga(
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
  const { projectId } = payload;
  const networkUrl = `${getBaseForecastUrl()}/network/light/${projectId}`;

  try {
    const networkResult = yield call<(url: string) => AxiosPromise>(
      fetchStoredDataAPI,
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
