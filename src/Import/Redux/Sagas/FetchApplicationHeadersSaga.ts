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
import * as authService from "../../../Application/Services/AuthService";
import {
  fetchExistingCostsRevenuesDataFailureAction,
  fetchExistingCostsRevenuesHeadersSuccessAction,
  fetchExistingEconomicsParametersDataFailureAction,
  fetchExistingEconomicsParametersHeadersSuccessAction,
} from "../../../Economics/Redux/Actions/EconomicsActions";
import { failureDialogParameters } from "../../../Project/Components/DialogParameters/ProjectSuccessFailureDialogsParameters";
import {
  fetchApplicationHeadersFailureAction,
  fetchApplicationHeadersSuccessAction,
  FETCHAPPLICATIONHEADERS_REQUEST,
} from "../Actions/InputActions";
import getBaseForecastUrl, {
  getBaseEconomicsUrl,
} from "./../../../Application/Services/BaseUrlService";

export default function* watchFetchApplicationHeadersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const appHeadersChan = yield actionChannel(FETCHAPPLICATIONHEADERS_REQUEST);
  yield takeLeading(appHeadersChan, fetchApplicationHeadersSaga);
}

const config = { withCredentials: false };
const fetchHeadersAPI = (url: string) => authService.get(url, config);
const facilitiesUrl = `${getBaseForecastUrl()}/global-variableunit/facilitiesInputHeaders`;
const forecastUrl = `${getBaseForecastUrl()}/global-variableunit/forecastInputHeaders`;
const economicsParametersUrl = `${getBaseEconomicsUrl()}/variables/parameterHeaders`;
const costsRevenueUrl = `${getBaseEconomicsUrl()}/variables/costsRevenueHeaders`;

function* fetchApplicationHeadersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosResponse<any>>>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  [any, any, any, any]
> {
  const { payload } = action;

  try {
    const [
      facilitiesResult,
      forecastResults,
      costsRevenueResults,
      economicsParametersResults,
    ] = yield all([
      call(fetchHeadersAPI, facilitiesUrl),
      call(fetchHeadersAPI, forecastUrl),
      call(fetchHeadersAPI, costsRevenueUrl),
      call(fetchHeadersAPI, economicsParametersUrl),
    ]);

    const {
      data: { data: facilitiesAppHeaders }, //prevent 2nd trip to server
    } = facilitiesResult;
    const {
      data: { data: forecastAppHeaders }, //prevent 2nd trip to server
    } = forecastResults;
    const {
      data: { data: costsRevenuesAppHeaders }, //prevent 2nd trip to server
    } = costsRevenueResults;
    const {
      data: { data: economicsParametersAppHeaders }, //prevent 2nd trip to server
    } = economicsParametersResults;

    const successAction1 = fetchApplicationHeadersSuccessAction();
    const successAction2 = fetchExistingCostsRevenuesHeadersSuccessAction();
    const successAction3 = fetchExistingEconomicsParametersHeadersSuccessAction();

    yield put({
      ...successAction1,
      payload: {
        ...payload,
        facilitiesAppHeaders,
        forecastAppHeaders: forecastAppHeaders,
      },
    });
    yield put({
      ...successAction2,
      payload: {
        ...payload,
        costsRevenuesAppHeaders,
      },
    });
    yield put({
      ...successAction3,
      payload: {
        ...payload,
        economicsParametersAppHeaders,
      },
    });
  } catch (errors) {
    const failureAction1 = fetchApplicationHeadersFailureAction();
    const failureAction2 = fetchExistingCostsRevenuesDataFailureAction();
    const failureAction3 = fetchExistingEconomicsParametersDataFailureAction();

    yield put({
      ...failureAction1,
      payload: { ...payload, errors },
    });
    yield put({
      ...failureAction2,
      payload: { ...payload, errors },
    });
    yield put({
      ...failureAction3,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }
}
