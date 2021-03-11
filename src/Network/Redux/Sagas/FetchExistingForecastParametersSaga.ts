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
import { failureDialogParameters } from "../../Components/DialogParameters/FetchForecastingParametersFailureDialogParameters";
import {
  EXISTINGFORECASTPARAMETERS_REQUEST,
  fetchExistingForecastingParametersFailureAction,
  fetchExistingForecastingParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchExistingForecastParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingForecastParametersChan = yield actionChannel(
    EXISTINGFORECASTPARAMETERS_REQUEST
  );
  yield takeLeading(
    existingForecastParametersChan,
    fetchExistingForecastParametersSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchExistingForecastParametersAPI>;

const config = { withCredentials: false };
const fetchExistingForecastParametersAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingForecastParametersSaga(
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
  const forecastParametersUrl = `${getBaseUrl()}/forecast-parameters/project/${projectId}`;

  try {
    yield put(showSpinnerAction("Loading Network Data..."));

    const result = yield call<(url: string) => AxiosPromise>(
      fetchExistingForecastParametersAPI,
      forecastParametersUrl
    );

    const {
      data: { data: forecastingParametersServer }, //prevent 2nd trip to server
    } = result;

    const successAction = fetchExistingForecastingParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastingParametersServer,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingForecastingParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
