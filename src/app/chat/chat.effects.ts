import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom, map, tap } from 'rxjs/operators';
import { ActionTypes, MessagesLoaded, MessageReceived, SendMessage } from './chat.actions';
import { ChatMessagesAPI, ChatMessages } from './chat-models';
import { SocketService } from '../socket.service';
import {State} from '../reducers';
import { UserState } from '../user/user.reducer';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private socketService: SocketService,
    private store$: Store<State>
  ) {}

  @Effect()
  messages$: Observable<Action> = this.actions$.ofType(ActionTypes.LoadMessages)
    .pipe(
      switchMap(() =>
        this.http.get<ChatMessagesAPI>(`${this.socketService.SERVER_URL}/messages`)
          .pipe(
            withLatestFrom(this.store$.select<UserState>('user')),
            map(([messages, userState]) => {
              const formattedMessages: ChatMessages = messages.map(
                message => ({ ...message, mine: (message as any).userName === userState.name})
              );
              return new MessagesLoaded(formattedMessages);
            })
          )
      )
    );

  @Effect()
  sendMessage$: Observable<Action> = this.actions$.ofType(ActionTypes.SendMessage)
    .pipe(
      withLatestFrom(this.store$.select<UserState>('user')),
      map(([action, userState]) => ({
          contents: (action as SendMessage).payload,
          timestamp: new Date(),
          userAvatar: userState.avatar,
          userName: userState.name,
        })
      ),
      tap((newMessage: any) => this.socketService.sendMessage(newMessage)),
      map(newMessage => new MessageReceived({...newMessage, mine: true}))
    );
}
