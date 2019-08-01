import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private apiPrefix = environment.apiPrefix;
  private passwordResetUrl = this.apiPrefix + 'api/passwordreset';

  constructor(private httpClient: HttpClient) { }

  public checkPasswordResetToken(token: string): Observable<any> {
    return this.httpClient.get<any>(this.passwordResetUrl + '/check/' + token);
  }

  public askForPasswordReset(user: User): Observable<any> {
    const json = JSON.stringify(user);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<User>(this.passwordResetUrl, params, { headers: headers });
  }

  public saveNewPassword(user: User, token: string): Observable<any> {
    const json = JSON.stringify(user);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<any>(this.passwordResetUrl + '/reset/' + token, params, { headers: headers });
  }


}


