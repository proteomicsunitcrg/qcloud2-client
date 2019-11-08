import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Node } from '../models/node';
import { System } from '../models/system';
import { LsStats } from '../models/LsStats';
import { NodeStats } from '../models/NodeStats';
import { NodeAndStats } from '../models/NodeAndStats';
import { GeneralStats } from '../models/GeneralStats';

@Injectable({
  providedIn: 'root'
})
export class NodeIntranetService {
  
  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The message URL
  nodeIntranetUrl = this.apiPrefix + 'api/intranet/node';
  
  public getAllNodes(): Observable<NodeAndStats[]> {
    return this.httpClient.get<NodeAndStats[]>(`${this.nodeIntranetUrl}/getAll`);
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
    public getNodeStats(nodeApiKey: string): Observable<NodeStats> {
      let params = new HttpParams().set('apiKey', nodeApiKey)
      return this.httpClient.get<NodeStats>(`${this.nodeIntranetUrl}/statsNode`, {params: params});
    }

    public getGeneralStats(): Observable<GeneralStats> {
      return this.httpClient.get<GeneralStats>(`${this.nodeIntranetUrl}/generalStats`);
    }
}
