import { UserAction, ActionTypes } from './user.actions';

const AVATARS = ['face', 'casino', 'school'];

export interface UserState {
  name: string;
  avatar: string;
  readonly avatars: string[];
}

const initialState: UserState = {
  name: 'My User',
  avatar: 'face',
  avatars: AVATARS
};

export function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case ActionTypes.ChangeUserName:
      return {
        ...state,
        name: action.payload
      };
    case ActionTypes.ChangeUserAvatar:
      return {
        ...state,
        avatar: action.payload
      };
  }

  return state;
}

