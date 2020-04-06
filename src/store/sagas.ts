import { fork, all } from 'redux-saga/effects';

const sagas: any[] = [];

export function* rootSaga() {
  yield all(sagas.map(fork));
}
