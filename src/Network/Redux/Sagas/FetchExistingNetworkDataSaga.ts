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
import { failureDialogParameters } from "../../Components/DialogParameters/FetchExistingNetworkFailureDialogParameters";
import {
  EXISTINGNETWORKDATA_REQUEST,
  fetchExistingNetworkDataFailureAction,
  fetchExistingNetworkDataSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchExistingNetworkDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingNetworkDataChan = yield actionChannel(
    EXISTINGNETWORKDATA_REQUEST
  );
  yield takeLeading(existingNetworkDataChan, fetchExistingNetworkDataSaga);
}

type AxiosPromise = ReturnType<typeof fetchExistingDataAPI>;

const config = { withCredentials: false };
const fetchExistingDataAPI = (url: string) => authService.get(url, config);

function* fetchExistingNetworkDataSaga(
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
  const { projectId } = yield select((state) => state.projectReducer);
  const networkUrl = `${getBaseForecastUrl()}/network/light/${projectId}`;

  try {
    const networkResult = yield call<(url: string) => AxiosPromise>(
      fetchExistingDataAPI,
      networkUrl
    );

    const {
      data: { data: networkExisting }, //prevent 2nd trip to server
    } = networkResult;

    const successAction = fetchExistingNetworkDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        networkExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingNetworkDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    yield put(hideSpinnerAction());
  }
}
