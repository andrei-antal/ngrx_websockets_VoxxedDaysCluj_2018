import { Action } from '@ngrx/store';

export enum ActionTypes {
  ChangeUserName = '[USER] Change User Name',
  ChangeUserAvatar = '[USER] Change User Avatar'
}

export class ChangeUserName implements Action {
  readonly type = ActionTypes.ChangeUserName;
  constructor(public payload: string) {}
}

export class ChangeUserAvatar {
  readonly type = ActionTypes.ChangeUserAvatar;
  constructor(public payload: string) {}
}

export type UserAction = ChangeUserName | ChangeUserAvatar;
