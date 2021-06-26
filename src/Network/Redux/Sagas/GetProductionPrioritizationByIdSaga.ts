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
import { getTableDataByIdSuccessAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredProductionPrioritizationDialogParameters";
import {
  getProductionPrioritizationByIdFailureAction,
  getProductionPrioritizationByIdSuccessAction,
  GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchGetProductionPrioritizationByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getProductionPrioritizationByIdChan = yield actionChannel(
    GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST
  );
  yield takeLeading(
    getProductionPrioritizationByIdChan,
    getProductionPrioritizationByIdSaga
  );
}

const config = { withCredentials: false };
const getProductionPrioritizationByIdAPI = (url: string) =>
  authService.get(url, config);

function* getProductionPrioritizationByIdSaga(action: IAction): Generator<
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
  const { selectedProductionPrioritizationId } = yield select(
    (state) => state.networkReducer
  );

  const reducer = "networkReducer";
  const productionPrioritizationUrl = `${getBaseForecastUrl()}/well-prioritization/${selectedProductionPrioritizationId}`;

  try {
    const productionPrioritizationResults = yield call(
      getProductionPrioritizationByIdAPI,
      productionPrioritizationUrl
    );

    const {
      data: { data: selectedTableData },
    } = productionPrioritizationResults;

    const successAction = getTableDataByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });
  } catch (errors) {
    const failureAction = getProductionPrioritizationByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
