import { Injectable } from '@angular/core';
import { Stomp } from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client';
import { ThresholdService } from './threshold.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private thresholdService: ThresholdService) { }

  private stompClient = null;

  nonConformities$ = new Observable<{'action': string, 'body': any}>((observer) => {
    const {next, error} = observer;
    if (this.stompClient === null) {
      const socket = new SockJS('/api/gs-guide-websocket');
      const stompClient = Stomp.over(socket);
      this.stompClient = stompClient;

      const headers = {
        Authorization: localStorage.getItem('id_token')
      };
      stompClient.connect(headers, (frame) => {
        stompClient.subscribe('/user/queue/reply', function (greeting) {
          const response = JSON.parse(greeting.body);
          observer.next({
            'action': response['action'],
            'body': response['object']
          });
        });
      });
    }
  });
}
