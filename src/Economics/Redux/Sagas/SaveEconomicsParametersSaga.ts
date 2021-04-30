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
} from "../../Components/DialogParameters/CostsRevenueSuccessFailureDialogParameters";
import {
  fetchExistingEconomicsParametersDataRequestAction,
  saveEconomicsParametersFailureAction,
  saveEconomicsParametersSuccessAction,
  SAVEECONOMICSPARAMETERS_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchSaveEconomicsParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveEconomicsParametersChan = yield actionChannel(
    SAVEECONOMICSPARAMETERS_REQUEST
  );
  yield takeLeading(saveEconomicsParametersChan, saveEconomicsParametersSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* saveEconomicsParametersSaga(
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
  const { workflowProcess, reducer } = payload;
  const wp = workflowProcess;
  const wc = "inputDataWorkflows";

  const { userId } = yield select((state) => state.loginReducer);
  const { projectId } = yield select((state) => state.projectReducer);

  const {
    economicsParametersTitle,
    economicsParametersDescription,
  } = yield select((state) => state.economicsReducer);

  const { tableData: costRevenues, variableUnits } = yield select(
    (state) => state[reducer][wc][wp]
  );

  const { savedMatchObjectAll: matchObject } = yield select(
    (state) => state.applicationReducer
  );

  const data = {
    userId: "Gift",
    projectId,
    title: economicsParametersTitle,
    description: economicsParametersDescription,
    matchObject,
    variableUnits,
  };

  const config = { withCredentials: false };
  const saveEconomicsParametersAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving economics parameters data..."));

    const result = yield call(
      saveEconomicsParametersAPI,
      `${getBaseEconomicsUrl()}/parameter/save`
    );

    const {
      data: { data: selectedEconomicsParametersId }, //prevent 2nd trip to server
      status,
      success,
    } = result;

    const successAction = saveEconomicsParametersSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, success, selectedEconomicsParametersId },
    });

    yield put(
      updateEconomicsParameterAction(
        "selectedEconomicsParametersTitle",
        economicsParametersTitle
      )
    );
    yield put(fetchExistingEconomicsParametersDataRequestAction());
    yield put(showDialogAction(successDialogParameters()));
  } catch (errors) {
    const failureAction = saveEconomicsParametersFailureAction();

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
