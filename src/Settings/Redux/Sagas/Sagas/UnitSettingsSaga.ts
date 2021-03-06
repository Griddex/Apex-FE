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
import * as authService from "../../../../Application/Services/AuthService";
import { getBaseUnitUrl } from "../../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../../Components/DialogActions/UnitSettingsSuccessFailureDialogParameters";
import {
  fetchUnitSettingsFailureAction,
  fetchUnitSettingsSuccessAction,
  FETCH_UNITSETTINGS_REQUEST,
  updateUnitsSettingsParameterAction,
} from "../../Actions/UnitSettingsActions";
import { IUnitsRow } from "../../State/UnitSettingsStateTypes";

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
  | PutEffect<IAction>
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
      data: { status, data: unitsData, succcess },
    } = result;

    const successAction = fetchUnitSettingsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, status, unitsData },
    });

    const { variableUnits, variableNameUnitsMap } = unitsData;

    const appUnitsUnitGroupsMap = variableUnits.reduce(
      (acc: any, row: IUnitsRow) => {
        const unitsObj = row.units.reduce((acd, u) => {
          return { ...acd, [u.title]: u.group };
        }, {});

        return { ...acc, ...unitsObj };
      },
      {}
    );

    const unitOptionsByVariableName = Object.keys(variableNameUnitsMap).reduce(
      (acc: Record<string, ISelectOption[]>, variableName: string) => {
        const options = variableNameUnitsMap[variableName].map(
          (unitRow: any) => ({
            value: unitRow.title,
            label: unitRow.title,
          })
        );

        return { ...acc, [variableName]: options };
      },
      {}
    ) as Record<string, ISelectOption[]>;

    yield put(
      updateUnitsSettingsParameterAction(
        "unitOptionsByVariableName",
        unitOptionsByVariableName
      )
    );

    yield put(
      updateUnitsSettingsParameterAction(
        "appUnitsUnitGroupsMap",
        appUnitsUnitGroupsMap
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
