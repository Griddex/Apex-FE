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
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredEconomicsDataDialogParameters";
import {
  STORED_ECONOMICSDATA_REQUEST,
  fetchStoredEconomicsDataFailureAction,
  fetchStoredEconomicsDataSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchStoredEconomicsDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedEconomicsDataChan = yield actionChannel(
    STORED_ECONOMICSDATA_REQUEST
  );
  yield takeLeading(storedEconomicsDataChan, fetchStoredEconomicsDataSaga);
}

const config = { withCredentials: false };
const fetchStoredEconomicsDataAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredEconomicsDataSaga(action: IAction): Generator<
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
      call(fetchStoredEconomicsDataAPI, costsRevenueUrl),
      call(fetchStoredEconomicsDataAPI, economicsParametersUrl),
    ]);

    const {
      data: { data: economicsCostsRevenuesDeckStored },
    } = costsRevenueResult;

    const {
      data: { data: economicsParametersDeckStored },
    } = economicsParametersResults;

    const successAction = fetchStoredEconomicsDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        economicsCostsRevenuesDeckStored,
        economicsParametersDeckStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "economicsCostsRevenuesTitles",
        economicsCostsRevenuesDeckStored.map((o: any) => o.title)
      )
    );

    yield put(
      persistFormTitlesAction(
        "economicsParametersTitles",
        economicsParametersDeckStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredEconomicsDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
