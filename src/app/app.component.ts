import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
