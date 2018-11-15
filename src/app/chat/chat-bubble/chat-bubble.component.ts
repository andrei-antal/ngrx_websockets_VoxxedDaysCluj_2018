import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../chat-message';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() mine: boolean;
  @Input() message: ChatMessage;
  constructor() { }

  ngOnInit() {
  }

}
