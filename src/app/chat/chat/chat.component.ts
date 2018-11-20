import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessages } from '../chat-models';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messages: ChatMessages;
  messagesLoading = true;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.joinChat();
    this.chatService.messages$
      .subscribe(messages => {
        this.messages = messages;
        this.messagesLoading = false;
      });
  }

  ngOnDestroy() {
    this.chatService.leaveChat();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
