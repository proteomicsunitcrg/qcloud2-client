import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserDefaultView } from '../models/userDefaultView';
@Injectable({
  providedIn: 'root'
})
export class UserDefaultViewService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  userDefaultViewUrl = this.apiPrefix + 'api/userdefaultview';

  public findDefaultView(): Observable<UserDefaultView> {
    return this.httpClient.get<UserDefaultView>(this.userDefaultViewUrl);
  }

  public saveUserDefaultView(userDefaultView: UserDefaultView): Observable<UserDefaultView> {
    const json = JSON.stringify(userDefaultView);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<UserDefaultView>(this.userDefaultViewUrl, params, { headers: headers });
  }

}
