import { ChatMessages } from './chat-models';
import { ActionTypes } from './chat.actions';

export interface ChatState {
  messages: ChatMessages;
  messagesLoaded: boolean;
  joinedChat: boolean;
  missed: number;
}

const initState: ChatState = {
  messages: [],
  messagesLoaded: false,
  joinedChat: false,
  missed: 0
};

export function chatReducer(
  state = initState,
  action: {type: string, payload: any}
): ChatState {
  switch (action.type) {
    case ActionTypes.MessagesLoaded:
      return {
        ...state,
        messages: action.payload,
        messagesLoaded: true
      };
    case ActionTypes.MessageReceived:
      return {
        ...state,
        messages: [
          action.payload,
          ...state.messages
        ],
        missed: !state.joinedChat ? state.missed + 1 : 0
      };
    case ActionTypes.JoinChat:
      return {
        ...state,
        joinedChat: true,
        missed: 0
      };
    case ActionTypes.LeaveChat:
      return {
        ...state,
        joinedChat: false
      };
  }
  return state;
}
