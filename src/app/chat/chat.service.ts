import { Injectable } from '@angular/core';
import { ChatMessages, ChatMessage, ChatEvent } from './chat-models';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { MessageReceived, JoinChat, LeaveChat } from './chat.actions';

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
    private store$: Store<State>
  ) { }

  initChat() {
    this.messageSub = this.socketService.message$.subscribe(
      (newMessage) => this.addNewItem({ ...newMessage, mine: false})
    );
    this.eventSub = this.socketService.events$.subscribe(
      (newEvent) => this.addNewItem(newEvent)
    );
  }

  joinChat() {
    const joinEvent: ChatEvent = {
       event: `${this.userService.userName} has joined`,
       timestamp: new Date(),
    };
    this.socketService.sendEvent(joinEvent);
    this.store$.dispatch(new JoinChat());
  }

  formatMessages = (message) => {
    return { ...message, mine: message.userName === this.userService.userName };
  }

  private addNewItem(newMessage: ChatMessage | ChatEvent) {
    // this.messages.next([newMessage, ...this.messages.getValue()]);
    this.store$.dispatch(new MessageReceived(newMessage));
  }

  leaveChat() {
    // this.messageSub.unsubscribe();
    // this.eventSub.unsubscribe();
    this.store$.dispatch(new LeaveChat());
    const leaveEvent: ChatEvent = {
      event: `${this.userService.userName} has left`,
      timestamp: new Date(),
    };
    this.socketService.sendEvent(leaveEvent);
  }
}
