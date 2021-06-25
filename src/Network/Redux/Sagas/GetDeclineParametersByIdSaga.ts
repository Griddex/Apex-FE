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
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineCurveParametersDialogParameters";
import {
  getDeclineParametersByIdFailureAction,
  getDeclineParametersByIdSuccessAction,
  GET_DECLINEPARAMETERSBYID_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchGetDeclineParametersByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getDeclineParametersByIdChan = yield actionChannel(
    GET_DECLINEPARAMETERSBYID_REQUEST
  );
  yield takeLeading(getDeclineParametersByIdChan, getDeclineParametersByIdSaga);
}

const config = { withCredentials: false };
const getDeclineParametersByIdAPI = (url: string) =>
  authService.get(url, config);

function* getDeclineParametersByIdSaga(action: IAction): Generator<
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
  const { selectedDeclineParametersId, reducer } = payload;
  const wc = "storedDataWorkflows";

  const { forecastingParametersStored } = yield select(
    (state) => state.networkReducer[wc]
  );
  const selectedWellDeclineParameterTitle = forecastingParametersStored.find(
    (row: any) => row.id === selectedDeclineParametersId
  );

  const declineParametersUrl = `${getBaseForecastUrl()}/well-decline-parameters/${selectedDeclineParametersId}`;

  try {
    const declineParametersResults = yield call(
      getDeclineParametersByIdAPI,
      declineParametersUrl
    );

    const {
      data: { data: selectedDeclineParametersData },
    } = declineParametersResults;

    const successAction = getDeclineParametersByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        selectedDeclineParametersData,
      },
    });

    const dialogParameters: DialogStuff = {
      name: "Display_Table_Data_Dialog",
      title: selectedWellDeclineParameterTitle,
      type: "tableDataDialog",
      show: true,
      exclusive: true,
      maxWidth: "lg",
      iconType: "information",
      actionsList: () => DialogCancelButton(),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    yield put(showDialogAction(dialogParameters));
  } catch (errors) {
    const failureAction = getDeclineParametersByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
