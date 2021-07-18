import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  TakeEffect,
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
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/SensitivitiesSuccessFailureDialogParameters";
import {
  fetchStoredEconomicsSensitivitiesRequestAction,
  saveEconomicsSensitivitiesFailureAction,
  SAVE_ECONOMICSSENSITIVITIES_REQUEST,
} from "../Actions/EconomicsActions";

export default function* watchSaveEconomicsSensitivitiesSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveEconomicsSensitivitiesChan = yield actionChannel(
    SAVE_ECONOMICSSENSITIVITIES_REQUEST
  );
  yield takeLeading(
    saveEconomicsSensitivitiesChan,
    saveEconomicsSensitivitiesSaga
  );
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* saveEconomicsSensitivitiesSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    analysisName,
    titleDesc: { title, description },
  } = payload;

  const aN = analysisName;
  const wc = "economicsAnalysisWorkflows";

  const { selectedSensitivitiesTable } = yield select(
    (state) => state.economicsReducer[wc]
  );

  //TODO Should be user scoped?
  const { currentProjectId } = yield select((state) => state.projectReducer);
  const data = {
    title,
    description,
    analysisName,
    sensitivitiesTable: selectedSensitivitiesTable,
  };

  const config = { withCredentials: true };
  const saveEconomicsSensitivitiesAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving economics sensivities data..."));

    const result = yield call(
      saveEconomicsSensitivitiesAPI,
      `${getBaseEconomicsUrl()}/sensitivities/save`
    );

    const {
      data: { data: economicsSensitivitiesId },
    } = result;

    yield put(
      fetchStoredEconomicsSensitivitiesRequestAction(currentProjectId, false)
    );
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveEconomicsSensitivitiesFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      // showDialogAction(failureDialogParameters(errors["errors"][0].message))
      showDialogAction(failureDialogParameters(errors.message))
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
