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
import { failureDialogParameters } from "../../Components/DialogParameters/EconomicsSuccessFailureDialogParameters";
import {
  STORED_ECONOMICSRESULTS_REQUEST,
  fetchStoredEconomicsResultsFailureAction,
  fetchStoredEconomicsResultsSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchStoredEconomicsResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedEconomicsResultsChan = yield actionChannel(
    STORED_ECONOMICSRESULTS_REQUEST
  );
  yield takeLeading(
    storedEconomicsResultsChan,
    fetchStoredEconomicsResultsSaga
  );
}

const config = { withCredentials: false };
const fetchStoredEconomicsResultsAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredEconomicsResultsSaga(action: IAction): Generator<
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
  const { projectId } = payload;

  const economicsResultsUrl = `${getBaseEconomicsUrl()}/analyses/analysisresults/light/${projectId}`;

  try {
    const economicsResultsResults = yield call(
      fetchStoredEconomicsResultsAPI,
      economicsResultsUrl
    );

    const {
      data: { data: economicsResultsStored },
    } = economicsResultsResults;

    const successAction = fetchStoredEconomicsResultsSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        economicsResultsStored,
      },
    });
  } catch (errors) {
    const failureAction = fetchStoredEconomicsResultsFailureAction();

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
    yield put(hideSpinnerAction());
  }
}
