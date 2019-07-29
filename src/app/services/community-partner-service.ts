import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommunityPartner } from '../models/CommunityPartner';
@Injectable({
    providedIn: 'root'
  })

  export class CommunityPartnerService {
    constructor(private httpClient: HttpClient) { }
  
    // ENV URL
    private apiPrefix = environment.apiPrefix;
  
    // Email API URL
    communityUrl = this.apiPrefix + 'api/communityPartner';

    public getAll(): Observable<CommunityPartner[]> {
        return this.httpClient.get<CommunityPartner[]>(`${this.communityUrl}/getAll`);
    }

    public createNew(communityPartner: CommunityPartner): Observable<CommunityPartner> {
      const params = JSON.stringify(communityPartner);
      const headers = new HttpHeaders().set('Content-type', 'application/json');
      return this.httpClient.post<CommunityPartner>(`${this.communityUrl}/create`, params, {headers: headers});
    }
  }