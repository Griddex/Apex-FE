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
import { failureDialogParameters } from "../../Components/DialogParameters/EconomicsSuccessFailureDialogParameters";
import {
  getEconomicsResultsByIdFailureAction,
  getEconomicsResultsByIdSuccessAction,
  GET_ECONOMICSRESULTSBYID_REQUEST,
  updateEconomicsParameterAction,
} from "../Actions/EconomicsActions";

export default function* watchGetEconomicsResultsByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getEconomicsResultsByIdChan = yield actionChannel(
    GET_ECONOMICSRESULTSBYID_REQUEST
  );
  yield takeLeading(getEconomicsResultsByIdChan, getEconomicsResultsByIdSaga);
}

const config = {};
const getEconomicsResultsByIdAPI = (url: string) =>
  authService.get(url, config);

function* getEconomicsResultsByIdSaga(action: IAction): Generator<
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
  const { workflowProcess, switchToRoute, routeUrl } = payload;

  const { selectedEconomicsResultsId } = yield select(
    (state) => state.economicsReducer
  );
  const economicsResultsUrl = `${getBaseEconomicsUrl()}/analyses/${selectedEconomicsResultsId}`;
  const message = "Loading economics data...";

  try {
    yield put(showSpinnerAction(message));

    const economicsResultsResults = yield call(
      getEconomicsResultsByIdAPI,
      economicsResultsUrl
    );

    const {
      data: { data: selectedResultsData },
    } = economicsResultsResults;

    const successAction = getEconomicsResultsByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        selectedResultsData,
      },
    });

    yield put(updateEconomicsParameterAction("showResultsTable", true));
  } catch (errors) {
    const failureAction = getEconomicsResultsByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(
        failureDialogParameters(
          "Economics_Results_Failure_Dialog",
          "Economics Results Save Failure",
          true,
          "Economics Results",
          errors.message
        )
      )
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
