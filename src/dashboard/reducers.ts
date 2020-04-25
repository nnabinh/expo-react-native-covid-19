import { Reducer } from 'redux';
import flatten from 'lodash/flatten';
import { DashboardActionTypes } from './actions';
import { ApplicationState, ApplicationAction } from '../store';

type CollectionsState = {
  isFetchingTodayData: boolean;
  data: {
    [prefecture: string]: {
      latitude: number;
      longitude: number;
    }[];
  };
  updatedAt: Date;
};

const defaultValue: CollectionsState = {
  isFetchingTodayData: false,
  data: {},
  updatedAt: new Date(),
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
            [item.properties.NAME_1]: flatten(
              flatten(item.geometry.coordinates)
            ).map((location: any) => ({
              latitude: location[0],
              longitude: location[1],
            })),
          }),
          {}
        ),
        updatedAt: new Date(),
        isFetchingTodayData: false,
      };
    case DashboardActionTypes.UPDATE_TODAY_DATA_ERROR:
      return {
        ...state,
        isFetchingTodayData: false,
      };
    default:
      return state;
  }
};
