import { call, put, takeLatest } from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../Application/Types/ApplicationTypes";
import formatDate from "../../../Application/Utils/FormatDate";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingDataDialogParameters";
import {
  anitaImg,
  glenImg,
  johnImg,
  kerryImg,
  shirleyImg,
} from "../../Utils/iconImages";
import {
  EXISTINGDATA_REQUEST,
  fetchExistingDataFailureAction,
  fetchExistingDataSuccessAction,
} from "../Actions/ExistingDataActions";

export default function* watchFetchExistingDataSaga() {
  yield takeLatest(EXISTINGDATA_REQUEST, fetchExistingDataSaga);
}

function getInsert(workflowProcess: IExistingDataProps["workflowProcess"]) {
  switch (workflowProcess) {
    case "facilitiesInputDeckExisting":
      return "FACILITIES";
    case "forecastInputDeckExisting":
      return "FORECAST";
    case "economicsInputDataExisting":
      return "ECONOMICS";
    case "productionInputDataExisting":
      return "PRODUCTION";
    case "networkExisting":
      return "NETWORK";
    default:
      break;
  }
}

function* fetchExistingDataSaga(action: IAction) {
  const { payload } = action;
  const { dataType, workflowCategory, workflowProcess } = payload;

  //use dataType to tell backend what data you are looking for
  const config = { headers: null };
  const fetchExistingDataAPI = (url: string) => authService.get(url, config);

  try {
    const response = yield call(
      fetchExistingDataAPI,
      "https://jsonplaceholder.typicode.com/posts"
      // "http://a4b6b400f0c6.ngrok.io/api/project"
    );

    const { statusCode, data } = response;
    //TODO: API saga to get entire units object from server
    const { existingDataId } = data;
    const insert = getInsert(workflowProcess);
    const existingData: IExistingDataRow[] = [
      {
        status: "Existing",
        title: `ARPR_${insert}_DECK 2020`,
        author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
        description: "Description 1",
        approvers: [
          { avatarUrl: anitaImg, name: "Anita Stragan" },
          { avatarUrl: glenImg, name: "Glen Moore John III" },
          { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
        ],
        createdOn: formatDate(new Date(2019, 9, 23)),
        modifiedOn: formatDate(new Date(2019, 11, 23)),
      },
      {
        status: "Pending",
        title: `ARPR_${insert}_DECK 2019`,
        author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
        description: "Description 2",
        approvers: [
          { avatarUrl: anitaImg, name: "Anita Stragan" },
          { avatarUrl: glenImg, name: "Glen Moore John III" },
          { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
        ],
        createdOn: formatDate(new Date(2019, 9, 23)),
        modifiedOn: formatDate(new Date(2019, 11, 23)),
      },
      {
        status: "Returned",
        title: `ARPR_${insert}_DECK 2018`,
        author: { avatarUrl: johnImg, name: "John Bravo" },
        description: "Description 3",
        approvers: [
          { avatarUrl: anitaImg, name: "Anita Stragan" },
          { avatarUrl: glenImg, name: "Glen Moore John III" },
          { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
        ],
        createdOn: formatDate(new Date(2019, 9, 23)),
        modifiedOn: formatDate(new Date(2019, 11, 23)),
      },
    ];

    const successAction = fetchExistingDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        statusCode,
        existingData,
        existingDataId,
        workflowProcess,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingDataFailureAction();
    console.log("heyyyyyyyyyyyyyyyy mennnnnnnnnnnnnnnn");
    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
