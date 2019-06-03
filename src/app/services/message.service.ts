import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The message URL
  messageUrl = this.apiPrefix + 'api/message';

  /**
   * @summary Sends a POST petition to the server to save the message
   * @author Marc Serret
   * @since 1.0.0
   * @param {message} Message object to send to the server
   * @returns An observable boolean with the message
   * @access public
   */
  public saveMessage(message: Message): Observable<Message> {
    const json = JSON.stringify(message);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Message>(this.messageUrl + '/save', params, { headers: headers });
  }

  /**
   * @summary Sends a POST petition to get all messages
   * @author Marc Serret
   * @since 1.0.0
   * @returns All the messages
   * @access public
   */
  public getAllMessages(): Observable<Message> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Message>(this.messageUrl, { headers: headers });
  }

  /**
   * @summary Sends a POST petition to the server to get the las message
   * @author Marc Serret
   * @since 1.0.0
   * @returns An observable with the message
   * @access public
   */
  public getLastMessage(): Observable<Message> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Message>(this.messageUrl + '/last', { headers: headers });
  }

}
