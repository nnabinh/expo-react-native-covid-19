import { Reducer } from 'redux';
import flatten from 'lodash/flatten';
import { DashboardActionTypes } from './actions';
import { ApplicationState, ApplicationAction } from '../store';

type CollectionsState = {
  isFetchingTodayData: boolean;
  data: {
    [prefecture: string]: {
      name: string;
      locations: {
        latitude: number;
        longitude: number;
      }[];
    };
  } | null;
  updatedAt: Date;
  error: Error | null;
};

const defaultValue: CollectionsState = {
  isFetchingTodayData: false,
  data: null,
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
      console.log('test: ', action.payload.data);
      return {
        ...state,
        data: action.payload.data.features.reduce(
          (result: any, item: any) => ({
            ...result,
            [item.properties.NAME_1]: {
              name: item.properties.NAME_1,
              locations: flatten(flatten(item.geometry.coordinates)).map(
                (location: any) => ({
                  latitude: location[0],
                  longitude: location[1],
                })
              ),
            },
          }),
          {}
        ),
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
