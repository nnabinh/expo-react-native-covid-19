import { DashboardActionTypes, updateTodayDataSuccess } from './actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import { mockData } from './mockData';

const DASHBOARD_DATA_SOURCE_URL =
  'https://toyokeizai.net/sp/visual/tko/covid19/data/data.json';

function* updateTodayData() {
  try {
    const response = yield call(fetch, DASHBOARD_DATA_SOURCE_URL);
    const data = yield response.json();
    console.log(data);
    yield put(updateTodayDataSuccess({ data }));
  } catch (error) {
    console.warn(error);
    yield put(updateTodayDataSuccess({ data: mockData }));
  }
}

export default function* dashboardSagas() {
  yield takeLatest(DashboardActionTypes.UPDATE_TODAY_DATA, updateTodayData);
}
