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
import { getTableDataByIdSuccessAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredProductionPrioritizationDialogParameters";
import {
  getProductionPrioritizationByIdFailureAction,
  GET_PRODUCTIONPRIORITIZATIONBYID_REQUEST,
  updateNetworkParametersAction,
} from "../Actions/NetworkActions";
import { extrudeStoredProductionPrioritization } from "../../Components/DialogParameters/EditDeclineParametersDialogParameters";
import { UPDATE_INPUT } from "../../../Import/Redux/Actions/InputActions";

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
  const {
    selectedProductionPrioritizationId,
    selectedProductionPrioritizationTitle,
    selectedRowIndex,
    reducer,
    isCreateOrEdit,
  } = payload;

  const productionPrioritizationUrl = `${getBaseForecastUrl()}/well-prioritization/${selectedProductionPrioritizationId}`;

  try {
    const productionPrioritizationResults = yield call(
      getProductionPrioritizationByIdAPI,
      productionPrioritizationUrl
    );

    const {
      data: { data },
    } = productionPrioritizationResults;

    const selectedTableData = data["wellPrioritizations"];
    const forecastInputDeckId = data["forecastInputDeckId"];

    const successAction = getTableDataByIdSuccessAction();
    console.log("put payload: ", {
      ...successAction,
      payload: {
        ...payload,
        reducer: "networkReducer",
        selectedTableData,
      },
    });

    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer: "networkReducer",
        selectedTableData,
      },
    });

    yield put(
      updateNetworkParametersAction({
        prioritizationPerspective: data["typeOfPrioritization"],
        selectedStreamPrioritization: data["typeOfStream"],
        useSecondaryFacility: data["useSecondaryFacility"],
      })
    );

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
        name: "Extrude_Prioritization_Parameters_Dialog",
        title: selectedProductionPrioritizationTitle,
        type: "productionStreamPrioritizationDialog",
        show: true,
        exclusive: false,
        maxWidth: "md",
        iconType: "information",
        selectedRowIndex,
        actionsList: () => DialogCancelButton(),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      yield put(showDialogAction(dialogParameters));
    } else {
      yield put(
        showDialogAction(
          extrudeStoredProductionPrioritization(
            "Edit Well Prioritization",
            "editForecastingParametersWorkflow"
          )
        )
      );
    }
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
