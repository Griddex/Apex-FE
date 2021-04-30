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
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingEconomicsDataDialogParameters";
import {
  EXISTINGECONOMICSDATA_REQUEST,
  fetchExistingEconomicsDataFailureAction,
  fetchExistingEconomicsDataSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchExistingEconomicsDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingEconomicsDataChan = yield actionChannel(
    EXISTINGECONOMICSDATA_REQUEST
  );
  yield takeLeading(existingEconomicsDataChan, fetchExistingEconomicsDataSaga);
}

const config = { withCredentials: false };
const fetchExistingEconomicsDataAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingEconomicsDataSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosResponse>>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  [any, any]
> {
  const { payload } = action;
  const { projectId } = payload;
  const costsRevenueUrl = `${getBaseEconomicsUrl()}/data/light/${projectId}`;
  const economicsParametersUrl = `${getBaseEconomicsUrl()}/parameter/light/${projectId}`;

  try {
    const [costsRevenueResult, economicsParametersResults] = yield all([
      call(fetchExistingEconomicsDataAPI, costsRevenueUrl),
      call(fetchExistingEconomicsDataAPI, economicsParametersUrl),
    ]);

    const {
      data: { data: economicsCostsRevenuesDeckExisting }, //prevent 2nd trip to server
    } = costsRevenueResult;

    const {
      data: { data: economicsParametersDeckExisting }, //prevent 2nd trip to server
    } = economicsParametersResults;

    const successAction = fetchExistingEconomicsDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        economicsCostsRevenuesDeckExisting,
        economicsParametersDeckExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingEconomicsDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
