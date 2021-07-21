import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Logo } from '../models/Logo';
import { Link } from '../models/Link';
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The message URL
  linkUrl = this.apiPrefix + 'api/link';

  /**
   * @summary Sends a GET petition to get all logos
   * @author Marc Serret
   * @since 1.0.0
   * @returns All the logos
   * @access public
   */
  public getAllLinks(): Observable<Link[]> {
    return this.httpClient.get<Link[]>(this.linkUrl);
  }

  public getByApiKey(apiKey: String): Observable<Link> {
    return this.httpClient.get<Link>(`${this.linkUrl}/${apiKey}`);

  }

  public updateLink(link: Link): Observable<Link> {
    const json = JSON.stringify(link);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Link>(this.linkUrl + '/update', params, { headers: headers });
  }

}
