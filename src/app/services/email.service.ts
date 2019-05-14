import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
// import { Message } from '../models/message';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  emailUrl = this.apiPrefix + 'api/email';

  public sendEmail(email: Email): Observable<any> {
    console.log(email);
    const json = JSON.stringify(email);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Email>(this.emailUrl + '/send', params, {headers: headers});
  }


}
