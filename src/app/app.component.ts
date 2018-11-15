import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ngChat';
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

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.initSocket();
  }
}
