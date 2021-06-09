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
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingProductionPrioritizationDialogParameters";
import {
  EXISTING_PRODUCTIONPRIORITIZATION_REQUEST,
  fetchExistingProductionPrioritizationFailureAction,
  fetchExistingProductionPrioritizationSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchExistingProductionPrioritizationSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingProductionPrioritizationChan = yield actionChannel(
    EXISTING_PRODUCTIONPRIORITIZATION_REQUEST
  );
  yield takeLeading(
    existingProductionPrioritizationChan,
    fetchExistingProductionPrioritizationSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchExistingProductionPrioritizationAPI>;

const config = { withCredentials: false };
const fetchExistingProductionPrioritizationAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingProductionPrioritizationSaga(
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
  const { projectId } = yield select((state) => state.projectReducer);

  const productionPrioritizationUrl = `${getBaseForecastUrl()}/well-prioritization/light/${projectId}`;

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchExistingProductionPrioritizationAPI,
      productionPrioritizationUrl
    );

    const {
      data: { data: productionPrioritization },
    } = result;

    const successAction = fetchExistingProductionPrioritizationSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        productionPrioritization,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingProductionPrioritizationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
