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
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredEconomicsSensitivitiesDialogParameters";
import {
  getEconomicsSensitivitiesByIdFailureAction,
  getEconomicsSensitivitiesByIdSuccessAction,
  GET_ECONOMICSSENSITIVITIESBYID_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchGetEconomicsSensitivitiesByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getEconomicsSensitivitiesByIdChan = yield actionChannel(
    GET_ECONOMICSSENSITIVITIESBYID_REQUEST
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
  const wc = "economicsAnalysisWorkflows";

  const { payload, meta } = action;
  const { selectedEconomicsSensitivitiesId } = yield select(
    (state) => state.economicsReducer
  );
  const economicsSensitivitiesUrl = `${getBaseEconomicsUrl()}/sensitivities/${selectedEconomicsSensitivitiesId}`;

  try {
    yield put(showSpinnerAction(meta?.message as string));

    const economicsSensitivitiesResults = yield call(
      getEconomicsSensitivitiesByIdAPI,
      economicsSensitivitiesUrl
    );

    const {
      data: { data },
    } = economicsSensitivitiesResults;

    const { analysisName, title, sensitivitiesTable } = data;

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
        sensitivitiesTableTitle: title,
        sensitivitiesTable: sensitivitiesTableStr,
      },
    });

    yield put(
      updateEconomicsParameterAction(`${wc}.showSensitivitiesTable`, true)
    );
    yield put(
      updateEconomicsParameterAction(`sensitivitiesTable`, sensitivitiesTable)
    );
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
