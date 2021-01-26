import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import formatDate from "../../../Application/Utils/FormatDate";
import { openRecentProjectAction } from "../../../Project/Redux/Actions/ProjectActions";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingDataDialogParameters";
import { IExistingDataRow } from "../../Routes/Common/InputLayoutTypes";
import {
  shirleyImg,
  anitaImg,
  glenImg,
  kerryImg,
  johnImg,
} from "../../Utils/iconImages";
import {
  EXISTINGDATA_REQUEST,
  fetchExistingDataSuccessAction,
  fetchExistingDataFailureAction,
} from "../Actions/ExistingDataActions";

export default function* watchFetchExistingDataSaga() {
  yield takeLatest(EXISTINGDATA_REQUEST, fetchExistingDataSaga);
}

function getInsert(workflowProcess: string) {
  switch (workflowProcess) {
    case "facilitiesInputDeckApproveddeck":
      return "FACILITIES";
    case "forecastInputDeckApproveddeck":
      return "FORECAST";
    case "economicsDataApproved":
      return "ECONOMICS";
    default:
      break;
  }
}

function* fetchExistingDataSaga(action: IAction) {
  const { payload } = action;
  const { dataType, workflowProcess } = payload;
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
        status: "Approved",
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
    console.log(
      "Logged output --> ~ file: FetchExistingDataSaga.ts ~ line 46 ~ function*fetchExistingDataSaga ~ existingData",
      existingData
    );

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

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}

function* handleClick(userId: string, projectId: string) {
  // const action = openRecentProjectAction(userId,projectId);
  // yield put({ ...action, userId, projectId });
  yield put(openRecentProjectAction(userId, projectId));
}
