import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ChatMessage, ChatEvent } from './chat/chat-models';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public readonly SERVER_URL = 'http://localhost:3000';
  private socket: SocketIOClient.Socket;

  private message = new Subject<ChatMessage>();
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

  sendMessage(message: ChatMessage) {
    this.socket.emit('message-sent', message);
  }

  sendEvent(event: ChatEvent) {
    this.socket.emit('event-sent', event);
  }
}
