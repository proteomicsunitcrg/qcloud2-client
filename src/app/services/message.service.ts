import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  userDefaultViewUrl = this.apiPrefix + 'api/message';

  public findDefaultView(): Observable<Message> {
    return this.httpClient.get<Message>(this.userDefaultViewUrl);
  }

  public saveMessage(message: Message): Observable<Message> {
    const json = JSON.stringify(message);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Message>(this.userDefaultViewUrl + '/save', params, { headers: headers });
  }

  public getAllMessages(): Observable<Message> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Message>(this.userDefaultViewUrl, { headers: headers });
  }

  public getLastMessage(): Observable<Message> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Message>(this.userDefaultViewUrl + '/last', { headers: headers });
  }

}
