import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { Tip } from '../models/Tip';
@Injectable({
  providedIn: 'root'
})
export class TipService {

  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The message URL
  tipUrl = this.apiPrefix + 'api/tip';

  /**
   * @summary Sends a POST petition to the server to save the tip
   * @author Marc Serret
   * @since 1.0.0
   * @param {tip} Tip object to send to the server
   * @returns An observable with the tip
   * @access public
   */
  public saveTip(tip: Tip): Observable<Tip> {
    const json = JSON.stringify(tip);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Tip>(this.tipUrl, params, { headers: headers });
  }

  /**
   * @summary Sends a GET petition to get all tips
   * @author Marc Serret
   * @since 1.0.0
   * @returns All the tips
   * @access public
   */
  public getAllTips(): Observable<Tip[]> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get<Tip[]>(this.tipUrl, { headers: headers });
  }

  public getAllActiveTips(): Observable<Tip[]> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get<Tip[]>(`${this.tipUrl}/active`, { headers: headers });
  }

  public deleteTip(tip: Tip): Observable<any> {
    return this.httpClient.delete<any>(`${this.tipUrl}/${tip.id}`);
  }

}
