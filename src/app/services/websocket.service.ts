import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Stomp } from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { WebSocketNotification } from '../models/webSocketNotification';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient = null;

  dateRangeAllowNewData = true;

  nonConformities = new Subject<WebSocketNotification>();
  nonConformities$ = this.nonConformities.asObservable();

  dataFromWebSocket = new Subject<WebSocketNotification>();
  dataFromWebSocket$ = this.dataFromWebSocket.asObservable();

  thresholdFromWebSocket = new Subject<WebSocketNotification>();
  thresholdFormWebSocket$ = this.thresholdFromWebSocket.asObservable();

  newLabSystemFromWebSocket = new Subject<WebSocketNotification>();
  newLabSystemFromWebSocket$ = this.newLabSystemFromWebSocket.asObservable();

  private apiPrefix = environment.apiPrefix;
  private websocketUrl = this.apiPrefix + 'api/gs-guide-websocket';

  private connectionAttemps = 0;

  constructor() {
    this.connectWebsocket();
  }

  private manageWebSocketMessage(actionFromWebSocket: string, apiKey: string, qccv: string, body: any) {
    const action = this.getActionFromActionFromWebSocket(actionFromWebSocket);
    const actionValue = this.getActionValueFromActionWebSocket(actionFromWebSocket);
    switch (action) {
      case 'nc':
        this.nonConformities.next(
          new WebSocketNotification(actionValue,
            null,
            null,
            body));
        break;
      case 'data':
        if (this.dateRangeAllowNewData) {
          this.dataFromWebSocket.next(
            new WebSocketNotification(actionValue,
              apiKey,
              qccv,
              body));
        }
        break;
      case 'threshold':
        if (this.dateRangeAllowNewData) {
          this.thresholdFromWebSocket.next(
            new WebSocketNotification(actionValue,
              apiKey,
              qccv,
              body));
        }
        break;
      case 'labsystem':
        this.newLabSystemFromWebSocket.next(
          new WebSocketNotification(actionValue,
            null,
            null,
            body));
        break;
      default:
        console.log(actionFromWebSocket);
    }

  }

  public connectWebsocket(): void {
    const _this = this;
    console.log('connecting...');
    if (this.stompClient === null) {
      _this.connectionAttemps++;
      const socket = new SockJS(_this.websocketUrl);
      const stompClient = Stomp.over(socket);
      stompClient.debug = f => f; // disable stomp client debug log
      this.stompClient = stompClient;

      const headers = {
        Authorization: localStorage.getItem('id_token')
      };
      stompClient.connect(headers, (frame) => {
        _this.connectionAttemps = 0;
        stompClient.subscribe('/user/queue/reply', function (greeting) {
          const response = JSON.parse(greeting.body);
          _this.manageWebSocketMessage(response['action'], response['apiKey'], response['qccv'], response['object']);
        });
      }, () => {
        console.log('Disconnected, trying to reconnect...');
        setTimeout(() => {
          this.stompClient = null;
          if (_this.connectionAttemps < 5) {
            this.connectWebsocket();
          } else {
            console.log('Max number of connection attemps');
          }
        }, 5000);
      });
    }
  }

  private getActionFromActionFromWebSocket(actionFromWebSocket: string): string {
    return actionFromWebSocket.substring(0, actionFromWebSocket.indexOf('-'));
  }

  private getActionValueFromActionWebSocket(actionFromWebSocket: string): string {
    return actionFromWebSocket.substring(actionFromWebSocket.indexOf('-') + 1);
  }
}
