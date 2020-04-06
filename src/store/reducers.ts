import { combineReducers, $CombinedState } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { dashboardReducer } from '../dashboard/reducers';

const rootReducerBase = combineReducers({
  dashboard: dashboardReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export type RootState = Omit<ReturnType<typeof rootReducer>, typeof $CombinedState>;

export const rootReducer = persistReducer(persistConfig, rootReducerBase)