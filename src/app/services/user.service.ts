/**
 * Service for users
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  nodeUrl = this.apiPrefix + 'api/node';

  public getUsersByNode(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.nodeUrl + '/users');
  }

  public addLabMemberToNode(member: User): Observable<User[]> {
    const json = JSON.stringify(member);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.nodeUrl + '/newmember', params, { headers: headers, observe: 'response' })
      .pipe(map(res => {
        return res.body;
      }));
  }

  public changeMemberRole(member: User): Observable<User> {
    return this.httpClient.put<User>(this.nodeUrl + '/user/change/' + member.apiKey, {}, {});
  }

  public deleteMemberFromNode(member: User): Observable<User[]> {
    return this.httpClient.delete<any>(this.nodeUrl + '/user/' + member.apiKey, {});
  }

  public changeUserPassword(currentPassword: string, newPassword: string): Observable<any> {
    const user = new User(null, null, newPassword, null, null, null);
    const json = JSON.stringify({
      'currentPassword' : currentPassword,
      'newPassword' : newPassword
    });
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<User>(this.nodeUrl + '/user/password', params, { headers: headers, observe: 'response' });
  }

  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');
  }

}
