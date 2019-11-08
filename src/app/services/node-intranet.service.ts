import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Node } from '../models/node';
import { System } from '../models/system';
import { LsStats } from '../models/LsStats';

@Injectable({
  providedIn: 'root'
})
export class NodeIntranetService {

  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The message URL
  nodeIntranetUrl = this.apiPrefix + 'api/intranet/node';

    public getAllNodes(): Observable<Node[]> {
        return this.httpClient.get<Node[]>(`${this.nodeIntranetUrl}/getAll`);
    }

    public getNodeByApiKey(apiKey: string): Observable<Node> {
      let params = new HttpParams();
      params = params.set('apiKey', apiKey);
      return this.httpClient.get<Node>(`${this.nodeIntranetUrl}/get`, {params: params});
    }

    public getLabsystemsByNodeApiKey(nodeApiKey: string): Observable<System[]> {
      let params = new HttpParams().set('apiKey', nodeApiKey);
      return this.httpClient.get<System[]>(`${this.nodeIntranetUrl}/getLS`, {params: params});
    }

    public getLsStats(lsApiKey: string): Observable<LsStats> {
      let params = new HttpParams().set('apiKey', lsApiKey);
      return this.httpClient.get<LsStats>(`${this.nodeIntranetUrl}/stats`, {params: params});
    }
}
