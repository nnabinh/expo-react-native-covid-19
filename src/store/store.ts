import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { rootReducer } from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

persistStore(store as any);

// then run the saga
sagaMiddleware.run(rootSaga);
