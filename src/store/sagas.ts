import { fork, all } from 'redux-saga/effects';
import dashboardSagas from '../dashboard/sagas';

const sagas = [
  dashboardSagas,
];

export function* rootSaga() {
  yield all(sagas.map(fork));
}
