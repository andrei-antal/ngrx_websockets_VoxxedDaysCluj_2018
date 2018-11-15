import { Component, OnInit, Input } from '@angular/core';
import { ChatEvent } from '../chat-models';

@Component({
  selector: 'app-chat-event',
  templateUrl: './chat-event.component.html',
  styleUrls: ['./chat-event.component.scss']
})
export class ChatEventComponent implements OnInit {
  @Input() event: ChatEvent;
  constructor() { }

  ngOnInit() {
  }

}
