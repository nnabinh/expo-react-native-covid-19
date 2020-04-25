import { createAction, ActionType } from 'typesafe-actions';

export enum DashboardActionTypes {
  UPDATE_TODAY_DATA = 'dashboard/UPDATE_TODAY_DATA',
  UPDATE_TODAY_DATA_SUCCESS = 'dashboard/UPDATE_TODAY_DATA_SUCCESS',
  UPDATE_TODAY_DATA_ERROR = 'dashboard/UPDATE_TODAY_DATA_ERROR',
}

export const updateTodayData = createAction(
  DashboardActionTypes.UPDATE_TODAY_DATA
)<void>();
export const updateTodayDataSuccess = createAction(
  DashboardActionTypes.UPDATE_TODAY_DATA_SUCCESS
)<{
  data: {
    features: any[];
  };
}>();
export const updateTodayDataError = createAction(
  DashboardActionTypes.UPDATE_TODAY_DATA_ERROR
)<void>();

export type DashboardActions =
  | ActionType<typeof updateTodayData>
  | ActionType<typeof updateTodayDataSuccess>
  | ActionType<typeof updateTodayDataError>;
