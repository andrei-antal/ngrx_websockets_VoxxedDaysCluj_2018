import { Action } from '@ngrx/store';
import { ChatMessages, ChatMessage, ChatEvent } from './chat-models';

export enum ActionTypes {
  LoadMessages = '[CHAT] Load essages',
  MessagesLoaded = '[CHAT] Messages Loaded',
  SendMessage = '[CHAT] Message Sent',
  MessageReceived = '[CHAT] Message Received',
  JoinChat = '[CHAT] Joined Chat',
  LeaveChat = '[CHAT] Leave Chat',
}
export class LoadMessages implements Action {
  readonly type = ActionTypes.LoadMessages;
}

export class MessagesLoaded implements Action {
  readonly type = ActionTypes.MessagesLoaded;
  constructor(public payload: ChatMessages) { }
}

export class SendMessage implements Action {
  readonly type = ActionTypes.SendMessage;
  constructor(public payload: string) {}
}

export class MessageReceived implements Action {
  readonly type = ActionTypes.MessageReceived;
  constructor(public payload: ChatMessage | ChatEvent) {}
}

export class JoinChat implements Action {
  readonly type = ActionTypes.JoinChat;
}
export class LeaveChat implements Action {
  readonly type = ActionTypes.LeaveChat;
}
