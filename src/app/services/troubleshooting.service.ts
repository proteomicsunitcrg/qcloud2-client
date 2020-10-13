import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Troubleshooting } from '../models/troubleshooting';
import { TroubleshootingType } from '../models/troubleshootingType';
import { ItemList } from '../models/itemList';
import { System } from '../models/system';

@Injectable()
export class TroubleshootingService {


  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private troubleshootingUrl = this.apiPrefix + 'api/troubleshooting/';

  private itemList = new Subject<Troubleshooting>();
  itemList$ = this.itemList.asObservable();

  public getAllTroubleshootingByType(type: string): Observable<Troubleshooting[]> {
    return this.httpClient.get<Troubleshooting[]>(this.troubleshootingUrl + type);
  }

  public getTroubleshootingByApiKey(apiKey: string): Observable<Troubleshooting> {
    return this.httpClient.get<Troubleshooting>(`${this.troubleshootingUrl}${apiKey}`);
  }

  public addTroubleshooting(troubleshooting: Troubleshooting): Observable<Troubleshooting> {
    const json = JSON.stringify(troubleshooting);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Troubleshooting>(this.troubleshootingUrl, json, { headers: headers });
  }

  public updateTroubleshooting(troubleshooting: Troubleshooting): Observable<Troubleshooting> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.patch<Troubleshooting>(`${this.troubleshootingUrl}${troubleshooting.apiKey}`,
      JSON.stringify(troubleshooting), { headers: headers });
  }

  public unLink(child: Troubleshooting): Observable<Troubleshooting> {
    return this.httpClient.patch<Troubleshooting>(`${this.troubleshootingUrl}unlink/${child.apiKey}`, child.apiKey);
  }

  public sendItemsToList(items: Troubleshooting): void {
    this.itemList.next(items);
  }

  public enableDisable(apiKey: string): Observable<Troubleshooting> {
    return this.httpClient.patch<Troubleshooting>(`${this.troubleshootingUrl}enableDisable/${apiKey}`, apiKey);
  }

  public getAllTroubleshooting(): Observable<Troubleshooting[]> {
    return this.httpClient.get<Troubleshooting[]>(this.troubleshootingUrl);
  }

  public getAllTroubleshootingTopParents(): Observable<Troubleshooting[]> {
    return this.httpClient.get<Troubleshooting[]>(`${this.troubleshootingUrl}topParents`);
  }

  public getByParentNullChildsNullAndType(type: string): Observable<Troubleshooting[]> {
    return this.httpClient.get<Troubleshooting[]>(`${this.troubleshootingUrl}parentNullChildsNull/${type}`);
  }

  public getParentsByType(type: string): Observable<Troubleshooting[]> {
    return this.httpClient.get<Troubleshooting[]>(`${this.troubleshootingUrl}parentsByType/${type}`);
  }

  public linkChild(parentApiKey: string, child: Troubleshooting): Observable<Troubleshooting> {
    const json = JSON.stringify(child);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Troubleshooting>(`${this.troubleshootingUrl}linkChild/${parentApiKey}`, json, { headers: headers });
  }

  public getForParetto(labsystemApiKey: System): Observable<any> {
    return  this.httpClient.get<any>(`${this.troubleshootingUrl}paretto/${labsystemApiKey}`);
  }

}
