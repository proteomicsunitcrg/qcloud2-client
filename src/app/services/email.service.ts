import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) { }

  // ENV URL
  private apiPrefix = environment.apiPrefix;

  // Email API URL
  emailUrl = this.apiPrefix + 'api/email';

  /**
   * @summary Sends a POST petition to the server to send an email
   * @author Marc Serret
   * @since 1.0.0
   * @param email Email object to send to the server
   * @returns An observable boolean with the request status
   * @access public
   */
  public sendEmail(email: Email): Observable<boolean> {
    const json = JSON.stringify(email);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<boolean>(this.emailUrl + '/send', params, {headers: headers});
  }

  public getAllTemplates(): Observable<Array<String>> {
    return this.httpClient.get<Array<String>>(this.emailUrl + '/templates');
  }

  public loadTemplate(template: String) {
    return this.httpClient.get(this.emailUrl + '/template/' + template, {responseType: 'text'});
  }

}
