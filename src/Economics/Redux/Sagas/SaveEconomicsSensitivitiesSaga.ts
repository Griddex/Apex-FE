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
  saveEconomicsSensitivitiesSuccessAction,
  SAVEECONOMICSSENSITIVITIES_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchSaveEconomicsSensitivitiesSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveEconomicsSensitivitiesChan = yield actionChannel(
    SAVEECONOMICSSENSITIVITIES_REQUEST
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
  const { analysisName } = payload;

  const aN = analysisName;
  const wc = "economicsAnalysisWorkflows";

  const { economicsSensitivitiesTitle, economicsSensitivitiesDescription } =
    yield select((state) => state.economicsReducer);
  const { selectedSensitivitiesTable } = yield select(
    (state) => state.economicsReducer[wc]
  );

  //Should be user scoped?
  const { projectId } = yield select((state) => state.projectReducer);
  const data = {
    title: economicsSensitivitiesTitle,
    description: economicsSensitivitiesDescription,
    analysisName,
    sensitivitiesTable: selectedSensitivitiesTable,
  };

  const config = { withCredentials: false };
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

    const successAction = saveEconomicsSensitivitiesSuccessAction();
    // yield put({
    //   ...successAction,
    //   payload: {
    //     ...payload,
    //     status,
    //     success,
    //     selectedEconomicsSensitivitiesId,
    //   },
    // });

    yield put(
      updateEconomicsParameterAction(
        "selectedEconomicsSensitivitiesId",
        economicsSensitivitiesId
      )
    );
    yield put(
      updateEconomicsParameterAction(
        "selectedEconomicsSensitivitiesTitle",
        economicsSensitivitiesTitle
      )
    );

    yield put(updateEconomicsParameterAction("showSensitivitiesTable", true));
    yield put(fetchStoredEconomicsSensitivitiesRequestAction(projectId, false));
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
