import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
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
  getEconomicsSensitivitiesByIdFailureAction,
  getEconomicsSensitivitiesByIdSuccessAction,
  GETECONOMICSSENSITIVITIESBYID_REQUEST,
  updateEconomicsParameterAction,
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

function* getEconomicsSensitivitiesByIdSaga(action: IAction): Generator<
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
  const { selectedEconomicsSensitivitiesId } = yield select(
    (state) => state.economicsReducer
  );
  const economicsSensitivitiesUrl = `${getBaseEconomicsUrl()}/sensitivities/${selectedEconomicsSensitivitiesId}`;

  try {
    const economicsSensitivitiesResults = yield call(
      getEconomicsSensitivitiesByIdAPI,
      economicsSensitivitiesUrl
    );

    const {
      data: { data: selectedSensitivitiesData }, //prevent 2nd trip to server
    } = economicsSensitivitiesResults;

    const {
      analysisName,
      title: analysisTableTitle,
      sensitivitiesTable,
    } = selectedSensitivitiesData;

    const sensitivitiesTableStr = sensitivitiesTable.map(
      (row: any, i: number) => ({
        ...row,
        sn: i + 1,
        parameterValues: row.parameterValues.join(", "),
      })
    );

    const successAction = getEconomicsSensitivitiesByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        analysisName,
        analysisTableTitle,
        sensitivitiesTable: sensitivitiesTableStr,
      },
    });

    yield put(updateEconomicsParameterAction("showSensitivitiesTable", true));
  } catch (errors) {
    const failureAction = getEconomicsSensitivitiesByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
