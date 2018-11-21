import { Injectable } from '@angular/core';
import { ChatMessages, ChatMessage, ChatEvent, ChatMessageAPI } from './chat-models';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages = new BehaviorSubject<ChatMessages>([]);
  public messages$: Observable<ChatMessages>;
  private messageSub: Subscription;
  private eventSub: Subscription;

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private http: HttpClient
  ) { }

  joinChat() {
    // this.messages$ = this.http.get<ChatMessages>(`${this.socketService.SERVER_URL}/messages`)
    //   .pipe(
    //     switchMap((messages: ChatMessages) => {
    //       this.messages.next(messages.map(this.formatMessages));
    //       return this.messages.asObservable();
    //     })
    //   );

    const joinEvent: ChatEvent = {
       event: `${this.userService.userName} has joined`,
       timestamp: new Date(),
    };
    this.socketService.sendEvent(joinEvent);

    this.messageSub = this.socketService.message$.subscribe(
      (newMessage) => this.addNewItem({ ...newMessage, mine: false})
    );
    this.eventSub = this.socketService.events$.subscribe(
      (newEvent) => this.addNewItem(newEvent)
    );
  }

  formatMessages = (message) => {
    return { ...message, mine: message.userName === this.userService.userName };
  }

  private addNewItem(newMessage: ChatMessage | ChatEvent) {
    this.messages.next([newMessage, ...this.messages.getValue()]);
  }

  leaveChat() {
    this.messageSub.unsubscribe();
    this.eventSub.unsubscribe();
    const leaveEvent: ChatEvent = {
      event: `${this.userService.userName} has left`,
      timestamp: new Date(),
    };
    this.socketService.sendEvent(leaveEvent);
  }

  // sendMessage(text) {
  //   const newMessage: ChatMessageAPI = {
  //     contents: text,
  //     timestamp: new Date(),
  //     userAvatar: this.userService.userAvatar,
  //     userName: this.userService.userName,
  //   };
  //   this.socketService.sendMessage(newMessage);

  //   this.messages.next([
  //     { ...newMessage, mine: true },
  //     ...this.messages.getValue()
  //   ]);
  // }
}
