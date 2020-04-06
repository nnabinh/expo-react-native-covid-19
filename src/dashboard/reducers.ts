import { Reducer } from 'redux';
import { DashboardActionTypes } from './actions';
import { ApplicationState, ApplicationAction } from '../store';

type CollectionsState = {
  isFetchingTodayData: boolean,
};

const defaultValue: CollectionsState = {
  isFetchingTodayData: false,
};

export const dashboardReducer: Reducer<CollectionsState, ApplicationAction> = (
  state = defaultValue,
  action: ApplicationAction,
) => {
  switch (action.type) {
    case DashboardActionTypes.UPDATE_TODAY_DATA:
      return {
        ...state,
        isFetchingTodayData: true,
      };
    case DashboardActionTypes.UPDATE_TODAY_DATA_SUCCESS:
    case DashboardActionTypes.UPDATE_TODAY_DATA_ERROR:
      return {
        ...state,
        isFetchingTodayData: false,
      };
    default:
      return state;
  }
};
