import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../../Application/Services/AuthService";
import getBaseUrl from "../../../../Application/Services/BaseUrlService";
import { INewProjectFormValues } from "../../../../Project/Redux/State/ProjectStateTypes";
import { failureDialogParameters } from "../../../Components/DialogActions/UnitSettingsSuccessFailureDialogParameters";
import {
  fetchUnitSettingsFailureAction,
  fetchUnitSettingsSuccessAction,
  FETCH_UNITSETTINGS_REQUEST,
} from "../../Actions/UnitSettingsActions";
import { IUnitSettingsData } from "../../State/UnitSettingsStateTypes";

export default function* watchFetchUnitSettingsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const fetchUnitSettingsChan = yield actionChannel(FETCH_UNITSETTINGS_REQUEST);
  yield takeLeading(fetchUnitSettingsChan, fetchUnitSettingsSaga);
}

function* fetchUnitSettingsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;

  const config = { withCredentials: false };
  const fetchUnitSettingsAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchUnitSettingsAPI,
      `${getBaseUrl()}/global-variableunit/detail`
    );

    const {
      data: { status, data: unitsData, succcess }, //prevent 2nd trip to server
    } = result;

    const successAction = fetchUnitSettingsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, unitsData },
    });
  } catch (errors) {
    const failureAction = fetchUnitSettingsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
