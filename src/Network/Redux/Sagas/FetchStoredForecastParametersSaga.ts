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
  STOREDFORECASTPARAMETERS_REQUEST,
  fetchStoredForecastingParametersFailureAction,
  fetchStoredForecastingParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredForecastParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedForecastParametersChan = yield actionChannel(
    STOREDFORECASTPARAMETERS_REQUEST
  );
  console.log("im in fetch forecast params");
  yield takeLeading(
    storedForecastParametersChan,
    fetchStoredForecastParametersSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchStoredForecastParametersAPI>;

const config = { withCredentials: false };
const fetchStoredForecastParametersAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredForecastParametersSaga(
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
  console.log(
    "Logged output --> ~ file: FetchStoredForecastParametersSaga.ts ~ line 59 ~ action",
    action
  );
  const { projectId } = payload;
  const forecastParametersUrl = `${getBaseForecastUrl()}/forecast-parameters/light/${projectId}`;
  console.log(
    "Logged output --> ~ file: FetchStoredForecastParametersSaga.ts ~ line 62 ~ forecastParametersUrl",
    forecastParametersUrl
  );

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchStoredForecastParametersAPI,
      forecastParametersUrl
    );
    console.log(
      "Logged output --> ~ file: FetchStoredForecastParametersSaga.ts ~ line 75 ~ result",
      result
    );

    const {
      data: { data: forecastingParametersStored },
    } = result;

    const successAction = fetchStoredForecastingParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastingParametersStored,
      },
    });
  } catch (errors) {
    const failureAction = fetchStoredForecastingParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    yield put(hideSpinnerAction());
  }
}
