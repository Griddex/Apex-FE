import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { getTableDataByIdSuccessAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineCurveParametersDialogParameters";
import {
  getDeclineParametersByIdFailureAction,
  GET_DECLINEPARAMETERSBYID_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchGetDeclineParametersByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  console.log("watchGetDeclineParametersByIdSaga Called:");

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
  console.log("DCA Parameters Action: ", action);
  const { payload } = action;
  const { selectedDeclineParametersId, wellDeclineParameterTitle, reducer } =
    payload;
  const wc = "storedDataWorkflows";

  const declineParametersUrl = `${getBaseForecastUrl()}/well-decline-parameters/${selectedDeclineParametersId}`;

  try {
    const declineParametersResults =  yield call(
      getDeclineParametersByIdAPI,
      declineParametersUrl
    );

    console.log("declineParametersResults: ", declineParametersResults);
    
    const {
      data: { data },
    } = declineParametersResults;
    const selectedTableData = data["declineParameters"];

    const successAction = getTableDataByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });

    const dialogParameters: DialogStuff = {
      name: "Display_Table_Data_Dialog",
      title: wellDeclineParameterTitle,
      type: "tableDataDialog",
      show: true,
      exclusive: true,
      maxWidth: "xl",
      iconType: "information",
      actionsList: () => DialogCancelButton(),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    //yield put(showDialogAction(dialogParameters));
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
