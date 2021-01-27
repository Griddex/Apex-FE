import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import {
  fetchRecentProjectsFailureAction,
  fetchRecentProjectsSuccessAction,
  FETCHRECENTPROJECTS_REQUEST,
  openRecentProjectAction,
} from "../Actions/ProjectActions";
import { IRecentProject } from "../State/ProjectStateTypes";

export default function* watchFetchRecentProjectsSaga() {
  yield takeLatest(FETCHRECENTPROJECTS_REQUEST, fetchRecentProjectsSaga);
}

function* fetchRecentProjectsSaga(action: IAction) {
  const { payload } = action;
  const { failureDialogParameters } = payload;
  const { userId } = yield select((state) => state.loginReducer);

  const config = { headers: null };
  const fetchRecentProjectsAPI = (url: string) => authService.get(url, config);

  try {
    const response = yield call(
      fetchRecentProjectsAPI,
      // "https://jsonplaceholder.typicode.com/posts"
      "http://2d2e41e0fd3c.ngrok.io/api/project/recents/6"
    );
    console.log(
      "Logged output --> ~ file: FetchRecentProjectsSaga.ts ~ line 32 ~ function*fetchRecentProjectsSaga ~ response",
      response
    );

    const { statusCode, data } = response;
    const data1 = [
      {
        createdAt: "2021-01-11T08:58:14.077Z",
        title: "Forecasting Project",
        userId: "Gift",
        classification: "Field",
        variableUnits: [],
        id: "5ffc13334da303410056b22d",
      },
      {
        createdAt: "2021-01-16T16:27:48.422Z",
        title: "Network Project AAA",
        userId: "Gift",
        classification: "Field",
        variableUnits: [
          {
            _id: "600321864053843f3cfe1c8b",
            name: "Diameter",
            databaseUnitId: "500",
            displayUnitId: "2229",
          },
          {
            _id: "600321874053843f3cfe1c8c",
            name: "Pressure",
            databaseUnitId: "1",
            displayUnitId: "2",
          },
          {
            _id: "5ff4327b9373123ca87d57a8",
            name: "I.D",
            databaseUnitId: "3",
            displayUnitId: "3",
          },
          {
            _id: "5ff4327b9373123ca87d57a9",
            name: "GOR",
            databaseUnitId: "4",
            displayUnitId: "4",
          },
        ],
        id: "6003152ebf361022e8ba3afd",
      },
      {
        createdAt: "2021-01-16T18:48:01.519Z",
        title: "Apex Project 66666785343",
        userId: "Gift",
        classification: "Field",
        variableUnits: [
          {
            _id: "600337dc7257360acccbbe06",
            name: "Diameter",
            databaseUnitId: "90",
            displayUnitId: "90",
          },
          {
            _id: "600337dc7257360acccbbe07",
            name: "Pressure",
            databaseUnitId: "11",
            displayUnitId: "12",
          },
          {
            _id: "5ff4327b9373123ca87d57a8",
            name: "I.D",
            databaseUnitId: "3",
            displayUnitId: "3",
          },
          {
            _id: "5ff4327b9373123ca87d57a9",
            name: "GOR",
            databaseUnitId: "4",
            displayUnitId: "4",
          },
        ],
        id: "6003375c7257360acccbbe01",
      },
    ];

    const recentProjects = data.map((row: IRecentProject) => ({
      title: row.title,
      id: row.projectId,
      toggleSN: true,
      handleClick: () => handleClick(userId, row.projectId as string),
    }));

    const successAction = fetchRecentProjectsSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, recentProjects },
    });
  } catch (errors) {
    const failureAction = fetchRecentProjectsFailureAction();

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
