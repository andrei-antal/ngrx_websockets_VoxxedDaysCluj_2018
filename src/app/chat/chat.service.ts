import { Injectable } from '@angular/core';
import { ChatMessages, ChatMessage } from './chat-message';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: ChatMessages = [
    {
      contents: 'my message',
      timestamp: new Date(),
      userAvatar: 'face',
      userName: 'My user'
    },
    {
      contents: 'some other message',
      timestamp: new Date(),
      userAvatar: 'casino',
      userName: 'Some other user'
    },
  ];

  constructor(private userService: UserService) { }

  sendMessage(text) {
    const newMessage: ChatMessage = {
      contents: text,
      timestamp: new Date(),
      userAvatar: this.userService.userAvatar,
      userName: this.userService.userName
    };
    console.log('HEREE');

    this.messages = [
      newMessage,
      ...this.messages
    ];
  }
}
