import { Injectable } from '@angular/core';
import { Stomp } from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client';
import { ThresholdService } from './threshold.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private thresholdService: ThresholdService) { }

  private stompClient = null;

  public initializeWebSocket(): void {
    if (this.stompClient === null) {
      const socket = new SockJS('/api/gs-guide-websocket');
      const stompClient = Stomp.over(socket);
      this.stompClient = stompClient;
      const headers = {
        Authorization: localStorage.getItem('id_token')
      };
      stompClient.connect(headers, (frame) => {
        // console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/reply', function (greeting) {
          console.log(JSON.parse(greeting.body));
          // this.processWebSocketNotification(greeting.body['action'], greeting.body['object']);
        });
      });
    }
  }

  processWebSocketNotification(action: string, object: any): void {
    console.log('hola');
    switch (action) {
      case 'nc':
        // non conformity, send to the status bar
        this.thresholdService.sendWebSocketLabSystemStatus(object);
        break;
      default:
        break;
    }
  }
}
