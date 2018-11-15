export interface ChatMessage {
  userName: string;
  userAvatar: string;
  contents: string;
  timestamp: Date;
}

export type ChatMessages = ChatMessage[];
