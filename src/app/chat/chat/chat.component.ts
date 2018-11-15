import { Component, OnInit } from '@angular/core';
import { ChatMessages } from '../chat-message';
import { UserService } from 'src/app/user/user.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userJoinedChat = true;
  message = '';
  messages: ChatMessages;
  constructor(public userService: UserService, private chatService: ChatService) { }

  ngOnInit() {
    this.messages = this.chatService.messages;
  }

  joinChat() {
    this.userJoinedChat = true;
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages = this.chatService.messages;
    this.message = '';
  }
}
