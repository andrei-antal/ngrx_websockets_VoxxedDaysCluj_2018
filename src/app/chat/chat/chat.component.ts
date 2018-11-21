import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessages } from '../chat-models';
import { ChatService } from '../chat.service';
import { ChatState } from '../chat.reducer';
import { Store } from '@ngrx/store';
import { LoadMessages, SendMessage } from '../chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messages: ChatMessages;
  messagesLoading = true;

  constructor(private chatService: ChatService, private store$: Store<ChatState>) { }

  ngOnInit() {
    this.chatService.joinChat();
    this.store$.select('chat').subscribe(({messages, messagesLoaded}) => {
      this.messagesLoading = !messagesLoaded;
      this.messages = messages;
      if (this.messagesLoading) {
        this.store$.dispatch(new LoadMessages());
      }
    });
  }

  ngOnDestroy() {
    this.chatService.leaveChat();
  }

  sendMessage() {
    // this.chatService.sendMessage(this.message);
    this.store$.dispatch(new SendMessage(this.message));
    this.message = '';
  }
}
