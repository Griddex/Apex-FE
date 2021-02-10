import { call, put, takeLeading } from "redux-saga/effects";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../../Application/Services/AuthService";
import { INewProjectFormValues } from "../../../../Project/Redux/State/ProjectStateTypes";
import { failureDialogParameters } from "../../../Components/DialogActions/UnitSettingsSuccessFailureDialogParameters";
import {
  fetchUnitSettingsFailureAction,
  fetchUnitSettingsSuccessAction,
  FETCH_UNITSETTINGS_REQUEST,
} from "../../Actions/UnitSettingsActions";
import { IUnitSettingsData } from "../../State/UnitSettingsStateTypes";

export default function* watchFetchUnitSettingsSaga() {
  yield takeLeading(FETCH_UNITSETTINGS_REQUEST, fetchUnitSettingsSaga);
}

function* fetchUnitSettingsSaga(action: IAction) {
  const { payload } = action;

  const config = { headers: null };
  const fetchUnitSettingsAPI = (url: string) => authService.get(url, config);

  try {
    const response = yield call(
      fetchUnitSettingsAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const { statusCode, data } = response;

    const unitsData: IUnitSettingsData &
      Pick<INewProjectFormValues, "pressureAddend"> = {
      pressureAddend: 14.7, //convert to g to a and vice versa
      dayFormat: "dd",
      monthFormat: "mm",
      yearFormat: "yyyy",
      unitGroup: "Field",
      variableUnits: [
        {
          variableName: "oilRate", //send
          variableTitle: "Oil Rate",
          variableId: "hsajflbshjdbls", //send
          displayUnitId: "shvdhsdvshds", //Send
          units: [
            { title: "bbl Oil/day", group: "field", unitId: "shvdhsdvshds" },
            { title: "stb/day", group: "field", unitId: "shvdhshgmkdvshds" },
            { title: "m3/day", group: "metric", unitId: "aasf" },
            { title: "cm3/day", group: "metric", unitId: "jhkk" },
            { title: "Unit3", group: "metric", unitId: "hfhdd" },
          ],
        },
        {
          variableName: "liquidRate", //send
          variableTitle: "Liquid Rate",
          variableId: "vhcsyefgdvcjhssd", //send
          displayUnitId: "rjbvvbvhdvjl", //Send
          units: [
            { title: "bbl Oil/day", group: "field", unitId: "rjbvvbvhdvjl" },
            { title: "stb/day", group: "field", unitId: "dsgfhgdgv" },
            { title: "m3/day", group: "metric", unitId: "ertghg" },
            { title: "cm3/day", group: "metric", unitId: "aevc" },
            { title: "dm3/day", group: "metric", unitId: "kjhgvc" },
          ],
        },
        {
          variableName: "gasRate", //send
          variableTitle: "Gas Rate",
          variableId: "yfdsyhfsydshlshdl", //send
          displayUnitId: "trowuythfewh", //Send
          units: [
            { title: "MScf/day", group: "field", unitId: "trowuythfewh" },
            { title: "MMScf/day", group: "field", unitId: "isvtu" },
            { title: "m3/day", group: "metric", unitId: "qhgfqq" },
            { title: "cm3/day", group: "metric", unitId: "zzzcfhjk" },
            { title: "Unit3", group: "metric", unitId: "kolohggf" },
          ],
        },
      ],
    };

    const successAction = fetchUnitSettingsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, unitsData },
    });
  } catch (errors) {
    const failureAction = fetchUnitSettingsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
