import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatEventComponent } from './chat-event/chat-event.component';

@NgModule({
  declarations: [ChatComponent, ChatBubbleComponent, ChatEventComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ChatModule { }
