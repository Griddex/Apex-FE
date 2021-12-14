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
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineCurveParametersDialogParameters";
import {
  getDeclineParametersByIdFailureAction,
  GET_DECLINEPARAMETERSBYID_REQUEST,
  UPDATE_NETWORKPARAMETER,
} from "../Actions/NetworkActions";
import { UPDATE_INPUT } from "../../../Import/Redux/Actions/InputActions";
import { extrudeStoredDataDPs } from "../../Components/DialogParameters/EditDeclineParametersDialogParameters";

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
  const {
    reducer,
    isCreateOrEdit,
    wellDeclineParamtersId,
    wellDeclineParamtersTitle,
    currentSN,
    currentRow,
  } = payload;
  const selectedDeclineParametersId = wellDeclineParamtersId;
  const wellDeclineParameterTitle = wellDeclineParamtersTitle;
  const wc = "storedDataWorkflows";

  const declineParametersUrl = `${getBaseForecastUrl()}/well-decline-parameters/${selectedDeclineParametersId}`;

  try {
    yield put(showSpinnerAction("Loading..."));

    const declineParametersResults = yield call(
      getDeclineParametersByIdAPI,
      declineParametersUrl
    );

    const {
      data: { data },
    } = declineParametersResults;
    const selectedTableData = data["declineParameters"];
    const forecastInputDeckId = data["forecastInputDeckId"];

    const successAction = getTableDataByIdSuccessAction();

    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });

    yield put({
      type: UPDATE_INPUT,
      payload: {
        nameOrPath: "selectedForecastInputDeckId",
        value: forecastInputDeckId,
        reducer: "inputReducer",
      },
    });

    if (isCreateOrEdit == false) {
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
      yield put(showDialogAction(dialogParameters));
    } else {
      yield put({
        type: UPDATE_NETWORKPARAMETER,
        payload: {
          path: "selectedDeclineParametersData",
          value: selectedTableData,
        },
      });

      yield put(
        showDialogAction(
          extrudeStoredDataDPs(
            "Modify Decline Parameters",
            currentRow,
            currentSN - 1,
            "editForecastingParametersWorkflow"
          )
        )
      );
    }
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
