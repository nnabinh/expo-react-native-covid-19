import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { persistStore } from 'redux-persist';
import { rootSaga } from './sagas';
import { rootReducer } from './reducers';
import Reactotron from './reactotron';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  compose(...[
    applyMiddleware(sagaMiddleware),
    ...__DEV__ ? [Reactotron.createEnhancer!()] : [],
  ])
);

// persistStore(store as any);

// then run the saga
sagaMiddleware.run(rootSaga);
