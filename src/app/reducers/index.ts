import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserState, userReducer } from '../user/user.reducer';

export interface State {
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
