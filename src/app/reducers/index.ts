import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserState, userReducer } from '../user/user.reducer';
import { ChatState, chatReducer } from '../chat/chat.reducer';

export interface State {
  user: UserState;
  chat: ChatState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  chat: chatReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
