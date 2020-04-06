import { DashboardActionTypes, updateTodayDataError, updateTodayDataSuccess } from './actions';
import { takeLatest, put } from 'redux-saga/effects';

function* updateTodayData() {
  try {
    put(updateTodayDataSuccess());
  } catch {
    put(updateTodayDataError());
  }
}

export default function* dashboardSagas() {
  yield takeLatest(DashboardActionTypes.UPDATE_TODAY_DATA, updateTodayData);
}
