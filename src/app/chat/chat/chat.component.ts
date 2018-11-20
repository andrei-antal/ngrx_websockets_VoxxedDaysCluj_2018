import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessage, ChatEvent } from '../chat-models';
import { UserService } from 'src/app/user/user.service';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messages: Observable<(ChatMessage | ChatEvent)[]>;
  messagesLoading = true;

  constructor(public userService: UserService, private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.joinChat();
    this.messages = this.chatService.messages$;
    this.messages.pipe(first()).subscribe(() => {
      // this.messagesLoading = false;
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
