import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { ChatService } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ngChat';
  missed;
  sideNavOptions = [
    {
      name: 'User settings',
      icon: 'settings',
      link: 'user'
    },
    {
      name: 'Chat',
      icon: 'chat_bubble_outline',
      link: 'chat'
    },
    {
      name: 'Todos',
      icon: 'list',
      link: 'todos'
    }
  ];

  constructor(
    private socketService: SocketService,
    private store: Store<State>,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.socketService.initSocket();
    this.chatService.initChat();
    this.store.select('user').subscribe(user => this.title = `Welcome ${user.name} to ngChat`);
    this.store.select('chat').subscribe(chat => this.missed = chat.missed);
  }
}
