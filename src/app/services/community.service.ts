import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommunityLine } from '../models/CommunityLine';
import { CommunityLineNode } from '../models/CommunityLineNode';
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
  public getAllCommunityLines(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.communityUrl}/getAllLines`);
  }
  
  public saveCommunityLine(communityLine: CommunityLine): Observable<CommunityLine> {
    const params = JSON.stringify(communityLine);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<CommunityLine>(`${this.communityUrl}/save`, params, {headers: headers});
  }
  
  public getCommunityLinesByNode(): Observable<CommunityLine[]> {
    return this.httpClient.get<CommunityLine[]>(`${this.communityUrl}/getByNode`);
  }
  
  public updateActive(CommunityLineRelation: CommunityLineNode): Observable<CommunityLineNode> {
    const params = JSON.stringify(CommunityLineRelation);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<CommunityLineNode>(`${this.communityUrl}/updateActive`, params, {headers: headers});
  }
  
  public delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.communityUrl}/${id}`);
  }
  public getNodesInCommunityLineRelation(communityLine: CommunityLine): Observable<Node[]> {
    return this.httpClient.get<Node[]>(`${this.communityUrl}/getNodesInCommunityLineRelation/${communityLine.id}`);
  }

  public makeDeleteRelation(nodeKey: any, lineKey: CommunityLine): Observable<any> {
    let params = new HttpParams();
    nodeKey.forEach((element: string) => {
      params = params.append('UUIDsNodes',element);
    });
    params = params.append('UUIDLine', lineKey.apiKey);
    return this.httpClient.get<any>(`${this.communityUrl}/makeDeleteRelation`, {params});
  }

  public deleteAllRelations(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.communityUrl}/deleteAllRelations/${id}`);
  }

}
