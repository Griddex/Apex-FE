import { call, put, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/FetchForecastingParametersFailureDialogParameters";
import {
  EXISTINGFORECASTPARAMETERS_REQUEST,
  fetchExistingForecastParametersFailureAction,
  fetchExistingForecastParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchExistingForecastParametersSaga() {
  yield takeLatest(
    EXISTINGFORECASTPARAMETERS_REQUEST,
    fetchExistingForecastParametersSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchExistingForecastParametersAPI>;

const config = { headers: null };
const fetchExistingForecastParametersAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingForecastParametersSaga(action: IAction) {
  const { payload } = action;
  const { projectId } = payload;
  const facilitiesUrl = `${getBaseUrl()}/forecast-parameters/light/${projectId}`;

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchExistingForecastParametersAPI,
      facilitiesUrl
    );

    const {
      data: { data: forecastParameters }, //prevent 2nd trip to server
    } = result;

    const successAction = fetchExistingForecastParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        forecastParameters,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingForecastParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  }

  yield put(hideSpinnerAction());
}
