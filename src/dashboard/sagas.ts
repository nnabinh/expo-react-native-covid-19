import {
  DashboardActionTypes,
  updateTodayDataError,
  updateTodayDataSuccess,
} from './actions';
import { takeLatest, put, call } from 'redux-saga/effects';

const DASHBOARD_DATA_SOURCE_URL =
  'https://covid19japan.com/static/prefectures.geojson';

function* updateTodayData() {
  try {
    const response = yield call(fetch, DASHBOARD_DATA_SOURCE_URL);
    const data = yield response.json();
    console.log(data);

    yield put(updateTodayDataSuccess({ data }));
  } catch {
    yield put(updateTodayDataError());
  }
}

export default function* dashboardSagas() {
  yield takeLatest(DashboardActionTypes.UPDATE_TODAY_DATA, updateTodayData);
}
