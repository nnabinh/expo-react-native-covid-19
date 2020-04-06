import { DashboardActions } from '../dashboard/actions';

// Please add all dispatched ActionTypes here
export type ApplicationAction = DashboardActions;

type ExtractActionOf<Type extends string, U extends { type: string }> = U extends { type: Type } ? U : never;

export type ActionOf<Type extends string> = ExtractActionOf<Type, ApplicationAction>;
