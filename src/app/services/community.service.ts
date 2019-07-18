import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommunityLine } from '../models/CommunityLine';
@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  constructor(private httpClient: HttpClient) { }

  // ENV URL
  private apiPrefix = environment.apiPrefix;

  // Email API URL
  communityUrl = this.apiPrefix + 'api/community';

  /**
  * @summary Send a petition to get all community lines
  * @author Marc Serret
  * @version 1.0
  * @returns Observable with array of CommunityLines
  * 
  */
  public getAllCommunityLines(): Observable<CommunityLine[]> {
      return this.httpClient.get<CommunityLine[]>(`${this.communityUrl}/getAllLines`);
  }

  public saveCommunityLine(communityLine: CommunityLine): Observable<CommunityLine> {
    const params = JSON.stringify(communityLine);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<CommunityLine>(`${this.communityUrl}/save`, params, {headers: headers});
  }

}
