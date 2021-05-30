import uniqBy from "lodash.uniqby";
import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../../Application/Services/AuthService";
import getBaseForecastUrl, {
  getBaseUnitUrl,
} from "../../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../../Components/DialogActions/UnitSettingsSuccessFailureDialogParameters";
import {
  fetchUnitSettingsFailureAction,
  fetchUnitSettingsSuccessAction,
  FETCH_UNITSETTINGS_REQUEST,
  updateUnitsSettingsParameterAction,
} from "../../Actions/UnitSettingsActions";
import {
  IUnitsRow,
  TVariableName,
  TVariableTitle,
  TVariableTitleNameMap,
} from "../../State/UnitSettingsStateTypes";

export default function* watchFetchUnitSettingsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const fetchUnitSettingsChan = yield actionChannel(FETCH_UNITSETTINGS_REQUEST);
  yield takeLeading(fetchUnitSettingsChan, fetchUnitSettingsSaga);
}

function* fetchUnitSettingsSaga(
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

  const config = { withCredentials: false };
  const fetchUnitSettingsAPI = (url: string) => authService.get(url, config);

  try {
    const result = yield call(
      fetchUnitSettingsAPI,
      `${getBaseUnitUrl()}/global-variableunit/detail`
    );

    const {
      data: { status, data: unitsData, succcess }, //prevent 2nd trip to server
    } = result;

    const successAction = fetchUnitSettingsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, unitsData },
    });

    const { variableUnits, variableNameUnitsMap } = unitsData;

    const variableTitleNameMap = variableUnits.reduce(
      (acc: TVariableTitleNameMap, row: IUnitsRow) => {
        return {
          ...acc,
          [row.variableTitle as TVariableTitle]:
            row.variableName as TVariableName,
        };
      },
      {} as TVariableTitleNameMap
    );

    const unitOptions: ISelectOption[] = variableUnits.reduce(
      (acc: ISelectOption[], row: IUnitsRow) => {
        const units = row.units.map((u) => ({
          value: u.unitId,
          label: u.title,
        }));
        return [...acc, ...units];
      },
      []
    );
    const uniqUnitOptions = uniqBy(unitOptions, (o) => o.label);

    const path = "uniqUnitOptions";
    const value = uniqUnitOptions;
    const updateAction = updateUnitsSettingsParameterAction(path, value);
    yield put(updateAction);

    yield put(
      updateUnitsSettingsParameterAction(
        "variableTitleNameMap",
        variableTitleNameMap
      )
    );
    yield put(
      updateUnitsSettingsParameterAction(
        "variableNameUnitsMap",
        variableNameUnitsMap
      )
    );
  } catch (errors) {
    const failureAction = fetchUnitSettingsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }
}
