import { ActionType } from "@redux-saga/types";
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
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { generalSuccessDialogParameters } from "../../../Application/Components/DialogParameters/GeneralSuccessFailureDialogParameters";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import {
  updateInputParameterAction,
  validateForecastInputDeckFailureAction,
  VALIDATE_FORECASTINPUTDECK_REQUEST,
} from "../Actions/InputActions";

export default function* watchValidateForecastInputDeckSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const validateForecastInputDeckChan = yield actionChannel(
    VALIDATE_FORECASTINPUTDECK_REQUEST
  );
  yield takeLeading<ActionType>(
    validateForecastInputDeckChan,
    validateForecastInputDeckSaga
  );
}

function* validateForecastInputDeckSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const {
    payload: { workflowCategory, workflowProcess },
    meta,
  } = action;

  const { tableData: inputDeck } = yield select(
    (state) => state.inputReducer[workflowCategory][workflowProcess]
  );

  const data = {
    inputDeck,
  };

  const config = { withCredentials: false };
  const validateForecastInputDeckAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    if (meta?.showSpinner)
      yield put(showSpinnerAction(meta?.message as string));

    const result = yield call(
      validateForecastInputDeckAPI,
      `${getBaseForecastUrl()}/forecast-inputdeck/validate-inputdeck`
    );

    const {
      data: { data },
    } = result;

    if (Object.keys(data).length > 0) {
      yield put(
        updateInputParameterAction(
          "inputReducer",
          "inputReducer.validationErrorsData",
          data
        )
      );

      yield put(
        showDialogAction({
          name: "Validate_Forecast_InputDeck_Failure",
          title: "Forecast InputDeck Validation Failure",
          type: "forecastValidationErrorsDataDialog",
          show: true,
          exclusive: true,
          maxWidth: "lg",
          dialogText:
            "The following validation errors were found in your forecast inpudeck for your review",
          iconType: "error",
          actionsList: () => DialogCancelButton(),
          validationErrorsData: data,
        })
      );
    } else {
      yield put(
        showDialogAction(
          generalSuccessDialogParameters(
            "Validate_Forecast_InputDeck_Success",
            "Forecast InputDeck Validation Success",
            true,
            "Forecast inputdeck validation was successful!"
          )
        )
      );
    }
  } catch (errors) {
    const failureAction = validateForecastInputDeckFailureAction();

    yield put({
      ...failureAction,
      payload: { errors },
    });
  } finally {
    yield put(hideSpinnerAction());
  }
}
