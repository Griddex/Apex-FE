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
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredProductionPrioritizationDialogParameters";
import {
  STORED_PRODUCTIONPRIORITIZATION_REQUEST,
  fetchStoredProductionPrioritizationFailureAction,
  fetchStoredProductionPrioritizationSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredProductionPrioritizationSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedProductionPrioritizationChan = yield actionChannel(
    STORED_PRODUCTIONPRIORITIZATION_REQUEST
  );
  yield takeLeading(
    storedProductionPrioritizationChan,
    fetchStoredProductionPrioritizationSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchStoredProductionPrioritizationAPI>;

const config = { withCredentials: false };
const fetchStoredProductionPrioritizationAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredProductionPrioritizationSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { projectId } = payload;

  const productionPrioritizationsUrl = `${getBaseForecastUrl()}/well-prioritization/light/${projectId}`;

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchStoredProductionPrioritizationAPI,
      productionPrioritizationsUrl
    );

    const {
      data: { data: productionPrioritizationStored },
    } = result;

    const successAction = fetchStoredProductionPrioritizationSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        productionPrioritizationStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "productionPrioritizationTitles",
        productionPrioritizationStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredProductionPrioritizationFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
