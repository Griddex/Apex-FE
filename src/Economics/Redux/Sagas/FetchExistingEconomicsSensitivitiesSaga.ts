import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  all,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingEconomicsSensitivitiesDialogParameters";
import {
  EXISTINGECONOMICSSENSITIVITIES_REQUEST,
  fetchExistingEconomicsSensitivitiesFailureAction,
  fetchExistingEconomicsSensitivitiesSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchExistingEconomicsSensitivitiesSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingEconomicsSensitivitiesChan = yield actionChannel(
    EXISTINGECONOMICSSENSITIVITIES_REQUEST
  );
  yield takeLeading(
    existingEconomicsSensitivitiesChan,
    fetchExistingEconomicsSensitivitiesSaga
  );
}

const config = { withCredentials: false };
const fetchExistingEconomicsSensitivitiesAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingEconomicsSensitivitiesSaga(
  action: IAction
): Generator<
  | CallEffect<AxiosResponse>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  any
> {
  const { payload } = action;

  const economicsSensitivitiesUrl = `${getBaseEconomicsUrl()}/sensitivities/light`;

  try {
    const economicsSensitivitiesResults = yield call(
      fetchExistingEconomicsSensitivitiesAPI,
      economicsSensitivitiesUrl
    );

    const {
      data: { data: economicsSensitivitiesDeckExisting }, //prevent 2nd trip to server
    } = economicsSensitivitiesResults;

    const successAction = fetchExistingEconomicsSensitivitiesSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        economicsSensitivitiesDeckExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingEconomicsSensitivitiesFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
