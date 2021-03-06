import { Reducer } from 'redux';
import flatten from 'lodash/flatten';
import { DashboardActionTypes } from './actions';
import { ApplicationState, ApplicationAction } from '../store';
import moment from 'moment';

type CollectionsState = {
  isFetchingTodayData: boolean;
  prefectures: {
    code: number;
    ja: string;
    en: string;
    value: number;
  }[];
  dailyCases: {
    date: Date;
    value: number;
  }[];
  updatedAt: Date;
  error: Error | null;
};

const defaultValue: CollectionsState = {
  isFetchingTodayData: false,
  prefectures: [],
  dailyCases: [],
  updatedAt: new Date(),
  error: null,
};

export const dashboardReducer: Reducer<CollectionsState, ApplicationAction> = (
  state = defaultValue,
  action: ApplicationAction
) => {
  switch (action.type) {
    case DashboardActionTypes.UPDATE_TODAY_DATA:
      return {
        ...state,
        isFetchingTodayData: true,
      };
    case DashboardActionTypes.UPDATE_TODAY_DATA_SUCCESS:
      return {
        ...state,
        prefectures: action.payload.data['prefectures-map'],
        dailyCases: action.payload.data.transition.cases.map((item: any) => ({
          date: moment(
            `${item[0]}-${item[1]}-${item[2]}`,
            'YYYY-MM-DD'
          ).toDate(),
          value: item[3],
        })),
        updatedAt: new Date(),
        isFetchingTodayData: false,
      };
    case DashboardActionTypes.UPDATE_TODAY_DATA_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetchingTodayData: false,
      };
    default:
      return state;
  }
};
