/**
 * Service for users
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */

import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
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
    return this.httpClient.post<any>(this.nodeUrl + '/newmember', params, {headers: headers, observe: 'response'})
      .catch(this.errorHandler);
  }

  public changeMemberRole(member: User): Observable<User> {
    return this.httpClient.put<User>(this.nodeUrl + '/user/change/' + member.apiKey, {}, {});
  }

  public deleteMemberFromNode(member: User): Observable<User[]> {
    return this.httpClient.delete<any>(this.nodeUrl + '/user/' + member.apiKey, {});

  }

  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');
  }

}
