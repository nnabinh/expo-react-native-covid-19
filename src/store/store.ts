import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { persistStore } from 'redux-persist';
import { rootSaga } from './sagas';
import { rootReducer } from './reducers';
import Reactotron from './reactotron';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  compose(
    ...[
      applyMiddleware(sagaMiddleware),
      ...(__DEV__ ? [Reactotron.createEnhancer!()] : []),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ]
  )
);

// persistStore(store as any);

// then run the saga
sagaMiddleware.run(rootSaga);
