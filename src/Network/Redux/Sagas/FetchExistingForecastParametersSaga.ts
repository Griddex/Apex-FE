import { call, put, select, takeLeading } from "redux-saga/effects";
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

export default function* watchFetchExistingForecastParametersSaga() {
  yield takeLeading(
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
  const { projectId } = yield select((state) => state.projectReducer);
  const forecastParametersUrl = `${getBaseUrl()}/forecast-parameters/${projectId}`;

  try {
    yield put(showSpinnerAction("Loading Network Data..."));

    const result = yield call<(url: string) => AxiosPromise>(
      fetchExistingForecastParametersAPI,
      forecastParametersUrl
    );

    const {
      data: { data }, //prevent 2nd trip to server
    } = result;
    console.log(
      "Logged output --> ~ file: FetchExistingForecastParametersSaga.ts ~ line 46 ~ function*fetchExistingForecastParametersSaga ~ data",
      data
    );

    const forecastingParametersExisting = data[0];

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
  } finally {
    yield put(hideSpinnerAction());
  }
}
