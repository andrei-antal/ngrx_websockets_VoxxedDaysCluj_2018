import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';

@NgModule({
  declarations: [ChatComponent, ChatBubbleComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ChatModule { }
