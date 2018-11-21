import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { ActionTypes, MessagesLoaded } from './chat.actions';
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
}
