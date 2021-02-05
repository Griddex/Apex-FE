import {
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/FetchExistingNetworkFailureDialogParameters";
import {
  EXISTINGNETWORKDATA_REQUEST,
  fetchExistingNetworkDataFailureAction,
  fetchExistingNetworkDataSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchExistingNetworkDataSaga() {
  yield takeLeading(EXISTINGNETWORKDATA_REQUEST, fetchExistingNetworkDataSaga);
}

type AxiosPromise = ReturnType<typeof fetchExistingDataAPI>;

const config = { headers: null };
const fetchExistingDataAPI = (url: string) => authService.get(url, config);

function* fetchExistingNetworkDataSaga(action: IAction) {
  const { payload } = action;
  const { projectId } = yield select((state) => state.projectReducer);
  const networkUrl = `${getBaseUrl()}/network/light/${projectId}`;

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
  }

  yield put(hideSpinnerAction());
}
