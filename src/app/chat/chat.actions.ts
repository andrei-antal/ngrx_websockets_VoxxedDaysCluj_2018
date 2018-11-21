import { Action } from '@ngrx/store';
import { ChatMessages } from './chat-models';

export enum ActionTypes {
  LoadMessages = '[CHAT] Load messages',
  MessagesLoaded = '[CHAT] Messages Loaded'
}
export class LoadMessages implements Action {
  readonly type = ActionTypes.LoadMessages;
}

export class MessagesLoaded implements Action {
  readonly type = ActionTypes.MessagesLoaded;
  constructor(public payload: ChatMessages) { }
}
