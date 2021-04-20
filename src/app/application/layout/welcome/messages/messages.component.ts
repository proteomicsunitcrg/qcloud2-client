import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../services/websocket.service';
import { Message } from '../../../../models/message';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  constructor(private messageService: MessageService, private webSocketService: WebsocketService) { }

  allMessages: Message[] = []

  messageFromWebSocket$: Subscription;


  ngOnInit() {
    this.getActiveMessages();
    this.subscribeToWebSocketMessage();
  }

  ngOnDestroy() {
    this.messageFromWebSocket$.unsubscribe();
  }

  private getActiveMessages(): void {
    this.messageService.getActiveMessages().subscribe(
      res => {
        this.allMessages = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  private subscribeToWebSocketMessage(): void {
    this.messageFromWebSocket$ = this.webSocketService.updatemessagefromwebsocket$
      .subscribe((res) => {
        this.allMessages = res.body;
      });
  }

}
