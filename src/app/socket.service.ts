import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ChatEvent, ChatMessageAPI } from './chat/chat-models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public readonly SERVER_URL = 'http://localhost:3000';
  private socket: SocketIOClient.Socket;

  private message = new Subject<ChatMessageAPI>();
  private events = new Subject<ChatEvent>();

  get message$() {
    return this.message.asObservable();
  }

  get events$() {
    return this.events.asObservable();
  }

  constructor() { }

  initSocket() {
    // connect
    this.socket = io(this.SERVER_URL);
    // new message
    this.socket.on('new-message', message => this.message.next(message));
    // new event
    this.socket.on('new-event', event => this.events.next(event));
  }

  sendMessage(message: ChatMessageAPI) {
    this.socket.emit('message-sent', message);
  }

  sendEvent(event: ChatEvent) {
    this.socket.emit('event-sent', event);
  }
}
