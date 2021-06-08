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
  const forecastParametersUrl = `${getBaseForecastUrl()}/light/${projectId}`;

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchExistingForecastParametersAPI,
      forecastParametersUrl
    );

    const {
      data: { data: forecastingParametersExisting },
    } = result;

    const successAction = fetchExistingForecastingParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastingParametersExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingForecastingParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    yield put(hideSpinnerAction());
  }
}
