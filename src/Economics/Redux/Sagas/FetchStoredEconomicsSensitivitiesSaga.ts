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
import { failureDialogParameters } from "../../Components/DialogParameters/StoredEconomicsSensitivitiesDialogParameters";
import {
  STORED_ECONOMICSSENSITIVITIES_REQUEST,
  fetchStoredEconomicsSensitivitiesFailureAction,
  fetchStoredEconomicsSensitivitiesSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchStoredEconomicsSensitivitiesSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedEconomicsSensitivitiesChan = yield actionChannel(
    STORED_ECONOMICSSENSITIVITIES_REQUEST
  );
  yield takeLeading(
    storedEconomicsSensitivitiesChan,
    fetchStoredEconomicsSensitivitiesSaga
  );
}

const config = { withCredentials: true };
const fetchStoredEconomicsSensitivitiesAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredEconomicsSensitivitiesSaga(action: IAction): Generator<
  | CallEffect<AxiosResponse>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  any
> {
  const { payload, meta } = action;
  const { showSpinner } = meta as NonNullable<IAction["meta"]>;

  const economicsSensitivitiesUrl = `${getBaseEconomicsUrl()}/sensitivities/light`;

  try {
    const economicsSensitivitiesResults = yield call(
      fetchStoredEconomicsSensitivitiesAPI,
      economicsSensitivitiesUrl
    );

    const {
      data: { data: economicsSensitivitiesStored },
    } = economicsSensitivitiesResults;

    const successAction = fetchStoredEconomicsSensitivitiesSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        economicsSensitivitiesStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "economicsSensitivitiesTitles",
        economicsSensitivitiesStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredEconomicsSensitivitiesFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
