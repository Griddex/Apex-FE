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
import { failureDialogParameters } from "../../Components/DialogParameters/FetchForecastingParametersFailureDialogParameters";
import {
  STORED_FORECASTPARAMETERS_REQUEST,
  fetchStoredForecastingParametersFailureAction,
  fetchStoredForecastingParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredForecastParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedForecastParametersChan = yield actionChannel(
    STORED_FORECASTPARAMETERS_REQUEST
  );

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
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { projectId } = payload;


  const { isAllForecastParameters, 
    forecastingParametersStored } = yield select((state) => state.networkReducer);

    console.log("forecastingParametersStored: ", forecastingParametersStored);

  const forecastParametersUrl = `${getBaseForecastUrl()}/forecast-parameters/light/${projectId}`;


  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchStoredForecastParametersAPI,
      forecastParametersUrl
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

    yield put(
      persistFormTitlesAction(
        "forecastingParametersTitles",
        forecastingParametersStored.map((o: any) => o.title)
      )
    );
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
