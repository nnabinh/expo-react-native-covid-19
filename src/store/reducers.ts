import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { dashboardReducer } from '../dashboard/reducers';

const rootReducerBase = combineReducers({
  dashboard: dashboardReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = persistReducer(persistConfig, rootReducerBase)