export interface ChatMessageAPI {
  userName: string;
  userAvatar: string;
  contents: string;
  timestamp: Date;
}

export interface ChatMessage extends ChatMessageAPI {
  mine: boolean;
}

export interface ChatEvent {
  event: string;
  timestamp: Date;
}

export type ChatMessages = (ChatMessage | ChatEvent)[];
