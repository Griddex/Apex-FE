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
  select,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingEconomicsSensitivitiesDialogParameters";
import {
  GETECONOMICSSENSITIVITIESBYID_REQUEST,
  getEconomicsSensitivitiesByIdFailureAction,
  getEconomicsSensitivitiesByIdSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchGetEconomicsSensitivitiesByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getEconomicsSensitivitiesByIdChan = yield actionChannel(
    GETECONOMICSSENSITIVITIESBYID_REQUEST
  );
  yield takeLeading(
    getEconomicsSensitivitiesByIdChan,
    getEconomicsSensitivitiesByIdSaga
  );
}

const config = { withCredentials: false };
const getEconomicsSensitivitiesByIdAPI = (url: string) =>
  authService.get(url, config);

function* getEconomicsSensitivitiesByIdSaga(
  action: IAction
): Generator<
  | CallEffect<AxiosResponse>
  | PutEffect<{
      payload: any;
      type: string;
    }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { economicsSensitivitiesId } = yield select(
    (state) => state.economicsReducer
  );
  const economicsSensitivitiesUrl = `${getBaseEconomicsUrl()}/sensitivities/${economicsSensitivitiesId}`;

  try {
    const economicsSensitivitiesResults = yield call(
      getEconomicsSensitivitiesByIdAPI,
      economicsSensitivitiesUrl
    );

    const {
      data: { data: selectedSensitivitiesTable }, //prevent 2nd trip to server
    } = economicsSensitivitiesResults;

    const successAction = getEconomicsSensitivitiesByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        selectedSensitivitiesTable,
      },
    });
  } catch (errors) {
    const failureAction = getEconomicsSensitivitiesByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
